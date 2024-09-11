import RootProvider from "@/providers/RootProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DAPFY.COM - Digital Marketplace",
  description:
    "Buy and sell digital products securely on DAPFY.COM. Your one-stop shop for digital goods.",
  keywords:
    "digital marketplace, e-commerce, digital products, online shopping",
  openGraph: {
    title: "DAPFY.COM - Digital Marketplace",
    description:
      "Buy and sell digital products securely on DAPFY.COM. Your one-stop shop for digital goods.",
    type: "website",
    url: "https://dapfy.com",
    siteName: "DAPFY.COM",
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
      </body>
    </html>
  );
}
