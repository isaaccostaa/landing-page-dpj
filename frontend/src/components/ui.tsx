import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Play } from 'lucide-react'

/** Faz o conteúdo surgir suavemente quando entra na tela. */
export function Revelar({ children, className = '', atraso = 0 }: { children: ReactNode; className?: string; atraso?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visivel, setVisivel] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisivel(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={`revelar ${visivel ? 'visivel' : ''} ${className}`} style={{ transitionDelay: `${atraso}ms` }}>
      {children}
    </div>
  )
}

export function Cabecalho({ rotulo, titulo, texto, centro = false }: { rotulo: string; titulo: ReactNode; texto?: ReactNode; centro?: boolean }) {
  return (
    <Revelar className={`max-w-2xl ${centro ? 'mx-auto text-center' : ''}`}>
      <span className="rotulo">{rotulo}</span>
      <h2 className="titulo mt-4 text-4xl sm:text-5xl lg:text-6xl">{titulo}</h2>
      {texto && <p className="mt-5 text-base leading-relaxed text-texto sm:text-lg">{texto}</p>}
    </Revelar>
  )
}

/**
 * Vídeo vertical: mostra só a capa e cria o <video> quando a pessoa aperta o play.
 * Nada do vídeo é baixado antes disso (economiza dados e deixa a rolagem leve no celular).
 */
export function VideoVertical({ arquivo, titulo, className = '' }: { arquivo: string; titulo: string; className?: string }) {
  const [tocando, setTocando] = useState(false)

  function tocar() {
    document.querySelectorAll('video').forEach((v) => v.pause())
    setTocando(true)
  }

  return (
    <div className={`relative aspect-[9/16] overflow-hidden rounded-2xl bg-grafite-800 ${className}`}>
      {tocando ? (
        <video
          src={`/media/${arquivo}.mp4`}
          poster={`/media/${arquivo}.jpg`}
          autoPlay
          playsInline
          controls
          className="h-full w-full object-cover"
          aria-label={titulo}
        />
      ) : (
        <img src={`/media/${arquivo}.jpg`} alt="" loading="lazy" className="h-full w-full object-cover" width={540} height={960} />
      )}
      {!tocando && (
        <button
          type="button"
          onClick={tocar}
          className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/10 to-transparent"
          aria-label={`Assistir: ${titulo}`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-dpj/90 shadow-[0_0_0_10px_rgba(196,22,28,0.2)] transition group-hover:scale-110 group-hover:bg-dpj-claro">
            <Play className="ml-1 h-6 w-6 fill-white text-white" />
          </span>
        </button>
      )}
    </div>
  )
}

export function IconeWhatsApp({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43zm8.03-17.46A11.28 11.28 0 0 0 12.05.72C5.8.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.64l6.04-1.58a11.33 11.33 0 0 0 5.41 1.38h.01c6.25 0 11.34-5.09 11.35-11.34 0-3.03-1.18-5.88-3.33-8.02z" />
    </svg>
  )
}

export function IconeInstagram({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function SeloLoja({ loja, href }: { loja: 'google' | 'apple'; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-14 items-center gap-3 rounded-xl border border-white/15 bg-black px-4 transition hover:border-white/40"
    >
      {loja === 'google' ? (
        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
          <path fill="#34A853" d="M3.6 1.8 13.3 11.5 3.6 21.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1z" />
          <path fill="#FBBC04" d="m16.6 8.2-3.3 3.3 3.3 3.3 3.8-2.1c1-.6 1-1.9 0-2.4z" />
          <path fill="#4285F4" d="M3.6 1.8c.3-.2.8-.2 1.2 0l11.8 6.4-3.3 3.3z" />
          <path fill="#EA4335" d="m13.3 11.5 3.3 3.3-11.8 6.5c-.4.2-.9.2-1.2-.1z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6" aria-hidden="true">
          <path d="M16.37 12.6c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.9-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.89 2.65 3.24 2.6 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.28-1.27 3.14-2.52.99-1.45 1.4-2.85 1.42-2.92-.03-.01-2.72-1.05-2.74-4.13zM13.79 4.96c.72-.87 1.2-2.07 1.07-3.27-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 2-1.09 3.18 1.15.09 2.32-.58 3.04-1.47z" />
        </svg>
      )}
      <span className="leading-tight">
        <span className="block text-[10px] uppercase tracking-wider text-texto">{loja === 'google' ? 'Disponível no' : 'Baixar na'}</span>
        <span className="block text-sm font-semibold text-white">{loja === 'google' ? 'Google Play' : 'App Store'}</span>
      </span>
    </a>
  )
}
