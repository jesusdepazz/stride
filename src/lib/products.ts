export type ProductCategory = "Tenis" | "Ropa" | "Accesorios";
export type ProductStatus = "Disponible" | "Pocas unidades" | "Agotado";

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  colorway: string;
  sizes: string[];
  status: ProductStatus;
  description: string;
  /** relative path under /public, e.g. "/uploads/products/xyz.jpg" */
  image?: string;
}

export const CATEGORIES: ProductCategory[] = ["Tenis", "Ropa", "Accesorios"];
export const STATUSES: ProductStatus[] = ["Disponible", "Pocas unidades", "Agotado"];

export function formatPriceGTQ(value: number) {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
    maximumFractionDigits: 0,
  }).format(value);
}

export function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
