import { Check, ShieldCheck } from 'lucide-react'
import { PLANOS, type PlanoId } from '../data/conteudo'
import { Cabecalho, Revelar } from './ui'

export function Planos({ onAssinar }: { onAssinar: (plano: PlanoId) => void }) {
  return (
    <section id="planos" className="relative overflow-hidden pb-16 pt-16 lg:pb-24 lg:pt-24">
      <div className="pointer-events-none absolute left-1/2 top-40 h-[500px] w-[700px] -translate-x-1/2 brilho-10" />
      <div className="container-dpj relative">
        <Cabecalho
          centro
          rotulo="Planos Premium"
          titulo={<>Escolha o seu <span className="text-dpj-claro">acompanhamento</span></>}
          texto="Os dois planos incluem avaliação presencial, treino no DPJ App, plano alimentar e suporte pelo WhatsApp. A diferença é quanto tempo você quer evoluir com acompanhamento."
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {PLANOS.map((p, i) => {
            const destaque = Boolean(p.destaque)
            return (
              <Revelar key={p.id} atraso={i * 120} className="h-full">
                <article
                  className={`relative flex h-full flex-col rounded-3xl border p-7 sm:p-8 ${
                    destaque
                      ? 'border-dpj/60 bg-gradient-to-b from-dpj/15 to-grafite-850 shadow-[0_30px_80px_-30px_rgba(196,22,28,0.55)]'
                      : 'border-white/10 bg-grafite-850'
                  }`}
                >
                  {destaque && (
                    <span className="absolute -top-3 left-7 rounded-full bg-dpj px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      {p.destaque}
                    </span>
                  )}
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-prata">{p.duracao}</p>
                  <h3 className="titulo mt-2 text-3xl sm:text-4xl">{p.nome}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-texto">{p.resumo}</p>

                  <div className="mt-7 border-y border-white/8 py-6">
                    <p className="text-sm text-texto">em até</p>
                    <p className="titulo text-6xl">{p.parcelas}</p>
                    <p className="mt-2 text-sm text-texto">
                      sem juros <span className="mx-1 text-white/20">|</span> {p.condicao}
                    </p>
                  </div>

                  <ul className="mt-6 grid flex-1 content-start gap-3">
                    {p.itens.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-prata">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-dpj-claro" strokeWidth={2.5} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => onAssinar(p.id)}
                    className={`${destaque ? 'btn-primario' : 'btn-secundario'} mt-8 h-14 w-full text-base`}
                  >
                    Assinar {p.id === 'semestral' ? 'o Semestral' : 'o Bimestral'}
                  </button>
                </article>
              </Revelar>
            )
          })}
        </div>

        <Revelar className="mx-auto mt-8 flex max-w-4xl items-start justify-center gap-3 text-center text-sm text-texto">
          <ShieldCheck className="h-5 w-5 shrink-0 text-prata" />
          <p>Sem juros. Vagas limitadas por mês para manter o acompanhamento próximo.</p>
        </Revelar>
      </div>
    </section>
  )
}
