import { Dumbbell, Footprints, HeartPulse, Trophy } from 'lucide-react'
import { WHATSAPP } from '../data/conteudo'
import { Cabecalho, IconeWhatsApp, Revelar, VideoVertical } from './ui'

const PILARES = [
  { icone: Dumbbell, titulo: 'Força', texto: 'Musculação periodizada para ganhar massa magra, proteger articulações e render mais.' },
  { icone: HeartPulse, titulo: 'Condicionamento', texto: 'Estímulos aeróbios e anaeróbios dosados para melhorar fôlego e recuperação.' },
  { icone: Footprints, titulo: 'Corrida', texto: 'Força aplicada à corrida: mais economia de movimento e menos risco de lesão.' },
]

export function TreinoHibrido() {
  return (
    <section id="treino-hibrido" className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] brilho-15" />
      <div className="container-dpj relative grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Revelar className="mx-auto w-full max-w-[340px]">
          <VideoVertical arquivo="treino-hibrido" titulo="Treino híbrido com Deusmar Junqueira" className="border border-white/10" />
        </Revelar>

        <div>
          <Cabecalho
            rotulo="Treino Híbrido"
            titulo={<>Forte na academia. <span className="text-dpj-claro">Rápido na rua.</span></>}
            texto="O treino híbrido combina musculação e condicionamento no mesmo planejamento. É para quem quer um corpo bonito e que também performa: correr melhor, subir o ritmo e ter energia para a vida."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {PILARES.map((p, i) => (
              <Revelar key={p.titulo} atraso={i * 80} className="cartao p-5">
                <p.icone className="h-6 w-6 text-dpj-claro" strokeWidth={1.7} />
                <h3 className="titulo mt-4 text-2xl">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-texto">{p.texto}</p>
              </Revelar>
            ))}
          </div>

          <Revelar atraso={200} className="mt-6 flex items-start gap-4 rounded-2xl border border-dpj/30 bg-dpj/10 p-5">
            <Trophy className="h-6 w-6 shrink-0 text-dpj-claro" strokeWidth={1.7} />
            <p className="text-sm leading-relaxed text-prata">
              <strong className="text-white">Resultado na pista:</strong> atleta acompanhado pelo Deusmar conquistou o 1º lugar na
              categoria, o 3º lugar na Américo Night Run e o P1 em um trail com subidas fortes.
            </p>
          </Revelar>

          <Revelar atraso={250} className="mt-8">
            <a href={WHATSAPP.hibrido} target="_blank" rel="noopener noreferrer" className="btn-primario h-14 w-full px-7 text-base sm:w-auto">
              <IconeWhatsApp />
              Quero o treino híbrido
            </a>
          </Revelar>
        </div>
      </div>
    </section>
  )
}
