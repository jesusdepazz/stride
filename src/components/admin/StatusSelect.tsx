"use client";

import { STATUSES, type ProductStatus } from "@/lib/products";
import { updateStatusAction } from "@/app/admin/actions";

export default function StatusSelect({
  slug,
  status,
}: {
  slug: string;
  status: ProductStatus;
}) {
  return (
    <form action={updateStatusAction}>
      <input type="hidden" name="slug" value={slug} />
      <select
        name="status"
        defaultValue={status}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="border border-[#101110]/15 bg-white px-3 py-1.5 text-sm outline-none transition-colors focus:border-[#101110]"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </form>
  );
}
