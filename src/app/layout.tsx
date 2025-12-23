import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BYOC - Bring Your Own Cloud",
  description: "Open source tools for the modern developer",
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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="font-bold text-xl no-underline hover:opacity-100">
              byoc.sh
            </Link>
            <div className="flex gap-6">
              <Link href="/" className="text-sm hover:opacity-70 transition-opacity">
                home
              </Link>
              <Link href="/tools" className="text-sm hover:opacity-70 transition-opacity">
                tools
              </Link>
            </div>
          </div>
        </nav>
        <main className="pt-20">
          {children}
        </main>
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
          <div className="max-w-3xl mx-auto px-6 py-8 text-center text-sm text-gray-500">
            © 2025 <Link href="/">byoc.sh</Link> – open source, your cloud, your rules.
          </div>
        </footer>
      </body>
    </html>
  );
}
