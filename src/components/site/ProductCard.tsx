import { BaseballCap, Camera, Sneaker, TShirt } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'
import type { Product } from '@/lib/products'
import { formatPriceGTQ } from '@/lib/products'

const CATEGORY_ICON: Record<Product['category'], typeof Sneaker> = {
  Tenis: Sneaker,
  Ropa: TShirt,
  Accesorios: BaseballCap,
}

const STATUS_STYLE: Record<Product['status'], string> = {
  Disponible: 'bg-[var(--color-accent)] text-[var(--color-accent-ink)]',
  'Pocas unidades': 'bg-[#101110] text-white',
  Agotado: 'bg-[#101110]/10 text-[var(--color-ink-muted)]',
}

export default function ProductCard({ product }: { product: Product }) {
  const Icon = CATEGORY_ICON[product.category]

  return (
    <a
      href={`/catalogo/${product.slug}`}
      className="group flex flex-col border border-[#101110]/10 bg-[var(--color-surface)] transition-colors duration-200 hover:border-[#101110]/30"
    >
      <div className="relative flex aspect-square flex-col items-center justify-center gap-2 bg-[#eceee9]">
        <span
          className={`absolute left-3 top-3 z-10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${STATUS_STYLE[product.status]}`}
        >
          {product.status}
        </span>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, 50vw"
          />
        ) : (
          <>
            <Icon size={40} weight="thin" className="text-[#101110]/25" />
            <div className="flex items-center gap-1.5 text-[11px] text-[#101110]/35">
              <Camera size={13} />
              Foto próximamente
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-wide text-[var(--color-ink-muted)]">
          {product.category} · {product.colorway}
        </p>
        <h3 className="mb-3 font-display text-lg font-bold uppercase tracking-tight transition-colors group-hover:text-[var(--color-ink-muted)]">
          {product.name}
        </h3>
        <p className="mt-auto border-t border-[#101110]/10 pt-4 font-display text-xl font-bold">
          {formatPriceGTQ(product.price)}
        </p>
      </div>
    </a>
  )
}
