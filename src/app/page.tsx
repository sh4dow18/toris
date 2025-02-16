// Home Page Requirements
import { Metadata } from "next";
import Image from "next/image";
import {
  AcademicCapIcon,
  ArrowRightIcon,
  CalculatorIcon,
  DocumentCheckIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/16/solid";
import { Benefit, Logo, Section } from "@/components";
import { Link } from "next-view-transitions";
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
    // Main Container
    <div className="block w-full text-gray-400 z-10 mt-5">
      {/* H1 Hidden, because it is not used, but it is needed for SEO */}
      <h1 className="hidden">Mateory</h1>
      {/* Mateory Present Section */}
      <div className="flex flex-col justify-center items-center gap-8 z-10 mx-auto max-w-5xl mt-5">
        {/* Mateory logo */}
        <Image
          src="/logo.svg"
          alt="Mateory Logo"
          width={250}
          height={250}
          priority
          className="h-auto min-[375px]:w-[20rem] min-[560px]:w-[30rem]"
        />
        {/* Mateory Description */}
        <p className="text-center leading-7 mx-10 lg:text-lg">
          Mateory es una herramienta web que ayuda a resolver problemas
          sencillos de teorías matemáticas, como las Teorías de Inventarios y
          las Teorías de Colas, con unos pocos clics, tomando modelos
          matemáticos preexistentes, como el EOQ con modelo de déficit para
          inventarios o el M/M/1:FIFO/∞/∞ para colas
        </p>
        {/* CTA Section */}
        <div className="flex flex-col gap-6 sm:flex-row">
          {/* How it works Link */}
          <Link
            href="/how-it-works"
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
      <Section
        title="La forma más rápida de resolver teorías matemáticas"
        description="Creado por un programador con diplomado en aplicaciones informáticas y basado en fórmulas proporcionadas por un profesor experto en matemáticas, Mateory hace que la investigación deoperaciones sea más accesible y eficiente"
        contentClassName="flex flex-wrap gap-10 md:justify-center md:mx-auto md:max-w-7xl lg:gap-16"
        preTitle="Calcula más Rápido"
        addMargin
      >
        {/* Fast and accurate results Benefit */}
        <Benefit
          icon={<DocumentCheckIcon />}
          title="Resultados rápidos y precisos"
          description="Se usan modelos matemáticos preexistentes como EOQ con déficit para inventarios y M/M/1:FIFO/∞/∞ para colas."
        />
        {/* An intuitive and accessible interface Benefit */}
        <Benefit
          icon={<QuestionMarkCircleIcon />}
          title="Una Interfaz intuitiva y accesible"
          description="Diseñado con Next.js, TailwindCSS y TypeScript, Mateory es de código abierto y completamente gratuito."
        />
        {/* Designed for students and professionals Benefit */}
        <Benefit
          icon={<AcademicCapIcon />}
          title="Pensado para estudiantes y profesionales"
          description="No es un sistema de inventarios, sino una herramienta para resolver teorías matemáticas sencillas"
        />
        {/* Optimize calculations in seconds Benefit */}
        <Benefit
          icon={<CalculatorIcon />}
          title="Optimiza cálculos en segundos"
          description="No se necesita perder tiempo con fórmulas complejas: ingresa los datos y obtén resultados al instante."
        />
      </Section>
      <Section
        title="Colaboradores"
        description="Mateory es posible gracias a quienes han contribuido con su conocimiento para crear una herramienta precisa, accesible y eficiente."
        contentClassName="flex flex-wrap gap-10 min-[685px]:justify-center min-[685px]:mx-auto min-[685px]:max-w-4xl lg:gap-16"
        addMargin
      >
        {/* Ramsés Solano Container */}
        <div className="flex flex-col gap-5 min-[685px]:flex-row">
          {/* Image container to use to reshape image */}
          <div className="min-[685px]:w-[32rem] min-[685px]:h-56 min-[685px]:overflow-hidden min-[685px]:relative">
            {/* Ramsés Solano Image */}
            <Image
              src="/profiles/ramses-solano.jpeg"
              alt="Ramsés Solano"
              width={300}
              height={100}
              priority
              className="w-full rounded-lg min-[685px]:w-[150%] min-[685px]:h-full min-[685px]:object-cover min-[685px]:object-center"
            />
          </div>
          {/* Ramsés Solano Information Container */}
          <div className="flex flex-col gap-5 min-[685px]:max-w-xl">
            {/* Ramsés Solano Main Information Container */}
            <div className="flex flex-col gap-5">
              {/* Ramsés Solano Primary Information Container */}
              <div className="flex flex-col">
                <span className="font-semibold text-gray-300 text-lg">
                  Ramsés Solano
                </span>
                <span>Creador de Mateory</span>
              </div>
              {/* Ramsés Solano Profile Description */}
              <p className="leading-8">
                Profesional en Programación de Aplicaciones Informáticas
                apasionado por resolver problemas y mejorar habilidades,
                aportando liderazgo, innovación y compromiso en cada proyecto
              </p>
            </div>
            {/* Ramsés Solano Social Media Links */}
            <div className="flex gap-5">
              {/* Github Logo */}
              <Logo href="https://github.com/sh4dow18/mateory" icon="github" />
              {/* Linkedin Logo */}
              <Logo
                href="https://www.linkedin.com/in/ramsés-solano-arias-981029227/"
                icon="linkedin"
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
