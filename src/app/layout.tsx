// Main Layout Stylesheets
import "@/stylesheets/globals.css";
// Main Layout Requirements
import Link from "next/link";
// Main Layout Main Function
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Returns Main Layout
  return (
    <html lang="es">
      <body>
        <header>
          {/* Project Name */}
          <Link href="/">
            <p>Mateory</p>
          </Link>
          <nav>
            <Link href="/inventory">Inventarios</Link>
            <Link href="/queue">Colas</Link>
          </nav>
        </header>
        {/* Page Container */}
        <main>{children}</main>
        <footer>
          {/* Credits */}
          <div>
            {/* Braitec Copyright */}
            <p>
              Copyright ©{" "}
              <Link href="https://digital-me.vercel.app">Ramsés Solano</Link>
              {" ("}
              <Link href="https://github.com/sh4dow18">sh4dow18</Link>
              {") "}
              <Link href="https://opensource.org/license/mit">MIT License</Link>
            </p>
            {/* Page built by */}
            <p>
              {/* Last Update */}
              Última Actualización realizada el 16 de Octubre del 2024
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
