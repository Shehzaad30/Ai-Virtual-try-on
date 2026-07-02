"use client";

import { useState } from "react";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    if (res.ok) {
      setStatus("success");
      setMessage("You're on the list. We'll be in touch.");
      setEmail("");
    } else {
      setStatus("error");
      setMessage(data.error || "Something went wrong.");
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 text-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      <span
        className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full mb-6"
        style={{
          backgroundColor: "rgba(210,187,255,0.1)",
          border: "1px solid rgba(210,187,255,0.2)",
          color: "var(--primary)",
        }}
      >
        For Shop Owners
      </span>

      <h1
        className="text-4xl sm:text-5xl font-bold tracking-tight mb-5"
        style={{ color: "var(--on-surface)" }}
      >
        Bring AI try-on<br />to your store.
      </h1>

      <p className="text-lg max-w-md mb-10" style={{ color: "var(--on-surface-variant)" }}>
        Let customers try before they buy — right on your product pages. Fewer returns, more confidence.
        We&apos;re onboarding shops now.
      </p>

      {status === "success" ? (
        <div
          className="flex items-center gap-3 px-6 py-4 rounded-2xl"
          style={{
            backgroundColor: "rgba(210,187,255,0.08)",
            border: "1px solid rgba(210,187,255,0.2)",
          }}
        >
          <span className="material-symbols-outlined" style={{ color: "var(--primary)" }}>
            check_circle
          </span>
          <p style={{ color: "var(--on-surface)" }}>{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-sm">
          <input
            type="email"
            placeholder="you@yourshop.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-full text-sm outline-none"
            style={{
              backgroundColor: "var(--surface-container)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--on-surface)",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary text-sm font-bold whitespace-nowrap disabled:opacity-50"
          >
            {status === "loading" ? "Joining…" : "Join waitlist"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-3 text-sm" style={{ color: "#ffb4ab" }}>
          {message}
        </p>
      )}
    </div>
  );
}
