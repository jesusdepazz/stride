'use client'

import { BaseballCap, Sneaker, TShirt } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const ease = [0.23, 1, 0.32, 1] as const

export default function CategoryBand() {
  return (
    <section className="border-y border-[#101110]/10 bg-[var(--color-surface)] px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 font-display text-3xl font-extrabold uppercase md:text-4xl">
          Explora por categoría
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <motion.a
            href="/catalogo?cat=Tenis"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease }}
            className="group relative flex h-72 flex-col justify-between bg-[#101110] p-7 text-white md:col-span-2 md:h-auto"
          >
            <Sneaker size={40} weight="thin" className="text-white/40" />
            <div>
              <p className="font-display text-2xl font-black uppercase">Tenis</p>
              <p className="mt-1 text-sm text-white/60">Correr, skate y casual</p>
            </div>
          </motion.a>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
            <motion.a
              href="/catalogo?cat=Ropa"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease, delay: 0.08 }}
              className="group flex h-40 flex-col justify-between border border-[#101110]/10 p-6"
            >
              <TShirt size={28} weight="thin" className="text-[#101110]/40" />
              <p className="font-display text-lg font-black uppercase">Ropa</p>
            </motion.a>
            <motion.a
              href="/catalogo?cat=Accesorios"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease, delay: 0.14 }}
              className="group flex h-40 flex-col justify-between border border-[#101110]/10 p-6"
            >
              <BaseballCap size={28} weight="thin" className="text-[#101110]/40" />
              <p className="font-display text-lg font-black uppercase">Accesorios</p>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
