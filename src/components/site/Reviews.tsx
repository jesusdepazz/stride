'use client'

import { motion } from 'framer-motion'

const ease = [0.23, 1, 0.32, 1] as const

const QUOTES = [
  {
    quote:
      'Compré los Ridge Runner en el lanzamiento y llegaron al día siguiente. La talla vino exacta a la guía del sitio.',
    name: 'Valeria Chinchilla',
    role: 'Compró Ridge Runner OG',
  },
  {
    quote:
      'La chaqueta se siente de otro nivel comparada con lo que compraba antes. Ya voy en mi tercera compra.',
    name: 'Diego Argueta',
    role: 'Compró Coach Jacket Ligera',
  },
]

export default function Reviews() {
  return (
    <section id="opiniones" className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
          Gente que ya lo trae puesto
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {QUOTES.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease, delay: i * 0.1 }}
              className="border border-[#101110]/10 bg-[var(--color-surface)] p-8"
            >
              <blockquote className="mb-6 text-lg leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-sm text-[var(--color-ink-muted)]">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
