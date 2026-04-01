"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/kcah-ia-esur/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.ok) {
        router.push("/kcah-ia-esur");
      } else {
        setError(data.error || "Грешна парола");
      }
    } catch {
      setError("Грешка при свързване");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-[360px] space-y-6">
        <div className="text-center">
          <div className="font-display text-[clamp(28px,6vw,40px)] leading-[0.9] text-white">
            <span className="text-acid">RUSE</span> AI HACK
          </div>
          <div className="font-mono text-[10px] tracking-[0.2em] text-white/40 mt-3 uppercase">
            Admin Panel
          </div>
        </div>

        <div>
          <label className="block font-mono text-[10px] tracking-[0.14em] text-muted uppercase mb-2">
            Парола
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 px-4 text-sm bg-white/3 border border-white/12 text-white font-mono outline-none transition-colors duration-200 focus:border-acid placeholder:text-white/20"
            placeholder="Въведете парола..."
            autoFocus
          />
          {error && <div className="font-mono text-[11px] text-red-400 mt-2">{error}</div>}
        </div>

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full font-display text-lg tracking-[0.08em] bg-acid text-black border-none py-3.5 cursor-pointer transition-all duration-200 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "..." : "ВХОД"}
        </button>
      </form>
    </div>
  );
}
