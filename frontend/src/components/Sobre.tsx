import { Check } from 'lucide-react'
import { Revelar, VideoVertical } from './ui'

const PILARES = [
  'Prescrevo um treino individualizado com base na sua avaliação física e postural',
  'Acompanho e corrijo a execução dos seus exercícios por vídeo',
  'Monitoro a sua evolução com avaliações periódicas de composição corporal e medidas',
]

export function Sobre() {
  return (
    <section id="sobre" className="pb-16 pt-24 lg:pb-24 lg:pt-32">
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
              <VideoVertical arquivo="antes-depois-deusmar" titulo="A minha própria transformação" />
              <p className="mt-2 text-xs text-texto">A minha própria transformação</p>
            </div>
          </div>
        </Revelar>

        <div className="order-1 lg:order-2">
          <Revelar>
            <span className="rotulo">Sobre</span>
            <h2 className="titulo mt-4 text-4xl sm:text-5xl lg:text-6xl">
              Eu não só passo treino. <span className="text-dpj-claro">Eu acompanho você.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-texto sm:text-lg">
              Meu trabalho começa entendendo o seu corpo, a sua rotina e o seu objetivo. A partir disso, monto um plano
              por fases e ajusto cada etapa conforme você evolui. Eu também precisei transformar o meu próprio corpo,
              então sei, na prática, o que funciona. Hoje, pela DPJ Consultoria Esportiva, acompanho alunos em São Carlos
              e em outras cidades rumo a resultados que dá para medir.
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
