import { useEffect, useRef, useState, type FormEvent, type InputHTMLAttributes } from 'react'
import { CheckCircle2, Loader2, Lock, X } from 'lucide-react'
import { PLANOS, linkWhatsApp, type PlanoId } from '../data/conteudo'
import { ErroCadastro, enviarCadastro, mascararCelular, validarCadastro, type DadosCadastro } from '../lib/leads'
import { IconeWhatsApp } from './ui'

type Campos = Omit<DadosCadastro, 'plano'>
const VAZIO: Campos = { nome_completo: '', email: '', celular: '', consentimento: false }

export function Cadastro({ plano, onFechar, onTrocarPlano }: { plano: PlanoId | null; onFechar: () => void; onTrocarPlano: (p: PlanoId) => void }) {
  const dialogo = useRef<HTMLDialogElement>(null)
  const [campos, setCampos] = useState<Campos>(VAZIO)
  const [erros, setErros] = useState<Partial<Record<keyof DadosCadastro, string>>>({})
  const [enviando, setEnviando] = useState(false)
  const [erroGeral, setErroGeral] = useState('')
  const [concluido, setConcluido] = useState(false)

  useEffect(() => {
    const d = dialogo.current
    if (!d) return
    if (plano && !d.open) {
      d.showModal()
      document.body.style.overflow = 'hidden'
    }
    if (!plano && d.open) d.close()
  }, [plano])

  function fechar() {
    document.body.style.overflow = ''
    setCampos(VAZIO)
    setErros({})
    setErroGeral('')
    setConcluido(false)
    onFechar()
  }

  function alterar<K extends keyof Campos>(campo: K, valor: Campos[K]) {
    setCampos((c) => ({ ...c, [campo]: valor }))
    if (erros[campo]) setErros((e) => ({ ...e, [campo]: undefined }))
  }

  async function enviar(e: FormEvent) {
    e.preventDefault()
    if (!plano) return
    const encontrados = validarCadastro(campos)
    setErros(encontrados)
    if (Object.keys(encontrados).length) return
    setEnviando(true)
    setErroGeral('')
    try {
      await enviarCadastro({ ...campos, plano })
      setConcluido(true)
    } catch (err) {
      setErroGeral(err instanceof ErroCadastro ? err.message : 'Algo deu errado. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  const planoAtual = PLANOS.find((p) => p.id === plano)
  const primeiroNome = campos.nome_completo.trim().split(/\s+/)[0]
  const whats = planoAtual
    ? linkWhatsApp(`Oi Deusmar! Sou ${campos.nome_completo.trim()} e acabei de me cadastrar no site para o ${planoAtual.nome} (${planoAtual.parcelas}). Podemos seguir?`)
    : '#'

  return (
    <dialog
      ref={dialogo}
      onClose={fechar}
      onClick={(e) => e.target === dialogo.current && fechar()}
      className="m-0 mt-auto max-h-[100dvh] w-full max-w-none overflow-y-auto rounded-t-3xl border border-white/10 bg-grafite-850 p-0 text-white backdrop:bg-black/75 backdrop:backdrop-blur-sm sm:m-auto sm:max-w-lg sm:rounded-3xl"
      aria-labelledby="cadastro-titulo"
    >
      <div className="relative p-6 sm:p-8">
        <button type="button" onClick={fechar} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10" aria-label="Fechar">
          <X className="h-5 w-5" />
        </button>

        {concluido && planoAtual ? (
          <div className="py-4 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-dpj-claro" strokeWidth={1.5} />
            <h2 id="cadastro-titulo" className="titulo mt-5 text-4xl">Cadastro recebido, {primeiroNome}</h2>
            <p className="mt-3 text-sm leading-relaxed text-texto">
              O Deusmar vai entrar em contato pelo WhatsApp para confirmar o <strong className="text-white">{planoAtual.nome}</strong> e
              enviar a forma de pagamento. Se preferir adiantar, chame agora:
            </p>
            <a href={whats} target="_blank" rel="noopener noreferrer" className="btn-primario mt-6 h-14 w-full text-base">
              <IconeWhatsApp />
              Falar com o Deusmar agora
            </a>
            <button type="button" onClick={fechar} className="mt-3 min-h-11 text-sm text-texto hover:text-white">
              Voltar para a página
            </button>
          </div>
        ) : (
          <form onSubmit={enviar} noValidate>
            <span className="rotulo">Garanta sua vaga</span>
            <h2 id="cadastro-titulo" className="titulo mt-3 pr-10 text-4xl">Falta pouco para começar</h2>

            <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl bg-grafite-900 p-1" role="radiogroup" aria-label="Plano escolhido">
              {PLANOS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={p.id === plano}
                  onClick={() => onTrocarPlano(p.id)}
                  className={`min-h-12 rounded-lg px-2 text-left text-xs transition sm:text-sm ${
                    p.id === plano ? 'bg-dpj text-white' : 'text-texto hover:bg-white/5'
                  }`}
                >
                  <span className="block font-semibold">{p.id === 'semestral' ? 'Semestral' : 'Bimestral'}</span>
                  <span className="block opacity-80">{p.parcelas}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4">
              <Campo
                id="nome"
                label="Nome completo"
                erro={erros.nome_completo}
                input={{ value: campos.nome_completo, onChange: (e) => alterar('nome_completo', e.target.value), autoComplete: 'name', placeholder: 'Seu nome e sobrenome' }}
              />
              <Campo
                id="email"
                label="E-mail"
                erro={erros.email}
                input={{ type: 'email', inputMode: 'email', value: campos.email, onChange: (e) => alterar('email', e.target.value), autoComplete: 'email', placeholder: 'voce@email.com' }}
              />
              <Campo
                id="celular"
                label="Celular com DDD"
                erro={erros.celular}
                input={{ type: 'tel', inputMode: 'numeric', value: campos.celular, onChange: (e) => alterar('celular', mascararCelular(e.target.value)), autoComplete: 'tel-national', placeholder: '(16) 99999-9999' }}
              />

              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-texto">
                <input
                  type="checkbox"
                  checked={campos.consentimento}
                  onChange={(e) => alterar('consentimento', e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[#c4161c]"
                />
                <span>
                  Autorizo a DPJ Consultoria Esportiva a entrar em contato comigo por WhatsApp e e-mail sobre o plano escolhido,
                  conforme a LGPD.
                  {erros.consentimento && <span className="mt-1 block text-dpj-claro">{erros.consentimento}</span>}
                </span>
              </label>
            </div>

            {erroGeral && <p className="mt-4 rounded-lg border border-dpj/40 bg-dpj/10 p-3 text-sm text-white" role="alert">{erroGeral}</p>}

            <button type="submit" disabled={enviando} className="btn-primario mt-6 h-14 w-full text-base disabled:opacity-70">
              {enviando ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              {enviando ? 'Enviando...' : 'Quero assinar'}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-texto">
              <Lock className="h-3.5 w-3.5" />
              Seus dados ficam protegidos. Nenhum pagamento é feito agora.
            </p>
          </form>
        )}
      </div>
    </dialog>
  )
}

function Campo({ id, label, erro, input }: { id: string; label: string; erro?: string; input: InputHTMLAttributes<HTMLInputElement> }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-prata">
        {label}
      </label>
      <input
        id={id}
        {...input}
        aria-invalid={Boolean(erro)}
        aria-describedby={erro ? `${id}-erro` : undefined}
        className={`h-13 w-full rounded-xl border bg-grafite-900 px-4 text-base text-white placeholder:text-white/25 transition focus:outline-none focus:ring-2 ${
          erro ? 'border-dpj-claro focus:ring-dpj/40' : 'border-white/10 focus:border-white/30 focus:ring-white/10'
        }`}
      />
      {erro && (
        <p id={`${id}-erro`} className="mt-1.5 text-xs text-dpj-claro">
          {erro}
        </p>
      )}
    </div>
  )
}
