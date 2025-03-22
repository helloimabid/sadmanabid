import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sadman Abid | Web Developer",
  description: "Personal portfolio of Sadman Abid, a passionate Web Developer from Bangladesh, building user-friendly scalable websites for the best user experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground dark:bg-zinc-900 dark:text-zinc-50`}>
        <ThemeProvider>
          <Loader />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
