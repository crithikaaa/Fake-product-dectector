"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import UploadBox from "@/components/UploadBox";
import ScanningAnimation from "@/components/ScanningAnimation";

type Phase = "idle" | "scanning";

export default function ScanPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  const onImageSelected = useCallback(async (file: File) => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

    setImageDataUrl(dataUrl);
    setPhase("scanning");
  }, []);

  const scanningMessages = useMemo(
    () => [
      "Analyzing packaging texture…",
      "Detecting logo alignment…",
      "Scanning barcode patterns…",
      "Running authenticity model…"
    ],
    []
  );

  return (
    <main className="relative min-h-screen px-6 py-14">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute inset-0 scanlines" />

      <div className="relative mx-auto max-w-4xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Scan a Product
            </h1>
            <p className="mt-2 text-sm text-white/65">
              Drag & drop a product photo. We’ll simulate a 3–4 second AI scan
              and generate an authenticity report.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-xl bg-white/5 px-4 py-2 text-xs font-semibold text-white/75 ring-1 ring-white/10 transition hover:bg-white/10"
          >
            Back to Home
          </button>
        </div>

        <div className="mt-10">
          {phase === "idle" ? (
            <UploadBox onFileSelected={onImageSelected} />
          ) : (
            <ScanningAnimation
              imageDataUrl={imageDataUrl!}
              messages={scanningMessages}
              durationMs={3600}
              onDone={() => {
                const key = "aifpd:lastScan";
                localStorage.setItem(key, imageDataUrl!);
                router.push("/result");
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
}

