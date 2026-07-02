"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Drag-to-reveal slider that wipes between the "before" (a plain photo) and the
 * "after" (the same person wearing a new outfit) — the core promise of Drapify,
 * shown instead of described.
 */
export default function BeforeAfter() {
  const [pos, setPos] = useState(52);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(98, Math.max(2, pct)));
  }, []);

  return (
    <div
      ref={frameRef}
      className="relative w-full aspect-[4/5] rounded-[28px] overflow-hidden select-none touch-none cursor-ew-resize"
      style={{ border: "1px solid var(--border)", backgroundColor: "var(--surface)" }}
      onMouseDown={(e) => {
        dragging.current = true;
        move(e.clientX);
      }}
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => move(e.touches[0].clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      {/* AFTER — wearing the outfit */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=80&auto=format&fit=crop"
          alt="Wearing the outfit"
          className="w-full h-full object-cover"
        />
        <span
          className="absolute top-4 right-4 text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{ backgroundColor: "rgba(11,11,17,0.55)", color: "#fff", backdropFilter: "blur(6px)" }}
        >
          On you
        </span>
      </div>

      {/* BEFORE — the original photo, clipped to the handle */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&q=80&auto=format&fit=crop"
          alt="Your photo"
          className="w-full h-full object-cover"
        />
        <span
          className="absolute top-4 left-4 text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{ backgroundColor: "rgba(11,11,17,0.55)", color: "#fff", backdropFilter: "blur(6px)" }}
        >
          Your photo
        </span>
      </div>

      {/* Handle */}
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 w-0.5" style={{ backgroundColor: "#fff" }} />
        <div
          className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full grid place-items-center shadow-lg"
          style={{ backgroundColor: "#fff", color: "var(--accent-hover)" }}
        >
          <span className="text-lg leading-none font-bold">⟷</span>
        </div>
      </div>
    </div>
  );
}
