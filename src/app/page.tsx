"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 scanlines" />

      <motion.div
        aria-hidden="true"
        className="absolute left-[-140px] top-[-140px] h-[420px] w-[420px] rounded-full bg-indigo-500/30 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 18, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-[-180px] top-[10%] h-[520px] w-[520px] rounded-full bg-emerald-400/20 blur-3xl"
        animate={{ x: [0, -28, 0], y: [0, 22, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-[-220px] left-[20%] h-[620px] w-[620px] rounded-full bg-fuchsia-400/15 blur-3xl"
        animate={{ x: [0, 26, 0], y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <Background />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-16">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/15 shadow-[0_0_30px_rgba(99,102,241,0.18)]" />
            <div className="text-sm font-medium tracking-wide text-white/80">
              Demo Prototype
            </div>
          </div>
        </header>

        <section className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.h1
              className="text-balance text-4xl font-semibold leading-tight sm:text-5xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              AI Fake Product Detector
            </motion.h1>
            <motion.p
              className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              Upload a product photo and watch a convincing, sci‑fi scanning
              sequence. This demo simulates an AI authenticity model and
              generates a realistic report — perfect for hackathons and class
              demos.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14 }}
            >
              <Link
                href="/scan"
                className="group inline-flex items-center justify-center rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-neon transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300/60"
              >
                Scan a Product
                <span className="ml-2 inline-block transition group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="glass relative overflow-hidden rounded-2xl p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06 }}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-white/85">
                Live Model Console (simulated)
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200 ring-1 ring-emerald-400/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.7)]" />
                Ready
              </div>
            </div>

            <div className="mt-4 space-y-3 text-xs text-white/65">
              <div className="rounded-xl bg-black/20 px-4 py-3 ring-1 ring-white/10">
                <div className="flex items-center justify-between">
                  <span>Authenticity model</span>
                  <span className="text-white/45">v0.9 (demo)</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full w-2/3 rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-300"
                    animate={{ x: ["-20%", "20%", "-20%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-black/20 px-4 py-3 ring-1 ring-white/10">
                  <div className="text-white/55">Signals</div>
                  <div className="mt-1 text-sm font-semibold text-white/85">
                    Texture • Barcode • Logo
                  </div>
                </div>
                <div className="rounded-xl bg-black/20 px-4 py-3 ring-1 ring-white/10">
                  <div className="text-white/55">Latency</div>
                  <div className="mt-1 text-sm font-semibold text-white/85">
                    ~3.4s scan time
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5" />
              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-2xl" />
            </div>
          </motion.div>
        </section>

        <div className="mt-auto pt-16" />
      </div>
    </main>
  );
}

