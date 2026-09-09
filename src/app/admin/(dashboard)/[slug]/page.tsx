import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { getProductBySlug } from "@/lib/productStore";
import { updateProductAction } from "../../actions";

export default async function EditarProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const action = updateProductAction.bind(null, slug);

  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-black uppercase tracking-tight">
        Editar {product.name}
      </h1>
      <ProductForm product={product} action={action} submitLabel="Guardar cambios" />
    </div>
  );
}
