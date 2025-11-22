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
  metadataBase: new URL("https://getquest.cloud"),
  title: "GetQuest — Auto-fill Security & Compliance Forms",
  description:
    "GetQuest auto-fills ISO 27001 & SOC 2 compliance questionnaires using your policies, PDFs and Excel files. Save 4–6 hours per vendor review.",
  keywords: [
    "GetQuest",
    "AI compliance tool",
    "security questionnaire automation",
    "ISO 27001 AI",
    "SOC 2 questionnaire automation",
    "vendor risk management",
    "third-party compliance",
    "GRC automation",
    "SaaS security automation",
  ],
  icons: {
    icon: "/favicon-v2.ico", // final icon
  },
  openGraph: {
    title: "GetQuest — AI-powered Security Questionnaire Assistant",
    description:
      "Speed up vendor reviews by 10x with GetQuest. Auto-fill compliance questionnaires from PDFs and Excel sheets instantly.",
    url: "https://getquest.cloud",
    siteName: "GetQuest",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "GetQuest Logo — AI Security Automation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Canonical URL for SEO */}
        <link rel="canonical" href="https://getquest.cloud" />

        {/* Logo Schema for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GetQuest",
              url: "https://getquest.cloud",
              logo: "https://getquest.cloud/logo.png",
              sameAs: [
                "https://twitter.com/YOUR_HANDLE",
                "https://www.linkedin.com/in/YOUR_LINK",
              ],
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
