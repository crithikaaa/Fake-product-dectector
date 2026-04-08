import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Fake Product Detector",
  description: "Demo prototype that simulates AI-based product authenticity scanning."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white antialiased">
        {children}
      </body>
    </html>
  );
}

