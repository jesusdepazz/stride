'use client'

import { List, ShoppingBag, X } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '@/components/cart/CartContext'

const LINKS = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/#lookbook', label: 'Lookbook' },
  { href: '/#opiniones', label: 'Opiniones' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { totalItems, openCart } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-[#101110]/10 bg-[var(--color-bg)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <a href="/" className="font-display text-2xl font-black tracking-tight">
          STRIDE
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors duration-150 hover:text-[var(--color-ink-muted)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={openCart}
            aria-label="Abrir carrito"
            className="relative grid h-9 w-9 place-items-center"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center bg-[var(--color-accent)] text-[10px] font-bold text-[var(--color-accent-ink)]">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            className="grid h-9 w-9 place-items-center lg:hidden"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden border-t border-[#101110]/10 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-2 py-2.5 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
