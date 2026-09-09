import { BaseballCap, Camera, Sneaker, TShirt } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCart from "@/components/site/AddToCart";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import { getProductBySlug } from "@/lib/productStore";
import { formatPriceGTQ, type Product } from "@/lib/products";

export const dynamic = "force-dynamic";

const CATEGORY_ICON: Record<Product["category"], typeof Sneaker> = {
  Tenis: Sneaker,
  Ropa: TShirt,
  Accesorios: BaseballCap,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} - STRIDE`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const Icon = CATEGORY_ICON[product.category];

  return (
    <>
      <Navbar />
      <main className="px-4 pb-24 pt-16 md:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 py-12 lg:grid-cols-2 lg:gap-14">
          <div className="relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden bg-[#eceee9]">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            ) : (
              <>
                <Icon size={64} weight="thin" className="text-[#101110]/25" />
                <div className="flex items-center gap-1.5 text-sm text-[#101110]/40">
                  <Camera size={15} />
                  Foto próximamente
                </div>
              </>
            )}
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
              {product.category} · {product.status}
            </p>
            <h1 className="mb-4 font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
              {product.name}
            </h1>
            <p className="mb-6 font-display text-3xl font-black">
              {formatPriceGTQ(product.price)}
            </p>
            <p className="mb-8 max-w-md text-base leading-relaxed text-[var(--color-ink-muted)]">
              {product.description}
            </p>

            <AddToCart product={product} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
