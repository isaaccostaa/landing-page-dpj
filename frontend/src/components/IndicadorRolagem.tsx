import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

/** Seta discreta no rodapé da tela indicando que há mais conteúdo abaixo. Some perto do fim da página. */
export function IndicadorRolagem() {
  const [visivel, setVisivel] = useState(true)

  useEffect(() => {
    const atualizar = () => {
      const faltam = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)
      setVisivel(faltam > 600)
    }
    atualizar()
    window.addEventListener('scroll', atualizar, { passive: true })
    window.addEventListener('resize', atualizar)
    return () => {
      window.removeEventListener('scroll', atualizar)
      window.removeEventListener('resize', atualizar)
    }
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
      aria-label="Rolar para ver mais conteúdo"
      tabIndex={visivel ? 0 : -1}
      className={`fixed bottom-6 left-1/2 z-30 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-grafite-900/60 text-prata backdrop-blur-sm transition-opacity duration-500 hover:text-white ${
        visivel ? 'opacity-70 hover:opacity-100' : 'pointer-events-none opacity-0'
      }`}
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ChevronDown className="seta-descer h-5 w-5" strokeWidth={2} />
    </button>
  )
}
