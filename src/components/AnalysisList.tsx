"use client";

import { motion } from "framer-motion";

type Props = {
  items: string[];
};

export default function AnalysisList({ items }: Props) {
  return (
    <div className="rounded-2xl bg-black/20 p-5 ring-1 ring-white/10">
      <div className="text-[11px] font-semibold tracking-wide text-white/55">
        ANALYSIS FINDINGS
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((msg, i) => (
          <motion.li
            key={msg}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.06 * i }}
            className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3 text-xs text-white/75 ring-1 ring-white/10"
          >
            <span className="mt-0.5 h-2 w-2 flex-none rounded-full bg-white/35 shadow-[0_0_14px_rgba(99,102,241,0.35)]" />
            <span className="leading-relaxed">{msg}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

