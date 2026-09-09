import type { Metadata } from "next";
import CatalogGrid from "@/components/site/CatalogGrid";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import { getProducts } from "@/lib/productStore";
import { CATEGORIES, type ProductCategory } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Catálogo - STRIDE",
  description: "Tenis, ropa y accesorios disponibles ahora.",
};

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const products = await getProducts();
  const initialFilter = CATEGORIES.includes(cat as ProductCategory)
    ? (cat as ProductCategory)
    : "Todo";

  return (
    <>
      <Navbar />
      <main className="px-4 pt-16 pb-24 md:px-8">
        <div className="mx-auto max-w-6xl py-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            Catálogo
          </p>
          <h1 className="mb-3 max-w-2xl font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
            Todo lo disponible ahora
          </h1>
          <p className="mb-12 max-w-xl text-base text-[var(--color-ink-muted)]">
            Cuando una pieza se agota, queda marcada así. Sin promesas de
            restock que no cumplimos.
          </p>

          <CatalogGrid products={products} initialFilter={initialFilter} />
        </div>
      </main>
      <Footer />
    </>
  );
}
