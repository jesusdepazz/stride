import { EnvelopeSimple, InstagramLogo, TiktokLogo } from '@phosphor-icons/react/dist/ssr'

const LINKS = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/#lookbook', label: 'Lookbook' },
  { href: '/#opiniones', label: 'Opiniones' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#101110]/10 px-4 py-14 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <p className="mb-3 font-display text-xl font-black uppercase tracking-tight">
            STRIDE
          </p>
          <p className="text-sm leading-relaxed text-[var(--color-ink-muted)]">
            Sneakers, ropa y accesorios en tiradas limitadas.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--color-ink-muted)]">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-[var(--color-ink)]">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3 text-sm text-[var(--color-ink-muted)]">
          <a href="mailto:hola@stride.gt" className="flex items-center gap-2 transition-colors hover:text-[var(--color-ink)]">
            <EnvelopeSimple size={16} /> hola@stride.gt
          </a>
          <div className="flex items-center gap-4 pt-1">
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-[var(--color-ink)]">
              <InstagramLogo size={20} />
            </a>
            <a href="#" aria-label="TikTok" className="transition-colors hover:text-[var(--color-ink)]">
              <TiktokLogo size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-[#101110]/10 pt-6 text-xs text-[var(--color-ink-muted)]">
        © {new Date().getFullYear()} STRIDE. Todos los derechos reservados.
      </div>
    </footer>
  )
}
