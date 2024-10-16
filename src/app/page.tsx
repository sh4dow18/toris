// Home Page Requirements
import { ModelCard, Page } from "@/components";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
// Home Page Constants
const TITLE = "Mateory";
const DESCRIPTION =
  "Soluciona Problemas Fáciles de Teorías de Matemáticas con unos Cuantos Clics";
// Home Page Metadata
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};
// Home Page Main Function
export default function Home() {
  // Returns Home Page
  return (
    <Page title={TITLE} description={DESCRIPTION}>
      <section className="models-cards-list-container">
        {/* Available Models */}
        <h2>Teorías Disponibles</h2>
        {/* Model Cards Lists */}
        <div>
          <Link
            className="model-card-container"
            href="/inventory"
          >
            {/* Main Image */}
            <Image
              src="/inventory.png"
              alt="Inventarios"
              width={247}
              height={140}
              priority
            />
            {/* Main Name */}
            <p>Teoría de Inventarios</p>
          </Link>
          <Link
            className="model-card-container"
            href="/queue"
          >
            {/* Main Image */}
            <Image
              src="/queue.png"
              alt="Colas"
              width={247}
              height={140}
              priority
            />
            {/* Main Name */}
            <p>Teoría de Colas</p>
          </Link>
        </div>
      </section>
    </Page>
  );
}
