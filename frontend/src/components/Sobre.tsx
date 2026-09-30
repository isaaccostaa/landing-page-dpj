import { Check } from 'lucide-react'
import { Revelar, VideoVertical } from './ui'

const PILARES = [
  'Treino individualizado, montado a partir da sua avaliação',
  'Execução corrigida por vídeo, sem achismo',
  'Evolução medida com dados, não só com a balança',
  'Acompanhamento próximo, com vagas limitadas por mês',
]

export function Sobre() {
  return (
    <section id="sobre" className="py-24 lg:py-32">
      <div className="container-dpj grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Revelar className="order-2 lg:order-1">
          <div className="grid grid-cols-5 gap-3 sm:gap-4">
            <div className="col-span-3 overflow-hidden rounded-2xl border border-white/8">
              <img
                src="/media/deusmar-shape.webp"
                alt="Físico do personal Deusmar Junqueira"
                loading="lazy"
                className="h-full w-full object-cover"
                width={700}
                height={700}
              />
            </div>
            <div className="col-span-2">
              <VideoVertical arquivo="antes-depois-deusmar" titulo="A transformação do próprio Deusmar" />
              <p className="mt-2 text-xs text-texto">A transformação do próprio Deusmar</p>
            </div>
          </div>
        </Revelar>

        <div className="order-1 lg:order-2">
          <Revelar>
            <span className="rotulo">Quem vai te acompanhar</span>
            <h2 className="titulo mt-4 text-4xl sm:text-5xl lg:text-6xl">
              Ele já esteve <span className="text-dpj-claro">do outro lado</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-texto sm:text-lg">
              O Deusmar também já precisou transformar o próprio corpo. Hoje, à frente da
              DPJ Consultoria Esportiva, ele usa o que aprendeu na prática e na ciência do treinamento para
              levar alunos de São Carlos e de outras cidades a resultados que dá para medir.
            </p>
          </Revelar>
          <ul className="mt-8 grid gap-3">
            {PILARES.map((p, i) => (
              <Revelar key={p} atraso={i * 70}>
                <li className="flex items-start gap-3 rounded-xl border border-white/8 bg-grafite-850 p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dpj/15">
                    <Check className="h-3.5 w-3.5 text-dpj-claro" />
                  </span>
                  <span className="text-sm text-prata sm:text-base">{p}</span>
                </li>
              </Revelar>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
