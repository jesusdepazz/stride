"use client";

import Image from "next/image";
import { useState } from "react";
import { CATEGORIES, STATUSES, type Product } from "@/lib/products";

interface ProductFormProps {
  product?: Product;
  action: (formData: FormData) => void;
  submitLabel: string;
}

const inputClass =
  "border border-[#101110]/15 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#101110]";
const labelClass = "text-sm text-[var(--color-ink-muted)]";

export default function ProductForm({ product, action, submitLabel }: ProductFormProps) {
  const [preview, setPreview] = useState<string | null>(product?.image ?? null);

  return (
    <form action={action} className="flex flex-col gap-6">
      {product?.image && (
        <input type="hidden" name="existingImage" value={product.image} />
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label className={labelClass} htmlFor="name">Nombre</label>
          <input id="name" name="name" required defaultValue={product?.name} className={inputClass} placeholder="Ridge Runner OG" />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="category">Categoría</label>
          <select id="category" name="category" defaultValue={product?.category ?? CATEGORIES[0]} className={inputClass}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="price">Precio (Q)</label>
          <input id="price" name="price" type="number" required defaultValue={product?.price} className={inputClass} placeholder="890" />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="colorway">Color</label>
          <input id="colorway" name="colorway" required defaultValue={product?.colorway} className={inputClass} placeholder="Bone / Lima" />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass} htmlFor="status">Estado</label>
          <select id="status" name="status" defaultValue={product?.status ?? "Disponible"} className={inputClass}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label className={labelClass} htmlFor="sizes">Tallas (separadas por coma)</label>
          <input
            id="sizes"
            name="sizes"
            required
            defaultValue={product?.sizes.join(", ")}
            className={inputClass}
            placeholder="38, 39, 40, 41, 42"
          />
        </div>
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label className={labelClass} htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            defaultValue={product?.description}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className={labelClass} htmlFor="image">Foto del producto</label>
        {preview && (
          <div className="relative mb-2 h-40 w-40 overflow-hidden bg-[#101110]/[0.04]">
            <Image src={preview} alt="Vista previa" fill className="object-cover" />
          </div>
        )}
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
          className="text-sm text-[var(--color-ink-muted)] file:mr-4 file:border-0 file:bg-[#101110]/[0.06] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[var(--color-ink)]"
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-fit bg-[#101110] px-6 py-3 text-sm font-semibold text-white transition-transform duration-150 active:scale-[0.97]"
      >
        {submitLabel}
      </button>
    </form>
  );
}
