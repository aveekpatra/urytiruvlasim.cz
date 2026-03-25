"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useMutation(api.auth.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await login({ password });
      onLogin(token);
    } catch {
      setError("Nesprávné heslo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl text-[var(--color-charcoal)] text-center mb-8">
          Administrace
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Heslo"
            className="w-full px-4 py-3 border border-[var(--color-stone)] bg-white text-[var(--color-charcoal)] text-sm focus:outline-none focus:border-[var(--color-gold)]"
          />
          {error && <p className="text-red-600 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--color-charcoal)] text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-gold)] transition-colors disabled:opacity-50"
          >
            {loading ? "Přihlašování..." : "Přihlásit se"}
          </button>
        </form>
      </div>
    </div>
  );
}
