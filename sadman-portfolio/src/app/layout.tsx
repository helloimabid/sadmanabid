import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sadman Abid | Cyber Security Enthusiast | Data Analytics Enthusiast | Aspiring Web Developer",
  description:
    "Personal portfolio of Sadman Abid, a passionate Web Developer from Bangladesh, building user-friendly scalable websites for the best user experience.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en" className="scroll-smooth">
      <head>
      
<script async src="https://www.googletagmanager.com/gtag/js?id=G-0ED5WWLD84"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-0ED5WWLD84');
</script>
      </head>
      <body className={`${inter.className} bg-background text-foreground dark:bg-zinc-900 dark:text-zinc-50`}>
        <ThemeProvider>
          <Loader />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-16">{children}</main>
            <Analytics />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
