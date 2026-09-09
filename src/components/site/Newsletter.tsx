'use client'

import { CheckCircle, PaperPlaneTilt } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

export default function Newsletter() {
  const [sent, setSent] = useState(false)

  return (
    <section className="bg-[var(--color-accent)] px-4 py-16 text-[var(--color-accent-ink)] md:px-8 md:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
            Entérate antes que se agote
          </h2>
          <p className="mt-2 max-w-md text-sm text-[var(--color-accent-ink)]/70">
            Un correo cuando entra una edición nueva. Nada más.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.p
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <CheckCircle size={20} weight="fill" />
              Listo, ya estás en la lista.
            </motion.p>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className="flex w-full max-w-md gap-2"
            >
              <input
                type="email"
                required
                placeholder="tu@correo.com"
                className="w-full border border-[var(--color-accent-ink)]/30 bg-transparent px-4 py-3 text-sm placeholder:text-[var(--color-accent-ink)]/50 focus:border-[var(--color-accent-ink)] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Suscribirme"
                className="flex shrink-0 items-center justify-center bg-[#101110] px-5 py-3 text-white transition-transform duration-150 active:scale-[0.97]"
              >
                <PaperPlaneTilt size={18} weight="bold" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
