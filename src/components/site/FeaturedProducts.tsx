'use client'

import { ArrowUpRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'
import ProductCard from './ProductCard'

const ease = [0.23, 1, 0.32, 1] as const

export default function FeaturedProducts({ products }: { products: Product[] }) {
  const featured = products.slice(0, 4)

  return (
    <section id="catalogo" className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-lg font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
            Lo más buscado
          </h2>
          <a
            href="/catalogo"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold"
          >
            Ver todo el catálogo
            <ArrowUpRight
              size={15}
              weight="bold"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease, delay: i * 0.06 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
