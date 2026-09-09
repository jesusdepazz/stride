"use client";

import { Check, Trash, X } from "@phosphor-icons/react";
import { useState } from "react";
import { deleteProductAction } from "@/app/admin/actions";

export default function DeleteButton({ slug, label }: { slug: string; label: string }) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <form action={deleteProductAction} className="flex items-center gap-1">
        <input type="hidden" name="slug" value={slug} />
        <span className="mr-1 text-xs text-[var(--color-ink-muted)]">¿Eliminar?</span>
        <button
          type="submit"
          aria-label={`Confirmar eliminación de ${label}`}
          className="grid h-8 w-8 place-items-center bg-red-100 text-red-600 transition-colors hover:bg-red-200"
        >
          <Check size={15} weight="bold" />
        </button>
        <button
          type="button"
          aria-label="Cancelar"
          onClick={() => setConfirming(false)}
          className="grid h-8 w-8 place-items-center text-[var(--color-ink-muted)] transition-colors hover:bg-[#101110]/5"
        >
          <X size={15} />
        </button>
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      aria-label={`Eliminar ${label}`}
      className="grid h-9 w-9 place-items-center text-[var(--color-ink-muted)] transition-colors hover:bg-red-50 hover:text-red-600"
    >
      <Trash size={16} />
    </button>
  );
}
