// Main Layout Stylesheets
import "@/stylesheets/globals.css";
// Main Layout Requirements
import Link from "next/link";
import { Nav } from "@/components";
// Main Layout Main Function
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Returns Main Layout
  return (
    <html lang="es" className="font-inter">
      <body>
        <header>
          <Nav />
        </header>
        {/* Page Container */}
        <main>{children}</main>
        <footer>
          {/* Credits */}
          <div>
            {/* Page built by */}
            <p>
              Copyright ©{" "}
              <Link href="https://digital-me.vercel.app">Ramsés Solano</Link>
              {" ("}
              <Link href="https://github.com/sh4dow18">sh4dow18</Link>
              {") "}
              <Link href="https://opensource.org/license/mit">MIT License</Link>
            </p>
            <p>
              {/* Last Update */}
              Última Actualización realizada el 19 de Octubre del 2024
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
