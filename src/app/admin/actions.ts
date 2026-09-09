"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import { SESSION_COOKIE } from "@/lib/auth";
import {
  createProduct,
  deleteProduct,
  getProductBySlug,
  updateProduct,
  type ProductInput,
} from "@/lib/productStore";
import type { ProductCategory, ProductStatus } from "@/lib/products";

export async function logoutAction() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

function revalidatePublicPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/catalogo");
  revalidatePath("/admin");
  if (slug) revalidatePath(`/catalogo/${slug}`);
}

async function saveImageIfProvided(
  formData: FormData,
  slugHint: string,
): Promise<string | undefined> {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return undefined;

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const filename = `${slugHint}-${Date.now()}.${ext || "jpg"}`;
  const dir = path.join(process.cwd(), "public", "uploads", "products");
  await fs.mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, filename), buffer);
  return `/uploads/products/${filename}`;
}

function parseProductInput(formData: FormData): ProductInput {
  const sizes = String(formData.get("sizes") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    name: String(formData.get("name") || "").trim(),
    category: String(formData.get("category")) as ProductCategory,
    price: Number(formData.get("price")),
    colorway: String(formData.get("colorway") || "").trim(),
    sizes,
    status: String(formData.get("status")) as ProductStatus,
    description: String(formData.get("description") || "").trim(),
  };
}

export async function createProductAction(formData: FormData) {
  const input = parseProductInput(formData);
  const product = await createProduct(input);

  const image = await saveImageIfProvided(formData, product.slug);
  if (image) {
    await updateProduct(product.slug, { ...input, image });
  }

  revalidatePublicPages(product.slug);
  redirect("/admin");
}

export async function updateProductAction(slug: string, formData: FormData) {
  const input = parseProductInput(formData);
  const existingImage = String(formData.get("existingImage") || "") || undefined;
  const newImage = await saveImageIfProvided(formData, slug);

  await updateProduct(slug, { ...input, image: newImage ?? existingImage });
  revalidatePublicPages(slug);
  redirect("/admin");
}

export async function deleteProductAction(formData: FormData) {
  const slug = String(formData.get("slug") || "");
  if (!slug) return;
  await deleteProduct(slug);
  revalidatePublicPages(slug);
}

export async function updateStatusAction(formData: FormData) {
  const slug = String(formData.get("slug") || "");
  const status = String(formData.get("status") || "") as ProductStatus;
  if (!slug || !status) return;
  const current = await getProductBySlug(slug);
  if (!current) return;
  const { slug: _s, ...rest } = current;
  await updateProduct(slug, { ...rest, status });
  revalidatePublicPages(slug);
}
