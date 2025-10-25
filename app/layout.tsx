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
  title: "QuestionnaireAI — Auto-fill Security & Compliance Forms",
  description:
    "Save 4–6 hours per vendor review. QuestionnaireAI automatically fills security and compliance questionnaires using your company PDFs and Excel sheets. Built for fast-moving startups and compliance teams.",
  keywords: [
    "AI compliance tool",
    "security questionnaire automation",
    "vendor risk management",
    "third-party compliance",
    "SaaS automation",
  ],
  authors: [{ name: "Sangamesh Lingshetty" }],
  openGraph: {
    title: "QuestionnaireAI — AI-powered Security Questionnaire Assistant",
    description:
      "Speed up vendor reviews by 10x with QuestionnaireAI. Auto-fill compliance questionnaires from PDFs and Excel sheets instantly.",
    url: "https://questionnaire-ai.vercel.app",
    siteName: "QuestionnaireAI",
    images: [
      {
        url: "", // (optional) add your logo/preview image in /public folder
        width: 1200,
        height: 630,
        alt: "QuestionnaireAI Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
