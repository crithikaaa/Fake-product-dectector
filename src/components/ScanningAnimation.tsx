"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Props = {
  imageDataUrl: string;
  messages: string[];
  durationMs?: number;
  onDone: () => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ScanningAnimation({
  imageDataUrl,
  messages,
  durationMs = 3600,
  onDone
}: Props) {
  const [t, setT] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = clamp((now - start) / durationMs, 0, 1);
      setT(p);
      if (p >= 1) return;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs]);

  useEffect(() => {
    const timer = setTimeout(onDone, durationMs + 250);
    return () => clearTimeout(timer);
  }, [durationMs, onDone]);

  const idx = useMemo(() => {
    const i = Math.floor(t * messages.length);
    return clamp(i, 0, Math.max(0, messages.length - 1));
  }, [messages.length, t]);

  const percent = Math.round(t * 100);

  return (
    <div className="glass overflow-hidden rounded-2xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-white/85">
            AI authenticity scan
          </div>
          <div className="mt-1 text-xs text-white/55">
            This is a simulated model run for demo purposes.
          </div>
        </div>
        <div className="rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] text-indigo-200 ring-1 ring-indigo-300/20">
          Scanning • {percent}%
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-black/20">
          {/* scanning frame */}
          <div className="pointer-events-none absolute inset-4 rounded-xl ring-1 ring-white/12" />
          <div className="pointer-events-none absolute inset-4">
            <div className="absolute left-0 top-0 h-4 w-4 rounded-tl-xl border-l border-t border-white/35" />
            <div className="absolute right-0 top-0 h-4 w-4 rounded-tr-xl border-r border-t border-white/35" />
            <div className="absolute bottom-0 left-0 h-4 w-4 rounded-bl-xl border-b border-l border-white/35" />
            <div className="absolute bottom-0 right-0 h-4 w-4 rounded-br-xl border-b border-r border-white/35" />
          </div>

          {/* uploaded image */}
          <div className="relative aspect-[16/10]">
            <Image
              src={imageDataUrl}
              alt="Uploaded product"
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>

          {/* sweeping scan line */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 via-indigo-300/10 to-indigo-500/0" />
            <div className="absolute inset-0">
              <div className="absolute left-0 top-0 h-full w-full">
                <div className="absolute inset-x-0 h-24 -translate-y-24 bg-gradient-to-b from-transparent via-indigo-300/35 to-transparent blur-[1px] animate-sweep" />
              </div>
            </div>
          </motion.div>

          {/* radar */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="relative h-52 w-52">
              <div className="absolute inset-0 rounded-full bg-emerald-400/5 ring-1 ring-emerald-300/15" />
              <div className="absolute inset-8 rounded-full ring-1 ring-emerald-300/10" />
              <div className="absolute inset-16 rounded-full ring-1 ring-emerald-300/10" />
              <div className="absolute inset-0 animate-radar rounded-full bg-[conic-gradient(from_0deg,rgba(16,185,129,0.0),rgba(16,185,129,0.18),rgba(16,185,129,0.0))] blur-[0.4px]" />
              <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-200 shadow-[0_0_16px_rgba(16,185,129,0.8)]" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-black/20 p-5 ring-1 ring-white/10">
            <div className="text-[11px] font-semibold tracking-wide text-white/55">
              MODEL STATUS
            </div>
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-2 text-sm font-semibold text-white/85"
            >
              {messages[idx] ?? "Initializing scan…"}
            </motion.div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-300"
                style={{ width: `${percent}%` }}
              />
            </div>

            <div className="mt-3 grid gap-3 text-xs text-white/60">
              <div className="flex items-center justify-between">
                <span>Feature extraction</span>
                <span className="text-white/45">{Math.round(280 + t * 420)} ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Model inference</span>
                <span className="text-white/45">{Math.round(620 + t * 980)} ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Report synthesis</span>
                <span className="text-white/45">{Math.round(140 + t * 260)} ms</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <div className="text-[11px] font-semibold tracking-wide text-white/55">
              SIGNALS (SIMULATED)
            </div>
            <div className="mt-3 space-y-2 text-xs text-white/65">
              {[
                { k: "Packaging texture", v: 55 + Math.round(t * 40) },
                { k: "Logo geometry", v: 40 + Math.round(t * 55) },
                { k: "Barcode consistency", v: 35 + Math.round(t * 60) }
              ].map((row) => (
                <div key={row.k}>
                  <div className="flex items-center justify-between">
                    <span>{row.k}</span>
                    <span className="text-white/45">{row.v}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-white/30"
                      style={{ width: `${row.v}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

