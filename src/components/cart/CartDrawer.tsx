'use client'

import { Minus, Plus, ShoppingBagOpen, X } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { formatPriceGTQ } from '@/lib/products'
import { useCart } from './CartContext'

const ease = [0.23, 1, 0.32, 1] as const

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/40"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-[var(--color-bg)]"
          >
            <div className="flex items-center justify-between border-b border-[#101110]/10 px-6 py-5">
              <h2 className="font-display text-lg font-black uppercase tracking-tight">
                Tu carrito
              </h2>
              <button
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="grid h-9 w-9 place-items-center"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-[var(--color-ink-muted)]">
                  <ShoppingBagOpen size={40} weight="thin" />
                  <p className="text-sm">Tu carrito está vacío.</p>
                </div>
              ) : (
                <ul className="flex flex-col gap-5">
                  {items.map((item) => (
                    <li key={`${item.slug}-${item.size}`} className="flex gap-4">
                      <div className="h-20 w-20 shrink-0 bg-[#eceee9]" />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold">{item.name}</p>
                          <button
                            onClick={() => removeItem(item.slug, item.size)}
                            aria-label={`Quitar ${item.name}`}
                            className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-[var(--color-ink-muted)]">
                          Talla {item.size} · {item.colorway}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 border border-[#101110]/15">
                            <button
                              onClick={() =>
                                updateQuantity(item.slug, item.size, item.quantity - 1)
                              }
                              aria-label="Reducir cantidad"
                              className="grid h-7 w-7 place-items-center"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-4 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.slug, item.size, item.quantity + 1)
                              }
                              aria-label="Aumentar cantidad"
                              className="grid h-7 w-7 place-items-center"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm font-semibold">
                            {formatPriceGTQ(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[#101110]/10 px-6 py-5">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-[var(--color-ink-muted)]">Subtotal</span>
                  <span className="font-display text-lg font-bold">
                    {formatPriceGTQ(subtotal)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex w-full items-center justify-center bg-[#101110] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-ink)]"
                >
                  Ir a pagar
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
