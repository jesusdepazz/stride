'use client'

import { useState } from 'react'
import { useCart } from '@/components/cart/CartContext'
import type { Product } from '@/lib/products'

export default function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  )
  const [error, setError] = useState(false)
  const isOutOfStock = product.status === 'Agotado'

  return (
    <div>
      <div className="mb-8 border-y border-[#101110]/10 py-6">
        <p className="mb-3 text-xs uppercase tracking-wide text-[var(--color-ink-muted)]">
          Color: {product.colorway}
        </p>
        <p className="mb-2 text-xs uppercase tracking-wide text-[var(--color-ink-muted)]">
          Talla {error && <span className="text-red-600">· elige una talla</span>}
        </p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              disabled={isOutOfStock}
              onClick={() => {
                setSize(s)
                setError(false)
              }}
              className={`border px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                size === s
                  ? 'border-[#101110] bg-[#101110] text-white'
                  : 'border-[#101110]/20 hover:border-[#101110]/50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={isOutOfStock}
        onClick={() => {
          if (!size) {
            setError(true)
            return
          }
          addItem({
            slug: product.slug,
            name: product.name,
            price: product.price,
            size,
            colorway: product.colorway,
            image: product.image,
          })
        }}
        className="inline-flex items-center justify-center bg-[#101110] px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-ink)] disabled:cursor-not-allowed disabled:bg-[#101110]/15 disabled:text-[var(--color-ink-muted)] disabled:hover:bg-[#101110]/15 disabled:hover:text-[var(--color-ink-muted)]"
      >
        {isOutOfStock ? 'Agotado' : 'Agregar al carrito'}
      </button>
    </div>
  )
}
