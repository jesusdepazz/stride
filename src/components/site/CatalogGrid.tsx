'use client'

import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { CATEGORIES, type Product } from '@/lib/products'
import ProductCard from './ProductCard'

const FILTERS: Array<Product['category'] | 'Todo'> = ['Todo', ...CATEGORIES]

export default function CatalogGrid({
  products,
  initialFilter,
}: {
  products: Product[]
  initialFilter?: (typeof FILTERS)[number]
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>(initialFilter ?? 'Todo')

  const filtered = useMemo(
    () => (filter === 'Todo' ? products : products.filter((p) => p.category === filter)),
    [products, filter],
  )

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
              filter === cat
                ? 'bg-[#101110] text-white'
                : 'border border-[#101110]/15 text-[var(--color-ink-muted)] hover:border-[#101110]/40 hover:text-[var(--color-ink)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product, i) => (
          <motion.div
            key={product.slug}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-[var(--color-ink-muted)]">
          Por ahora no hay piezas en esta categoría.
        </p>
      )}
    </div>
  )
}
