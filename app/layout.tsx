import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

const title = "Nguyen Huynh Minh Tri — Fullstack Website Developer";
const description =
  "Portfolio of Nguyen Huynh Minh Tri, a fullstack website developer in HCMC, Vietnam, building thoughtful interfaces and reliable web systems.";
const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Nguyen Huynh Minh Tri, Fullstack Website Developer based in HCMC, Vietnam",
};

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Nguyen Huynh Minh Tri Portfolio",
  authors: [{ name: "Nguyen Huynh Minh Tri" }],
  creator: "Nguyen Huynh Minh Tri",
  publisher: "Nguyen Huynh Minh Tri",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: ["/logo.png"],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Nguyen Huynh Minh Tri Portfolio",
    images: [ogImage],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
