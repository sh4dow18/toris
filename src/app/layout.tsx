// Main Layout Stylesheets
import "@/stylesheets/globals.css";
// Main Layout Requirements
import Link from "next/link";
import { Light, Nav } from "@/components";
import Image from "next/image";
// Main Layout Main Function
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Returns Main Layout
  return (
    <html lang="es" className="font-inter">
      <body className="flex flex-col h-dvh">
        <header>
          <Nav />
        </header>
        {/* Page Container */}
        <main className="bg-gray-950 flex flex-1">
          <Light direction="tl" />
          {children}
          <Light direction="br" />
        </main>
        <footer className="bg-gray-950 text-gray-400 text-center py-8 sm:flex sm:place-content-between sm:items-center sm:px-8">
          {/* Logos Container */}
          <div className="flex justify-center max-w-fit mx-auto mb-5 sm:order-3 sm:m-0">
            {/* Github Logo */}
            <Link href="https://github.com/sh4dow18/mateory" target="_blank">
              <Image
                src="/logos/github.svg"
                alt="Github Logo"
                width={24}
                height={24}
                className="mx-4"
              />
            </Link>
            {/* MIT License Logo */}
            <Link href="https://opensource.org/license/mit" target="_blank">
              <Image
                src="/logos/mit.svg"
                alt="MIT License Logo"
                width={24}
                height={24}
                className="mx-4"
              />
            </Link>
          </div>
          {/* Copyright Text */}
          <p className="text-xs sm:order-2 md:text-sm">
            ©{" "}
            <Link
              href="https://github.com/sh4dow18"
              target="_blank"
              className="text-gray-300"
            >
              Ramsés Solano
            </Link>
            . Todos los Derechos Reservados.
          </p>
          {/* Last Update */}
          <p className="text-xs sm:order-1 md:text-sm">24 de Enero del 2025</p>
        </footer>
      </body>
    </html>
  );
}
