import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const _playfair = Playfair_Display({ subsets: ["latin"] });
const _inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sadman Abid | Portfolio",
  description:
    "Cybersecurity Enthusiast, Malware Analyst & Developer from Dhaka, Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
