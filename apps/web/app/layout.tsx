import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeuralCopy — AI-Powered Landing Page Copy in Seconds",
  description:
    "Turn your product idea into high-converting landing page copy instantly. Powered by GPT-4o. No writer needed.",
  keywords: ["AI copywriting", "landing page", "SaaS", "GPT-4", "marketing copy"],
  openGraph: {
    title: "NeuralCopy — AI-Powered Landing Page Copy",
    description: "Generate stunning landing page copy in seconds with AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
