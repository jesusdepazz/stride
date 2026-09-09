'use client'

import { ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const ease = [0.23, 1, 0.32, 1] as const

const TICKER = [
  'NUEVA COLECCIÓN',
  'ENVÍO GRATIS DESDE Q500',
  'EDICIONES LIMITADAS',
  'CAMBIOS SIN COSTO',
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 md:pt-24">
      <div className="mx-auto max-w-6xl px-4 pb-16 md:px-8 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]"
        >
          Nueva colección · Primavera 26
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="max-w-3xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl"
        >
          Lo que te pones,
          <br />
          habla primero.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="mt-8 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-sm text-base text-[var(--color-ink-muted)]">
            Tenis, ropa y accesorios en tiradas cortas. Cuando se agotan, se
            agotan.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/catalogo"
              className="group inline-flex items-center gap-2 bg-[#101110] px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-ink)]"
            >
              Ver colección
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="/catalogo?cat=Tenis"
              className="inline-flex items-center gap-2 border border-[#101110]/20 px-7 py-3.5 text-sm font-semibold transition-colors duration-150 hover:border-[#101110]"
            >
              Solo tenis
            </a>
          </div>
        </motion.div>
      </div>

      <div className="overflow-hidden border-y border-[#101110]/10 bg-[#101110] py-3.5 text-white">
        <div className="marquee-track">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              className="mx-6 shrink-0 font-display text-sm font-bold uppercase tracking-wide"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
