import { useState } from 'react'
import { Quote } from 'lucide-react'
import { DEPOIMENTOS, RESULTADOS_ALUNOS } from '../data/conteudo'
import { Cabecalho, Revelar, VideoVertical } from './ui'

const ANGULOS = [
  { id: 'frente', label: 'Frente' },
  { id: 'costas', label: 'Costas' },
  { id: 'lado', label: 'Lado' },
] as const

export function Resultados() {
  const [angulo, setAngulo] = useState<(typeof ANGULOS)[number]['id']>('frente')

  return (
    <section id="resultados" className="border-y border-white/8 bg-grafite-950 pb-16 pt-16 lg:pb-24 lg:pt-24">
      <div className="container-dpj">
        <Cabecalho
          rotulo="Resultados reais"
          titulo={<>Evolução que <span className="text-dpj-claro">aparece</span> e que se mede</>}
          texto="Resultados de alunos acompanhados pela consultoria, registrados em avaliações periódicas de composição corporal, medidas e fotos padronizadas."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <Revelar className="cartao overflow-hidden p-3 sm:p-4">
            <div className="relative overflow-hidden rounded-xl bg-grafite-800">
              {ANGULOS.map((a) => (
                <img
                  key={a.id}
                  src={`/media/aluno-${a.id}.webp`}
                  alt={`Antes e depois de aluno da consultoria, vista de ${a.label.toLowerCase()}`}
                  loading="lazy"
                  width={1400}
                  height={1400}
                  className={`aspect-square w-full object-cover transition-opacity duration-500 ${
                    a.id === angulo ? 'relative opacity-100' : 'absolute inset-0 opacity-0'
                  }`}
                />
              ))}
              <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">Antes</span>
              <span className="absolute right-3 top-3 rounded-full bg-dpj px-3 py-1 text-xs font-semibold uppercase tracking-wider">Depois</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2" role="tablist" aria-label="Ângulo da foto">
              {ANGULOS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  role="tab"
                  aria-selected={a.id === angulo}
                  onClick={() => setAngulo(a.id)}
                  className={`min-h-11 rounded-lg text-sm font-semibold transition ${
                    a.id === angulo ? 'bg-white text-grafite-900' : 'bg-white/5 text-texto hover:bg-white/10'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </Revelar>

          <Revelar atraso={120} className="mx-auto w-full max-w-[320px] lg:max-w-none">
            <VideoVertical arquivo="antes-depois" titulo="Análise do resultado de uma aluna" className="border border-white/10" />
            <p className="mt-3 text-sm text-texto">Neste vídeo, eu apresento a evolução de uma aluna e explico as estratégias que levaram a esse resultado.</p>
          </Revelar>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESULTADOS_ALUNOS.map((r, i) => (
            <Revelar key={r.nome + i} atraso={(i % 3) * 80} className="cartao p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="titulo text-2xl">{r.nome}</h3>
                <span className="text-xs text-texto">{r.tempo}</span>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {r.dados.map((d) => (
                  <li key={d} className="rounded-full border border-dpj/30 bg-dpj/10 px-3 py-1 text-sm font-medium text-white">
                    {d}
                  </li>
                ))}
              </ul>
              {r.nota && <p className="mt-4 text-sm text-texto">{r.nota}</p>}
            </Revelar>
          ))}
        </div>
      </div>

      <div className="relative mt-20 overflow-hidden" aria-label="Depoimentos">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-grafite-950 to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-grafite-950 to-transparent sm:w-32" />
        <div className="faixa-animada flex w-max gap-4">
          {[...DEPOIMENTOS, ...DEPOIMENTOS, ...DEPOIMENTOS, ...DEPOIMENTOS].map((d, i) => (
            <figure key={i} className="flex w-72 shrink-0 items-start gap-3 rounded-2xl border border-white/8 bg-grafite-850 p-5" aria-hidden={i >= DEPOIMENTOS.length}>
              <Quote className="h-5 w-5 shrink-0 text-dpj-claro" />
              <div>
                <blockquote className="font-display text-2xl font-semibold leading-tight">{d.texto}</blockquote>
                <figcaption className="mt-2 text-xs text-texto">{d.origem}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
