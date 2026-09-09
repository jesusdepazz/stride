'use client'

import { motion } from 'framer-motion'

const ease = [0.23, 1, 0.32, 1] as const

const STATS = [
  { value: '46', label: 'Modelos en tienda' },
  { value: '3.2k', label: 'Pares vendidos este año' },
  { value: '48h', label: 'Entrega en ciudad' },
]

export default function Lookbook() {
  return (
    <section id="lookbook" className="bg-[#101110] px-4 py-20 text-white md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease }}
          className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl"
        >
          Diseñado para moverse, hecho para durar.
        </motion.h2>

        <div className="grid grid-cols-3 gap-6 lg:items-end">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              className="border-t border-white/20 pt-4"
            >
              <p className="font-display text-3xl font-black md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs text-white/50">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
