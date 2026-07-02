"use client";

import { useState } from "react";

const inputStyle = {
  backgroundColor: "var(--surface-container)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "var(--on-surface)",
} as const;

export default function WaitlistPage() {
  const [form, setForm] = useState({ name: "", contact: "", shopType: "", city: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      setStatus("success");
      setMessage("You're on the list. We'll reach out to set up your store.");
      setForm({ name: "", contact: "", shopType: "", city: "" });
    } else {
      setStatus("error");
      setMessage(data.error || "Something went wrong.");
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 py-16 text-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      <span
        className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full mb-6"
        style={{ border: "1px solid var(--outline-variant)", color: "var(--primary)" }}
      >
        For Shop Owners
      </span>

      <h1
        className="text-4xl sm:text-5xl font-bold tracking-tight mb-5"
        style={{ color: "var(--on-surface)" }}
      >
        Bring AI try-on
        <br />
        to your store.
      </h1>

      <p className="text-lg max-w-md mb-10" style={{ color: "var(--on-surface-variant)" }}>
        Let customers try before they buy — fewer returns, more confidence. We&apos;re onboarding
        shops now. Leave your details and we&apos;ll set you up.
      </p>

      {status === "success" ? (
        <div
          className="flex items-center gap-3 px-6 py-4 rounded-2xl"
          style={{ backgroundColor: "var(--surface-container)", border: "1px solid var(--outline-variant)" }}
        >
          <span className="material-symbols-outlined" style={{ color: "var(--primary)" }}>
            check_circle
          </span>
          <p style={{ color: "var(--on-surface)" }}>{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm text-left">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--on-surface-variant)" }}>
              Your name *
            </label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
              className="mt-1 w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--on-surface-variant)" }}>
              Phone or email *
            </label>
            <input
              type="text"
              placeholder="Phone number or email"
              value={form.contact}
              onChange={(e) => update("contact", e.target.value)}
              required
              className="mt-1 w-full px-4 py-3 rounded-xl text-sm outline-none"
              style={inputStyle}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--on-surface-variant)" }}>
                Shop type
              </label>
              <input
                type="text"
                placeholder="e.g. Menswear"
                value={form.shopType}
                onChange={(e) => update("shopType", e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={inputStyle}
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--on-surface-variant)" }}>
                City
              </label>
              <input
                type="text"
                placeholder="e.g. Vadodara"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={inputStyle}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary text-sm font-bold mt-2 disabled:opacity-50"
          >
            {status === "loading" ? "Joining…" : "Join waitlist"}
          </button>

          <p className="text-xs text-center" style={{ color: "var(--on-surface-variant)", opacity: 0.6 }}>
            * Required. Shop type and city are optional.
          </p>
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
