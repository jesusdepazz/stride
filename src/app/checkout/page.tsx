"use client";

import { CheckCircle, Minus, Plus, ShoppingBagOpen } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import { formatPriceGTQ } from "@/lib/products";

const ease = [0.23, 1, 0.32, 1] as const;
const SHIPPING_FLAT_RATE = 45;

export default function CheckoutPage() {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart();
  const [payment, setPayment] = useState<"tarjeta" | "contraentrega">("tarjeta");
  const [confirmedOrder, setConfirmedOrder] = useState<number | null>(null);

  const shipping = items.length > 0 ? SHIPPING_FLAT_RATE : 0;
  const total = subtotal + shipping;

  if (confirmedOrder !== null) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <CheckCircle size={48} weight="fill" className="mx-auto mb-4 text-[var(--color-accent)]" />
            <h1 className="mb-2 font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
              Pedido #{confirmedOrder} confirmado
            </h1>
            <p className="mx-auto max-w-sm text-sm text-[var(--color-ink-muted)]">
              Esto es una demostración: no se procesó ningún cobro real. En un
              sitio en producción, aquí llegaría el correo de confirmación.
            </p>
            <a
              href="/catalogo"
              className="mt-8 inline-flex items-center justify-center bg-[#101110] px-7 py-3.5 text-sm font-semibold text-white"
            >
              Seguir explorando
            </a>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="px-4 pb-24 pt-16 md:px-8">
        <div className="mx-auto max-w-5xl py-12">
          <h1 className="mb-10 font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
            Finalizar compra
          </h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 border border-[#101110]/10 bg-white py-20 text-center text-[var(--color-ink-muted)]">
              <ShoppingBagOpen size={40} weight="thin" />
              <p className="text-sm">Tu carrito está vacío.</p>
              <a href="/catalogo" className="mt-2 text-sm font-semibold underline">
                Ver catálogo
              </a>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setConfirmedOrder(Math.floor(1000 + Math.random() * 9000));
                clear();
              }}
              className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]"
            >
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="mb-4 font-display text-lg font-black uppercase tracking-tight">
                    Datos de envío
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input required placeholder="Nombre completo" className="border border-[#101110]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#101110] sm:col-span-2" />
                    <input required placeholder="Dirección" className="border border-[#101110]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#101110] sm:col-span-2" />
                    <input required placeholder="Ciudad" className="border border-[#101110]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#101110]" />
                    <input required placeholder="Teléfono" className="border border-[#101110]/15 bg-white px-4 py-3 text-sm outline-none focus:border-[#101110]" />
                  </div>
                </div>

                <div>
                  <h2 className="mb-4 font-display text-lg font-black uppercase tracking-tight">
                    Método de pago
                  </h2>
                  <div className="flex flex-col gap-2">
                    {(
                      [
                        { id: "tarjeta", label: "Tarjeta de crédito o débito" },
                        { id: "contraentrega", label: "Pago contra entrega" },
                      ] as const
                    ).map((option) => (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer items-center gap-3 border px-4 py-3.5 text-sm transition-colors ${
                          payment === option.id
                            ? "border-[#101110] bg-white"
                            : "border-[#101110]/15"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={payment === option.id}
                          onChange={() => setPayment(option.id)}
                          className="accent-[#101110]"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-fit bg-[#101110] px-8 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-ink)]"
                >
                  Confirmar pedido
                </button>
              </div>

              <div className="h-fit border border-[#101110]/10 bg-white p-6">
                <h2 className="mb-4 font-display text-lg font-black uppercase tracking-tight">
                  Resumen
                </h2>
                <AnimatePresence initial={false}>
                  <ul className="flex flex-col gap-4">
                    {items.map((item) => (
                      <motion.li
                        key={`${item.slug}-${item.size}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-3"
                      >
                        <div className="h-16 w-16 shrink-0 bg-[#eceee9]" />
                        <div className="flex flex-1 flex-col">
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-[var(--color-ink-muted)]">
                            Talla {item.size}
                          </p>
                          <div className="mt-1 flex items-center justify-between">
                            <div className="flex items-center gap-2 border border-[#101110]/15">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)}
                                className="grid h-6 w-6 place-items-center"
                                aria-label="Reducir cantidad"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="w-4 text-center text-xs">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)}
                                className="grid h-6 w-6 place-items-center"
                                aria-label="Aumentar cantidad"
                              >
                                <Plus size={11} />
                              </button>
                            </div>
                            <p className="text-sm font-semibold">
                              {formatPriceGTQ(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug, item.size)}
                          className="text-xs text-[var(--color-ink-muted)] underline"
                        >
                          Quitar
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                </AnimatePresence>

                <div className="mt-6 flex flex-col gap-2 border-t border-[#101110]/10 pt-4 text-sm">
                  <div className="flex justify-between text-[var(--color-ink-muted)]">
                    <span>Subtotal</span>
                    <span>{formatPriceGTQ(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-ink-muted)]">
                    <span>Envío</span>
                    <span>{formatPriceGTQ(shipping)}</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-[#101110]/10 pt-2 font-display text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPriceGTQ(total)}</span>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
