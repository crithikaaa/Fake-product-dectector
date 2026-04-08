"use client";

import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

type Props = {
  onFileSelected: (file: File) => void | Promise<void>;
};

export default function UploadBox({ onFileSelected }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      void onFileSelected(file);
    },
    [onFileSelected]
  );

  const accept = useMemo(() => ({ "image/*": [] as string[] }), []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
    maxFiles: 1
  });

  return (
    <div className="glass overflow-hidden rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-white/85">
            Upload product image
          </div>
          <div className="mt-1 text-xs text-white/55">
            PNG/JPG/WebP — drag & drop or click to browse
          </div>
        </div>
        <div className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-white/60 ring-1 ring-white/10">
          Frontend-only
        </div>
      </div>

      <div
        {...getRootProps()}
        className={[
          "mt-5 relative cursor-pointer rounded-2xl border border-white/15 bg-white/5 p-7 transition",
          "focus:outline-none focus:ring-2 focus:ring-indigo-300/60",
          isDragActive ? "bg-indigo-500/10 border-indigo-300/40" : "hover:bg-white/8"
        ].join(" ")}
      >
        <input {...getInputProps()} />

        {/* camera-style scanning frame */}
        <div className="pointer-events-none absolute inset-4 rounded-xl ring-1 ring-white/12" />
        <div className="pointer-events-none absolute inset-4">
          <div className="absolute left-0 top-0 h-4 w-4 rounded-tl-xl border-l border-t border-white/35" />
          <div className="absolute right-0 top-0 h-4 w-4 rounded-tr-xl border-r border-t border-white/35" />
          <div className="absolute bottom-0 left-0 h-4 w-4 rounded-bl-xl border-b border-l border-white/35" />
          <div className="absolute bottom-0 right-0 h-4 w-4 rounded-br-xl border-b border-r border-white/35" />
        </div>

        <div className="relative flex flex-col items-center justify-center gap-3 py-10 text-center">
          <motion.div
            className="h-12 w-12 rounded-2xl bg-white/10 ring-1 ring-white/15 shadow-[0_0_30px_rgba(99,102,241,0.14)]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="text-sm font-semibold">
            {isDragActive ? "Drop to begin scanning" : "Drop image here"}
          </div>
          <div className="max-w-md text-xs leading-relaxed text-white/60">
            We’ll run a realistic scanning animation and generate an authenticity
            score with analysis findings — all simulated on the client.
          </div>
          <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 text-[11px] text-white/60 ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-300 shadow-[0_0_18px_rgba(99,102,241,0.7)]" />
            Ready to scan
          </div>
        </div>
      </div>
    </div>
  );
}

