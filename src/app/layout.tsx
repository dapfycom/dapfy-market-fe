import { Toaster } from "@/components/ui/toaster";
import RootProvider from "@/providers/RootProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dapfy - Digital Marketplace",
  description:
    "Buy and sell digital products securely on Dapfy. Your one-stop shop for digital goods.",
  keywords:
    "digital marketplace, e-commerce, digital products, online shopping",
  openGraph: {
    title: "Dapfy - Digital Marketplace",
    description:
      "Buy and sell digital products securely on Dapfy. Your one-stop shop for digital goods.",
    type: "website",
    url: "https://dapfy.com",
    siteName: "Dapfy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootProvider>{children}</RootProvider>
        <Toaster />
      </body>
    </html>
  );
}
