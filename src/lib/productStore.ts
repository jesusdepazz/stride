import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { Product } from "./products";
import { slugify } from "./products";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

async function readAll(): Promise<Product[]> {
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Product[];
}

async function writeAll(products: Product[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
}

export async function getProducts(): Promise<Product[]> {
  return readAll();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await readAll();
  return all.find((p) => p.slug === slug);
}

export type ProductInput = Omit<Product, "slug">;

export async function createProduct(input: ProductInput): Promise<Product> {
  const all = await readAll();
  const base = slugify(input.name);
  let slug = base;
  let n = 2;
  while (all.some((p) => p.slug === slug)) {
    slug = `${base}-${n}`;
    n += 1;
  }
  const product: Product = { ...input, slug };
  all.push(product);
  await writeAll(all);
  return product;
}

export async function updateProduct(
  slug: string,
  input: ProductInput,
): Promise<Product | undefined> {
  const all = await readAll();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return undefined;
  const updated: Product = { ...input, slug };
  all[idx] = updated;
  await writeAll(all);
  return updated;
}

export async function deleteProduct(slug: string): Promise<void> {
  const all = await readAll();
  await writeAll(all.filter((p) => p.slug !== slug));
}
