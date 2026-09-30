import { ArrowRight, MapPin, Star } from 'lucide-react'
import { NUMEROS, WHATSAPP } from '../data/conteudo'
import { IconeWhatsApp, Revelar } from './ui'

export function Abertura() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-24 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 grao" />
      <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] brilho-25" />

      <div className="container-dpj relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Revelar>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-prata">
            <MapPin className="h-3.5 w-3.5 text-dpj-claro" />
            Personal trainer em São Carlos e consultoria para todo o Brasil
          </p>
          <h1 className="titulo mt-6 text-[3.4rem] sm:text-7xl lg:text-[5.5rem]">
            Do primeiro treino
            <span className="block text-dpj-claro">ao próximo nível.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-texto sm:text-lg">
            Sou o <strong className="text-white">Deusmar Junqueira</strong>, personal trainer em São Carlos e fundador da DPJ
            Consultoria Esportiva. Seja para dar o primeiro passo ou para destravar a evolução de quem já treina, eu te acompanho
            de perto: avaliação física e postural, treino individualizado no <strong className="text-white">DPJ App</strong> e
            suporte direto pelo WhatsApp.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={WHATSAPP.avaliacao} target="_blank" rel="noopener noreferrer" className="btn-primario h-14 px-7 text-base">
              <IconeWhatsApp />
              Agendar minha avaliação
            </a>
            <a href="#planos" className="btn-secundario h-14 px-7 text-base">
              Quero a consultoria
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4 text-sm text-texto">
            <div className="flex -space-x-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-dpj-claro text-dpj-claro" />
              ))}
            </div>
            <span>Nota 5,0 do DPJ App na App Store</span>
          </div>
        </Revelar>

        <Revelar atraso={150} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
            <img
              src="/media/deusmar-perfil.webp"
              alt="Deusmar Junqueira, personal trainer em São Carlos"
              className="h-full w-full object-cover object-top"
              width={640}
              height={800}
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-grafite-900 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5">
              <p className="titulo text-3xl">Deusmar Junqueira</p>
              <p className="mt-1 text-sm text-prata">Personal trainer | DPJ Consultoria Esportiva</p>
            </div>
          </div>
          <div className="absolute -left-3 top-8 hidden rounded-2xl border border-white/10 bg-grafite-850/90 px-4 py-3 backdrop-blur sm:block lg:-left-8">
            <p className="titulo text-3xl text-dpj-claro">-12%</p>
            <p className="text-xs text-texto">de gordura em 1 ano</p>
          </div>
        </Revelar>
      </div>

      <div className="container-dpj relative mt-16 lg:mt-24">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 lg:grid-cols-4">
          {NUMEROS.map((n, i) => (
            <Revelar key={n.legenda} atraso={i * 80} className="h-full bg-grafite-900 p-5 sm:p-7">
              <p className="titulo text-5xl sm:text-6xl">
                {n.valor}
                <span className="text-dpj-claro">{n.unidade}</span>
              </p>
              <p className="mt-2 text-sm text-prata">{n.legenda}</p>
              <p className="mt-1 text-xs text-texto/70">{n.detalhe}</p>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  )
}
