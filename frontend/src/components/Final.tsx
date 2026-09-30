import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Mail, MapPin, Plus } from 'lucide-react'
import { APP_LOJAS, EMPRESA, FAQ, NAV, VIDEO_AULAS, WHATSAPP } from '../data/conteudo'
import { Cabecalho, IconeInstagram, IconeWhatsApp, Revelar, VideoVertical } from './ui'

export function Dicas() {
  const trilho = useRef<HTMLDivElement>(null)
  const rolar = (dir: 1 | -1) => trilho.current?.scrollBy({ left: dir * trilho.current.clientWidth * 0.8, behavior: 'smooth' })

  return (
    <section id="dicas" className="border-y border-white/8 bg-grafite-950 py-24 lg:py-32">
      <div className="container-dpj flex flex-wrap items-end justify-between gap-6">
        <Cabecalho
          rotulo="Aulas gratuitas"
          titulo={<>Dicas de <span className="text-dpj-claro">execução</span></>}
          texto="Um pouco do que você recebe na consultoria: técnica explicada de forma direta, para treinar com mais segurança e resultado."
        />
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => rolar(-1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 hover:bg-white/10" aria-label="Vídeos anteriores">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => rolar(1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 hover:bg-white/10" aria-label="Próximos vídeos">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trilho}
        className="sem-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:scroll-px-6 sm:px-6 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
      >
        {VIDEO_AULAS.map((v) => (
          <article key={v.arquivo} className="w-[68vw] max-w-[270px] shrink-0 snap-start">
            <VideoVertical arquivo={v.arquivo} titulo={v.titulo} className="border border-white/8" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-dpj-claro">{v.tema}</p>
            <h3 className="mt-1 text-sm font-medium leading-snug text-white">{v.titulo}</h3>
          </article>
        ))}
      </div>
      <p className="container-dpj mt-4 text-xs text-texto md:hidden">Arraste para ver mais</p>
    </section>
  )
}

export function Duvidas() {
  const [aberta, setAberta] = useState<number | null>(0)
  return (
    <section id="duvidas" className="py-24 lg:py-32">
      <div className="container-dpj grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Cabecalho rotulo="Dúvidas frequentes" titulo={<>Antes de <span className="text-dpj-claro">começar</span></>} texto="Não encontrou sua pergunta? Chame no WhatsApp." />
        <div className="divide-y divide-white/8 border-y border-white/8">
          {FAQ.map((f, i) => {
            const on = aberta === i
            return (
              <div key={f.pergunta}>
                <button
                  type="button"
                  onClick={() => setAberta(on ? null : i)}
                  aria-expanded={on}
                  className="flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-semibold sm:text-lg">{f.pergunta}</span>
                  <Plus className={`h-5 w-5 shrink-0 text-dpj-claro transition-transform duration-300 ${on ? 'rotate-45' : ''}`} />
                </button>
                <div className={`grid transition-all duration-300 ${on ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <p className="overflow-hidden text-sm leading-relaxed text-texto sm:text-base">{f.resposta}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function ChamadaFinal() {
  return (
    <section className="px-5 pb-24 sm:px-6 lg:pb-32">
      <Revelar className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-dpj/40 bg-gradient-to-br from-dpj via-dpj-escuro to-[#5c0a0d] px-6 py-16 text-center sm:px-12 lg:py-24">
        <div className="pointer-events-none absolute inset-0 grao opacity-60" />
        <img src="/media/icone-dpj.png" alt="" className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 opacity-10" loading="lazy" />
        <div className="relative">
          <h2 className="titulo mx-auto max-w-3xl text-5xl sm:text-6xl lg:text-7xl">O próximo resultado pode ser o seu</h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/85 sm:text-lg">
            Vagas limitadas por mês para manter o acompanhamento próximo. Comece pela avaliação ou garanta seu plano agora.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={WHATSAPP.avaliacao} target="_blank" rel="noopener noreferrer" className="btn h-14 bg-white px-7 text-base text-grafite-900 hover:bg-white/90">
              <IconeWhatsApp />
              Agendar minha avaliação
            </a>
            <a href="#planos" className="btn h-14 border border-white/40 px-7 text-base text-white hover:bg-white/10">
              Ver os planos
            </a>
          </div>
        </div>
      </Revelar>
    </section>
  )
}

export function Rodape() {
  return (
    <footer className="border-t border-white/8 bg-grafite-950 pb-28 pt-16 lg:pb-12">
      <div className="container-dpj grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <img src="/media/logo-dpj.webp" alt="DPJ Personal Trainer" className="h-10 w-auto" loading="lazy" width={104} height={40} />
          <p className="mt-4 text-sm leading-relaxed text-texto">Avaliação física e postural, consultoria de treino e treino híbrido em São Carlos e online.</p>
          <div className="mt-5 flex gap-2">
            <a href={EMPRESA.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram @personal.deusmar" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 hover:bg-white/10">
              <IconeInstagram />
            </a>
            <a href={WHATSAPP.geral} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 hover:bg-white/10">
              <IconeWhatsApp />
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">Navegação</p>
          <ul className="mt-4 grid gap-2 text-sm text-texto">
            {NAV.map((n) => (
              <li key={n.id}><a href={`#${n.id}`} className="hover:text-white">{n.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">Contato</p>
          <ul className="mt-4 grid gap-3 text-sm text-texto">
            <li className="flex gap-2"><IconeWhatsApp className="mt-0.5 h-4 w-4 shrink-0" /><a href={WHATSAPP.geral} target="_blank" rel="noopener noreferrer" className="hover:text-white">{EMPRESA.telefone}</a></li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" /><a href={`mailto:${EMPRESA.email}`} className="break-all hover:text-white">{EMPRESA.email}</a></li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={EMPRESA.endereco.mapa} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {EMPRESA.endereco.linha1}<br />{EMPRESA.endereco.linha2}<br />{EMPRESA.endereco.cidade}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">DPJ App</p>
          <ul className="mt-4 grid gap-2 text-sm text-texto">
            <li><a href={APP_LOJAS.googlePlay} target="_blank" rel="noopener noreferrer" className="hover:text-white">Google Play</a></li>
            <li><a href={APP_LOJAS.appStore} target="_blank" rel="noopener noreferrer" className="hover:text-white">App Store</a></li>
          </ul>
        </div>
      </div>

      <div className="container-dpj mt-12 border-t border-white/8 pt-6 text-xs leading-relaxed text-texto/80">
        <p>
          <strong className="text-prata">{EMPRESA.razaoSocial}</strong> ({EMPRESA.nomeFantasia}) | CNPJ {EMPRESA.cnpj}
        </p>
        <p className="mt-1">Resultados individuais variam conforme a rotina, a adesão e as características de cada pessoa. © {new Date().getFullYear()} DPJ Consultoria Esportiva.</p>
      </div>
    </footer>
  )
}

export function WhatsAppFlutuante() {
  return (
    <a
      href={WHATSAPP.geral}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o Deusmar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.5)] transition hover:scale-105"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <IconeWhatsApp className="h-7 w-7" />
    </a>
  )
}
