import ProductForm from "@/components/admin/ProductForm";
import { createProductAction } from "../../actions";

export default function NuevoProductoPage() {
  return (
    <div>
      <h1 className="mb-8 font-display text-2xl font-black uppercase tracking-tight">
        Nuevo producto
      </h1>
      <ProductForm action={createProductAction} submitLabel="Agregar producto" />
    </div>
  );
}
