import { Activity, ClipboardList, MapPin, Ruler, ScanLine, Smartphone, Star, Target, Timer, TrendingUp } from 'lucide-react'
import { APP_LOJAS, EMPRESA, WHATSAPP } from '../data/conteudo'
import { Cabecalho, IconeWhatsApp, Revelar, SeloLoja } from './ui'

const MEDIDAS = [
  { icone: Activity, titulo: 'Composição corporal', texto: 'Percentual de gordura e massa magra com adipômetro.' },
  { icone: Ruler, titulo: 'Medidas', texto: 'Circunferências e fotos padronizadas com tripé.' },
  { icone: ScanLine, titulo: 'Análise postural', texto: 'Avaliação feita em software, com laudo.' },
  { icone: Target, titulo: 'Rotina e objetivo', texto: 'Histórico, dores, disponibilidade e meta real.' },
]

export function Avaliacao() {
  return (
    <section id="avaliacao" className="relative border-y border-white/8 bg-grafite-950 pb-16 pt-16 lg:pb-24 lg:pt-24">
      <div className="container-dpj">
        {/* 1. Texto de apresentação */}
        <Cabecalho
          rotulo="Porta de entrada"
          titulo={<>Avaliação física e <span className="text-dpj-claro">postural</span> completa</>}
          texto="É aqui que todo acompanhamento começa. Antes de prescrever qualquer exercício, eu preciso entender como o seu corpo está hoje. Por isso, faço essa avaliação pessoalmente, no meu consultório em São Carlos."
        />

        {/* 2. O que é avaliado */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MEDIDAS.map((m, i) => (
            <Revelar key={m.titulo} atraso={i * 80} className="cartao p-6">
              <m.icone className="h-7 w-7 text-dpj-claro" strokeWidth={1.6} />
              <h3 className="titulo mt-5 text-2xl">{m.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-texto">{m.texto}</p>
            </Revelar>
          ))}
        </div>

        {/* 3. Onde fica + agendamento */}
        <Revelar className="mt-6 flex flex-col gap-6 rounded-2xl border border-white/8 bg-grafite-850 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-dpj-claro" />
            <div className="text-sm">
              <p className="font-semibold text-white">{EMPRESA.endereco.linha1}</p>
              <p className="text-texto">{EMPRESA.endereco.linha2}</p>
              <p className="text-texto">{EMPRESA.endereco.cidade}</p>
              <a href={EMPRESA.endereco.mapa} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-medium text-dpj-claro underline-offset-4 hover:underline">
                Abrir no mapa
              </a>
            </div>
          </div>
          <div className="md:text-right">
            <a href={WHATSAPP.avaliacao} target="_blank" rel="noopener noreferrer" className="btn-primario h-14 w-full px-7 text-base md:w-auto">
              <IconeWhatsApp />
              Agendar minha avaliação
            </a>
            <p className="mt-3 text-xs text-texto">Incluída nos planos Bimestral e Semestral.</p>
          </div>
        </Revelar>
      </div>
    </section>
  )
}

const PASSOS = [
  { n: '01', titulo: 'Avaliação', texto: 'Anamnese completa e avaliação física e postural presencial. Aqui nasce o seu ponto de partida.' },
  { n: '02', titulo: 'Plano por fases', texto: 'Treino individualizado e plano alimentar pensados para o seu objetivo e para a sua rotina.' },
  { n: '03', titulo: 'Treino no app', texto: 'Tudo no DPJ App: vídeo de cada exercício, registro de cargas e repetições e a sua evolução em gráficos.' },
  { n: '04', titulo: 'Ajustes constantes', texto: 'Correção de execução e dúvidas pelo WhatsApp, com resposta em até 24h, e novas fases conforme você evolui.' },
]

export function Metodo() {
  return (
    <section id="metodo" className="pb-16 pt-16 lg:pb-24 lg:pt-24">
      <div className="container-dpj">
        <Cabecalho
          rotulo="O método DPJ"
          titulo={<>Quatro etapas. <span className="text-dpj-claro">Um método completo.</span></>}
          texto="Um processo claro do primeiro dia até o resultado, com cada etapa medida e ajustada."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PASSOS.map((p, i) => (
            <Revelar key={p.n} atraso={i * 90} className="group cartao relative overflow-hidden p-6 transition hover:border-dpj/40">
              <span className="titulo block text-6xl text-dpj-claro/80 transition group-hover:text-dpj-claro">{p.n}</span>
              <h3 className="titulo mt-6 text-3xl">{p.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-texto">{p.texto}</p>
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-dpj transition-transform duration-500 group-hover:scale-x-100" />
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  )
}

const FUNCOES = [
  { icone: ClipboardList, texto: 'Treino detalhado da semana' },
  { icone: Smartphone, texto: 'Vídeo de execução de cada exercício' },
  { icone: TrendingUp, texto: 'Evolução em gráficos e avaliações físicas' },
  { icone: Target, texto: 'Alerta quando você está perto de bater um recorde pessoal' },
  { icone: Timer, texto: 'Registro de cargas, repetições e tempo de descanso' },
  { icone: ScanLine, texto: 'Avaliações para baixar em PDF quando quiser' },
]

export function AppDPJ() {
  return (
    <section id="app" className="relative overflow-hidden border-y border-white/8 bg-grafite-950 pb-16 pt-16 lg:pb-24 lg:pt-24">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[480px] w-[480px] brilho-15" />
      <div className="container-dpj relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Cabecalho
            rotulo="Exclusivo para alunos"
            titulo={<>Seu treino no <span className="text-dpj-claro">DPJ App</span></>}
            texto="Um aplicativo próprio, com a marca DPJ, para você treinar com clareza e o Deusmar acompanhar cada carga de perto."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {FUNCOES.map((f, i) => (
              <Revelar key={f.texto} atraso={i * 60}>
                <li className="flex items-start gap-3 text-sm text-prata">
                  <f.icone className="mt-0.5 h-5 w-5 shrink-0 text-dpj-claro" strokeWidth={1.7} />
                  {f.texto}
                </li>
              </Revelar>
            ))}
          </ul>
          <Revelar atraso={200} className="mt-10">
            <div className="flex flex-wrap gap-3">
              <SeloLoja loja="google" href={APP_LOJAS.googlePlay} />
              <SeloLoja loja="apple" href={APP_LOJAS.appStore} />
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-texto">
              <Star className="h-4 w-4 fill-dpj-claro text-dpj-claro" />
              <span><strong className="text-white">5,0</strong> na App Store. Download gratuito, acesso ao treino exclusivo para alunos.</span>
            </p>
          </Revelar>
        </div>
        <Revelar atraso={150} className="mx-auto w-full max-w-md">
          <img
            src="/media/app-dpj.webp"
            alt="Telas do DPJ App com treino, séries, repetições e carga"
            loading="lazy"
            className="w-full rounded-[2rem] border border-white/10 shadow-2xl shadow-black/60"
            width={1248}
            height={1521}
          />
        </Revelar>
      </div>
    </section>
  )
}
