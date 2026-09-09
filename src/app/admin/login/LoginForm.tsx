"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm text-[var(--color-ink-muted)]">
          Contraseña de administrador
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="border border-[#101110]/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#101110]"
        />
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center bg-[#101110] px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-150 active:scale-[0.97] disabled:opacity-60"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
