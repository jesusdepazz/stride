import { PencilSimple } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "@/components/admin/DeleteButton";
import StatusSelect from "@/components/admin/StatusSelect";
import { getProducts } from "@/lib/productStore";
import { formatPriceGTQ } from "@/lib/products";

export default async function AdminDashboardPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-black uppercase tracking-tight">
            Productos
          </h1>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
            {products.length} en el catálogo
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="border border-[#101110]/10 bg-white p-10 text-center text-sm text-[var(--color-ink-muted)]">
          Todavía no hay productos. Agrega el primero con &quot;Nuevo producto&quot;.
        </p>
      ) : (
        <div className="overflow-hidden border border-[#101110]/10 bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#101110]/10 bg-[#101110]/[0.02] text-xs uppercase tracking-wide text-[var(--color-ink-muted)]">
                <th className="px-5 py-3 font-medium">Producto</th>
                <th className="px-5 py-3 font-medium">Precio</th>
                <th className="px-5 py-3 font-medium">Categoría</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.slug} className="border-b border-[#101110]/5 last:border-0">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden bg-[#101110]/[0.04]">
                        {product.image && (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-[var(--color-ink-muted)]">
                          {product.colorway}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">{formatPriceGTQ(product.price)}</td>
                  <td className="px-5 py-4 text-[var(--color-ink-muted)]">
                    {product.category}
                  </td>
                  <td className="px-5 py-4">
                    <StatusSelect slug={product.slug} status={product.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/${product.slug}`}
                        aria-label={`Editar ${product.name}`}
                        className="grid h-9 w-9 place-items-center text-[var(--color-ink-muted)] transition-colors hover:bg-[#101110]/5 hover:text-[var(--color-ink)]"
                      >
                        <PencilSimple size={16} />
                      </Link>
                      <DeleteButton slug={product.slug} label={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
