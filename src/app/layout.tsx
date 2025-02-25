// Main Layout Stylesheets
import "@/globals.css";
// Main Layout Requirements
import { Link, ViewTransitions } from "next-view-transitions";
// import Link from "next/link";
import { Light, Logo, Nav, ThemeHandler } from "@/components";
// Main Layout Main Function
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Returns Main Layout
  return (
    <ViewTransitions>
      <html lang="es" className="font-inter dark">
        <body className="flex flex-col h-dvh">
          <ThemeHandler />
          <header className="grayScale:grayscale">
            <Nav />
          </header>
          {/* Page Container */}
          <main className="bg-gray-50 flex flex-1 dark:bg-gray-950 highContrast:bg-white lowContrast:bg-gray-100">
            <Light direction="tl" />
            {children}
            <Light direction="br" />
          </main>
          <footer className="bg-gray-50 text-gray-800 text-center py-8 dark:bg-gray-950 dark:text-gray-400 highContrast:bg-white highContrast:text-black lowContrast:bg-gray-100 lowContrast:text-gray-500 grayScale:grayscale sm:flex sm:place-content-between sm:items-center sm:px-8">
            {/* Logos Container */}
            <div className="flex gap-4 justify-center max-w-fit mx-auto mb-5 sm:order-3 sm:m-0">
              {/* Github Logo */}
              <Logo
                href="https://github.com/sh4dow18/mateory"
                icon="github"
                width={24}
                height={24}
              />
              {/* MIT License Logo */}
              <Logo
                href="https://opensource.org/license/mit"
                icon="mit"
                width={24}
                height={24}
              />
            </div>
            {/* Copyright Text */}
            <p className="text-xs sm:order-2 md:text-sm">
              ©{" "}
              <Link
                href="https://github.com/sh4dow18"
                target="_blank"
                className="hover:text-mateoryPurple dark:text-gray-300 dark:hover:text-white"
              >
                Ramsés Solano
              </Link>
              . Todos los Derechos Reservados.
            </p>
            {/* Last Update */}
            <p className="text-xs sm:order-1 md:text-sm">
              19 de Febrero del 2025
            </p>
          </footer>
        </body>
      </html>
    </ViewTransitions>
  );
}
