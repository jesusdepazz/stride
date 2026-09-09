import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Panel de administración - STRIDE",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eef0ee] px-4 text-[#101110]">
      <div className="w-full max-w-sm border border-[#101110]/10 bg-white p-8">
        <p className="mb-1 font-display text-lg font-black uppercase tracking-tight">
          STRIDE
        </p>
        <p className="mb-6 text-sm text-[var(--color-ink-muted)]">
          Panel de administración
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
