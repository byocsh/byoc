"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHubIcon } from "@/components/icons";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>BYOC - Bring Your Own Cloud</title>
        <meta name="description" content="A curated directory of open source tools you can self-host" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-V2R00N1VYS" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V2R00N1VYS');
            `,
          }}
        />
        {/* Theme initialization */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider>
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link href="/" className="font-semibold text-lg tracking-tight">
                byoc.sh
              </Link>
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className={`text-sm transition-colors ${
                    pathname === "/"
                      ? "text-gray-900 dark:text-white font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  home
                </Link>
                <Link
                  href="/vendors"
                  className={`text-sm transition-colors ${
                    pathname === "/vendors"
                      ? "text-gray-900 dark:text-white font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  vendors
                </Link>
                <Link
                  href="/tools"
                  className={`text-sm transition-colors ${
                    pathname === "/tools"
                      ? "text-gray-900 dark:text-white font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  products
                </Link>
                <Link
                  href="/about"
                  className={`text-sm transition-colors ${
                    pathname === "/about"
                      ? "text-gray-900 dark:text-white font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  about
                </Link>
                <Link
                  href="https://github.com/byocsh/byoc"
                  target="_blank"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <GitHubIcon className="w-5 h-5" />
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </nav>
          <main className="pt-16 relative z-10">
            {children}
          </main>
          <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
            <div className="max-w-4xl mx-auto px-6 py-8 text-center text-sm text-gray-500">
              <p className="mb-2">built with ♥ by <Link href="https://parseable.com" target="_blank" className="hover:text-gray-900 dark:hover:text-white">Parseable</Link></p>
              <p className="text-xs">all trademarks, logos, and brand names are the property of their respective owners. all company, product and service names used in this directory are for identification purposes only.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
