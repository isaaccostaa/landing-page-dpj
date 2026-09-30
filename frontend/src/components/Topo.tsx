import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV, WHATSAPP } from '../data/conteudo'

export function Topo() {
  const [rolou, setRolou] = useState(false)
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
  }, [aberto])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        aberto
          ? 'bg-grafite-900'
          : rolou
            ? 'border-b border-white/8 bg-grafite-900/85 backdrop-blur-xl'
            : 'bg-transparent'
      }`}
    >
      <div className="container-dpj flex h-16 items-center justify-between lg:h-20">
        <a href="#inicio" aria-label="DPJ Personal Trainer - início" onClick={() => setAberto(false)}>
          <img src="/media/logo-dpj.webp" alt="DPJ Personal Trainer" className="h-8 w-auto lg:h-10" width={104} height={40} />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-sm font-medium text-texto transition hover:text-white">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={WHATSAPP.avaliacao} target="_blank" rel="noopener noreferrer" className="btn-primario hidden min-h-10 px-5 sm:inline-flex">
            Agendar avaliação
          </a>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 lg:hidden"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          >
            {aberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {aberto && (
        <nav className="container-dpj flex h-[calc(100dvh-4rem)] flex-col pb-8 pt-4 lg:hidden" aria-label="Menu">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setAberto(false)}
              className="titulo border-b border-white/8 py-4 text-3xl"
            >
              {n.label}
            </a>
          ))}
          <div className="mt-auto grid gap-3">
            <a href={WHATSAPP.avaliacao} target="_blank" rel="noopener noreferrer" className="btn-primario">
              Agendar minha avaliação
            </a>
            <a href="#planos" onClick={() => setAberto(false)} className="btn-secundario">
              Ver planos
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
