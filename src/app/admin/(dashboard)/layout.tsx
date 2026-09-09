import { Plus, SignOut, Storefront } from "@phosphor-icons/react/dist/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { isValidSessionToken, SESSION_COOKIE } from "@/lib/auth";
import { logoutAction } from "../actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!isValidSessionToken(token)) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#eef0ee] text-[#101110]">
      <header className="border-b border-[#101110]/10 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/admin" className="font-display text-lg font-black uppercase tracking-tight">
            STRIDE <span className="text-sm font-normal text-[var(--color-ink-muted)]">admin</span>
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-4 py-2 text-sm text-[var(--color-ink-muted)] transition-colors hover:bg-[#101110]/5 hover:text-[var(--color-ink)]"
            >
              <Storefront size={16} />
              Productos
            </Link>
            <Link
              href="/admin/nuevo"
              className="flex items-center gap-1.5 bg-[#101110] px-4 py-2 text-sm font-medium text-white"
            >
              <Plus size={16} weight="bold" />
              Nuevo producto
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                aria-label="Cerrar sesión"
                className="grid h-9 w-9 place-items-center text-[var(--color-ink-muted)] transition-colors hover:bg-[#101110]/5 hover:text-[var(--color-ink)]"
              >
                <SignOut size={18} />
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
