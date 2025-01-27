// Home Page Requirements
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
// Home Page Metadata
export const metadata: Metadata = {
  title: "Mateory",
  description:
    "Soluciona Problemas Fáciles de Teorías de Matemáticas con unos Cuantos Clics",
};
// Home Page Main Function
export default function Home() {
  // Returns Home Page
  return (
    // Main Container Background
    <div className="bg-gray-950 h-full flex">
      {/* Top Light Diffusion Container */}
      <div
        className="absolute inset-x-0 top-12 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        {/* Polygon container for light */}
        <div
          className="relative aspect-[1155/678] w-[36.125rem] -translate-x-3/4 bg-gradient-to-tr from-[#f8a13c] to-mateoryPurple opacity-50 min-[500px]:-translate-x-1/2 md:-translate-x-1/4"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      {/* Page Content */}
      <div className="flex flex-col justify-center items-center text-gray-400 gap-8 z-10 mx-auto max-w-5xl mt-5">
        {/* Mateory logo */}
        <Image
          src="/logo.svg"
          alt="Mateory Logo"
          width={250}
          height={250}
          className="md:w-[30rem]"
        />
        {/* Mateory Description */}
        <p className="text-center leading-7 mx-10 lg:text-lg">
          <strong>Mateory</strong> es una herramienta web que ayuda a resolver
          problemas sencillos de <strong>teorías matemáticas</strong>, como las{" "}
          <strong>Teorías de Inventarios</strong> y las{" "}
          <strong>Teorías de Colas</strong>, con unos pocos clics, tomando
          modelos matemáticos preexistentes, como el{" "}
          <strong>EOQ con modelo de déficit</strong> para inventarios o el{" "}
          <strong>M/M/1:FIFO/∞/∞</strong> para colas
        </p>
        {/* CTA Section */}
        <div className="flex flex-col gap-6 sm:flex-row">
          {/* How it works Link */}
          <Link
            href="/about"
            className="bg-mateoryPurple text-white px-4 py-2 font-medium rounded-md text-center hover:bg-mateoryPurpleLight"
          >
            ¿Cómo Funciona?
          </Link>
          {/* View Docs Link Container */}
          <div className="flex gap-1 sm:items-center">
            <Link
              href="https://github.com/sh4dow18/mateory"
              target="_blank"
              className="font-bold"
            >
              Ver Documentación
            </Link>
            <ArrowRightIcon className="w-4" />
          </div>
        </div>
      </div>
      {/* Button Light Diffusion Container */}
      <div
        className="absolute inset-x-0 bottom-28 transform-gpu overflow-hidden blur-3xl min-[500px]:left-auto"
        aria-hidden="true"
      >
        {/* Polygon container for light */}
        <div
          className="relative aspect-[1155/678] w-[36.125rem] bg-gradient-to-tr from-[#f8a13c] to-mateoryPurple opacity-50 translate-x-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
