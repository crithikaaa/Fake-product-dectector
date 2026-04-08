"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

type Props = {
  score: number;
  status: "Authentic" | "Suspicious" | "Likely Fake";
};

function statusColor(status: Props["status"]) {
  if (status === "Authentic") return "from-emerald-300 to-emerald-500";
  if (status === "Suspicious") return "from-amber-300 to-amber-500";
  return "from-rose-300 to-rose-500";
}

function statusPill(status: Props["status"]) {
  if (status === "Authentic") return "bg-emerald-400/10 text-emerald-200 ring-emerald-300/20";
  if (status === "Suspicious") return "bg-amber-400/10 text-amber-200 ring-amber-300/20";
  return "bg-rose-400/10 text-rose-200 ring-rose-300/20";
}

export default function ScoreMeter({ score, status }: Props) {
  const pct = Math.max(0, Math.min(100, score));

  return (
    <div className="rounded-2xl bg-black/20 p-5 ring-1 ring-white/10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold tracking-wide text-white/55">
            AUTHENTICITY SCORE
          </div>
          <div className="mt-2 flex items-end gap-3">
            <div className="text-4xl font-semibold tracking-tight">
              {pct}
              <span className="text-base font-semibold text-white/55">/100</span>
            </div>
            <div
              className={clsx(
                "mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
                statusPill(status)
              )}
            >
              {status}
            </div>
          </div>
        </div>
        <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-xs text-white/55 ring-1 ring-white/10 sm:flex">
          AI
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={clsx("h-full rounded-full bg-gradient-to-r", statusColor(status))}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-white/55">
        <div className="rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
          <div className="font-semibold text-white/70">Rule</div>
          <div className="mt-0.5">80–100 Authentic</div>
        </div>
        <div className="rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
          <div className="font-semibold text-white/70">Rule</div>
          <div className="mt-0.5">60–79 Suspicious</div>
        </div>
        <div className="rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
          <div className="font-semibold text-white/70">Rule</div>
          <div className="mt-0.5">&lt;60 Likely Fake</div>
        </div>
      </div>
    </div>
  );
}

