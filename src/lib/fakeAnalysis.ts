export type FakeStatus = "Authentic" | "Suspicious" | "Likely Fake";

export type FakeAnalysisResult = {
  product_name: string;
  authenticity_score: number;
  status: FakeStatus;
  analysis: string[];
};

const ANALYSIS_MESSAGES = [
  "Logo alignment mismatch detected",
  "Color tone differs from official packaging",
  "Barcode pattern partially matches",
  "Packaging font slightly altered",
  "Hologram security seal missing",
  "Texture analysis inconsistent with manufacturer reference"
] as const;

function pickUnique<T>(arr: readonly T[], count: number) {
  const pool = [...arr];
  const out: T[] = [];
  while (out.length < count && pool.length > 0) {
    const i = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(i, 1)[0]!);
  }
  return out;
}

function statusFromScore(score: number): FakeStatus {
  if (score >= 80) return "Authentic";
  if (score >= 60) return "Suspicious";
  return "Likely Fake";
}

export function generateFakeAnalysis(): FakeAnalysisResult {
  const authenticity_score = Math.floor(40 + Math.random() * (95 - 40 + 1));
  const status = statusFromScore(authenticity_score);
  const analysisCount = Math.random() < 0.5 ? 3 : 4;

  return {
    product_name: "Detected Consumer Product",
    authenticity_score,
    status,
    analysis: pickUnique(ANALYSIS_MESSAGES, analysisCount)
  };
}

