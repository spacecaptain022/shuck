import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { PHProvider } from "@/components/analytics/posthog-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "SHUCK",
    template: "%s | SHUCK",
  },
  description:
    "Premium shirts and hats with a sharp southern edge. Built to wear hard and age right.",
  openGraph: {
    title: "SHUCK",
    description:
      "Premium shirts and hats with a sharp southern edge. Built to wear hard and age right.",
    siteName: "SHUCK",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${barlowCondensed.variable} antialiased`}>
        <PHProvider>
          {children}
        </PHProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
