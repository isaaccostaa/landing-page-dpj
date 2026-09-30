import { useEffect, useState } from 'react'
import { Abertura } from './components/Abertura'
import { Cadastro } from './components/Cadastro'
import { ChamadaFinal, Dicas, Duvidas, Rodape, WhatsAppFlutuante } from './components/Final'
import { AppDPJ, Avaliacao, Metodo } from './components/Metodo'
import { Planos } from './components/Planos'
import { Resultados } from './components/Resultados'
import { Sobre } from './components/Sobre'
import { Topo } from './components/Topo'
import { TreinoHibrido } from './components/TreinoHibrido'
import type { PlanoId } from './data/conteudo'
import { capturarUtms } from './lib/leads'

export default function App() {
  const [plano, setPlano] = useState<PlanoId | null>(null)

  useEffect(capturarUtms, [])

  return (
    <>
      <Topo />
      <main>
        <Abertura />
        <Sobre />
        <Avaliacao />
        <Metodo />
        <AppDPJ />
        <TreinoHibrido />
        <Resultados />
        <Planos onAssinar={setPlano} />
        <Dicas />
        <Duvidas />
        <ChamadaFinal />
      </main>
      <Rodape />
      <WhatsAppFlutuante />
      <Cadastro plano={plano} onFechar={() => setPlano(null)} onTrocarPlano={setPlano} />
    </>
  )
}
