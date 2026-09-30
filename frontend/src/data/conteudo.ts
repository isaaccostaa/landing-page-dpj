// Todo o conteúdo editável da página fica aqui.

export const WHATSAPP_NUMERO = '5516997333787'

export function linkWhatsApp(mensagem: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`
}

export const WHATSAPP = {
  avaliacao: linkWhatsApp('Oi Deusmar! Vim pelo site e quero agendar minha avaliação física e postural.'),
  consultoria: linkWhatsApp('Oi Deusmar! Vim pelo site e quero saber sobre a consultoria.'),
  hibrido: linkWhatsApp('Oi Deusmar! Vim pelo site e quero saber sobre o treino híbrido.'),
  geral: linkWhatsApp('Oi Deusmar! Vim pelo site e gostaria de mais informações.'),
}

export const EMPRESA = {
  razaoSocial: 'DEUSMAR CONSULTORIA ESPORTIVA LTDA',
  nomeFantasia: 'DPJ Consultoria Esportiva',
  cnpj: '48.853.039/0001-88',
  email: 'deusmarpj@gmail.com',
  telefone: '(16) 99733-3787',
  instagram: 'https://www.instagram.com/personal.deusmar/',
  endereco: {
    linha1: "Condomínio Rac'Z Center",
    linha2: 'Av. São Carlos, 2205 - 5º andar, sala 507',
    cidade: 'São Carlos - SP',
    mapa: 'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent("Rac'Z Center, Avenida São Carlos 2205, São Carlos SP"),
  },
}

export const APP_LOJAS = {
  googlePlay: 'https://play.google.com/store/apps/details?id=com.dpjapp.dpjapp',
  appStore: 'https://apps.apple.com/br/app/dpj-app/id6753730809',
}

export const NAV = [
  { id: 'metodo', label: 'Método' },
  { id: 'treino-hibrido', label: 'Treino Híbrido' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'planos', label: 'Planos' },
  { id: 'dicas', label: 'Dicas' },
  { id: 'duvidas', label: 'Dúvidas' },
]

export type PlanoId = 'bimestral' | 'semestral'

export interface Plano {
  id: PlanoId
  nome: string
  duracao: string
  resumo: string
  destaque?: string
  precoDe?: string
  precoTotal: string
  parcelas: string
  condicao: string
  itens: string[]
}

const BASE = [
  'Anamnese completa',
  'Avaliação física e postural presencial',
]
const SUPORTE = 'Suporte para correção de exercícios via WhatsApp, de segunda a sexta, com resposta em até 24h'

export const PLANOS: Plano[] = [
  {
    id: 'bimestral',
    nome: 'Acompanhamento Bimestral',
    duracao: '2 meses',
    resumo: 'Para começar com direção e medir a evolução em um ciclo completo.',
    precoTotal: 'R$ 650',
    parcelas: '2x R$ 325',
    condicao: 'ou R$ 650 à vista',
    itens: [
      ...BASE,
      'Uma consulta presencial ou por videochamada',
      'Uma prescrição de treino personalizado, entregue pelo DPJ App',
      'Prescrição do plano alimentar, entregue pelo Webdiet',
      SUPORTE,
    ],
  },
  {
    id: 'semestral',
    nome: 'Acompanhamento Semestral',
    duracao: '6 meses',
    resumo: 'Três fases de treino ajustadas pela sua evolução. É aqui que a transformação acontece.',
    destaque: 'Mais completo',
    precoTotal: 'R$ 1.950',
    parcelas: '6x R$ 325',
    condicao: 'total de R$ 1.950',
    itens: [
      ...BASE,
      'Três consultas presenciais ou por videochamada',
      'Três prescrições de treino personalizadas, entregues pelo DPJ App',
      'Prescrição do plano alimentar, entregue pelo Webdiet',
      SUPORTE,
    ],
  },
]

export const NUMEROS = [
  { valor: '-13', unidade: 'cm', legenda: 'de circunferência abdominal', detalhe: 'Vicente, consultoria' },
  { valor: '-12', unidade: '%', legenda: 'de gordura corporal em 1 ano', detalhe: 'Aluno, 6 fases' },
  { valor: '+2,5', unidade: 'kg', legenda: 'de massa magra em 2 meses', detalhe: 'Aluno, consultoria' },
  { valor: '5,0', unidade: '', legenda: 'de nota do DPJ App', detalhe: 'App Store' },
]

export const RESULTADOS_ALUNOS = [
  { nome: 'Vicente', tempo: 'Consultoria', dados: ['-8 kg', '-13 cm de abdômen', '-7,5% de gordura'] },
  { nome: 'Aluno de 1 ano', tempo: '6 fases de treino', dados: ['-8,5 kg', '-10 cm de abdômen', '-10 cm de quadril', '-12% de gordura'] },
  { nome: 'Aluno', tempo: '2 meses de consultoria', dados: ['-1,7% de gordura', '+2,5 kg de massa livre de gordura'], nota: 'O peso na balança subiu. O corpo mudou.' },
  { nome: 'Giovana', tempo: 'Consultoria', dados: ['-1% de gordura', '+2 kg de massa muscular'] },
  { nome: 'Gui', tempo: 'Consultoria', dados: ['7,5% de gordura', '+1,3 kg de massa livre de gordura'] },
  { nome: 'Atleta de corrida', tempo: 'Treino híbrido', dados: ['1º lugar na categoria', '3º lugar na Américo Night Run', 'P1 em trail com subidas fortes'] },
]

export const DEPOIMENTOS = [
  { texto: 'Excelente profissional, super recomendado.', origem: 'Comentário no Instagram' },
  { texto: 'Você é diferenciado.', origem: 'Comentário no Instagram' },
  { texto: 'Super indico.', origem: 'Comentário no Instagram' },
  { texto: 'O melhor.', origem: 'Comentário no Instagram' },
]

export interface VideoAula {
  arquivo: string
  titulo: string
  tema: string
}

export const VIDEO_AULAS: VideoAula[] = [
  { arquivo: 'aula-strap', titulo: 'Como usar o strap do jeito certo', tema: 'Acessórios' },
  { arquivo: 'aula-terra-sumo', titulo: 'Tudo sobre o terra sumô em 1 minuto', tema: 'Posterior e glúteos' },
  { arquivo: 'aula-supino', titulo: '3 maneiras de falhar no supino', tema: 'Peito' },
  { arquivo: 'aula-puxador', titulo: 'Tudo sobre o puxador aberto', tema: 'Costas' },
  { arquivo: 'aula-elevacao-pelvica', titulo: 'Macetes da barra na elevação pélvica', tema: 'Glúteos' },
  { arquivo: 'aula-triceps-testa', titulo: 'Tudo sobre o tríceps testa', tema: 'Braços' },
  { arquivo: 'aula-triceps-cross', titulo: 'Tríceps no cross corretamente', tema: 'Braços' },
  { arquivo: 'aula-elevacao-lateral', titulo: 'Como substituir a máquina de elevação lateral', tema: 'Ombros' },
]

export const FAQ = [
  {
    pergunta: 'Nunca treinei. A consultoria serve pra mim?',
    resposta: 'Serve. O treino parte da sua avaliação e da anamnese, então o ponto de partida é o seu nível atual. O DPJ App mostra o vídeo de execução de cada exercício e você pode enviar vídeos pelo WhatsApp para correção.',
  },
  {
    pergunta: 'Preciso treinar em academia?',
    resposta: 'Não necessariamente. O treino é montado para a sua realidade: academia completa, academia de condomínio ou treino em casa. Isso é definido na consulta.',
  },
  {
    pergunta: 'Moro fora de São Carlos. Consigo contratar?',
    resposta: 'Sim. As consultas podem ser feitas por videochamada e todo o acompanhamento acontece pelo DPJ App e pelo WhatsApp. A avaliação física e postural presencial é feita no consultório em São Carlos.',
  },
  {
    pergunta: 'Tenho dor ou alguma limitação. Posso treinar?',
    resposta: 'A avaliação postural e a anamnese existem justamente para isso: identificar limitações e montar um treino seguro. Em casos específicos, pode ser pedida a liberação do seu médico ou fisioterapeuta.',
  },
  {
    pergunta: 'Como funciona o contato com o Deusmar?',
    resposta: 'Pelo WhatsApp, de segunda a sexta, com resposta em até 24 horas. Além disso, as consultas presenciais ou por videochamada fazem parte de cada plano.',
  },
  {
    pergunta: 'Como é feito o pagamento?',
    resposta: 'Depois do cadastro, o Deusmar entra em contato pelo WhatsApp para confirmar o plano e enviar a forma de pagamento. O bimestral sai em até 2x e o semestral em até 6x, sem juros.',
  },
]
