"use client";

import { useState } from "react";
import { toast } from "sonner";

export function SignupCard() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "homepage" }),
      });

      if (!res.ok) throw new Error();
      setEmail("");
      toast.success("You're in. We'll hit you when something drops.");
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-t-2 border-foreground pt-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-2">
              Stay in the loop
            </p>
            <h2 className="font-display text-[clamp(1.8rem,5vw,3rem)] font-bold uppercase leading-tight tracking-tight">
              Get early access to drops.
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex gap-0 border border-border max-w-sm w-full md:w-auto"
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 text-sm bg-background outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 bg-foreground text-background text-xs font-semibold uppercase tracking-[0.08em] hover:opacity-80 transition-opacity shrink-0 disabled:opacity-50"
            >
              {loading ? "..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
