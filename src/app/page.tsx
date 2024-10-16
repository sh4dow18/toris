// Home Page Requirements
import { Card, Page } from "@/components";
import { Metadata } from "next";
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
      <section className="cards-list-container">
        {/* Available Models */}
        <h2>Teorías Disponibles</h2>
        {/* Model Cards Lists */}
        <div>
          <Card
            name="Teoría de Inventarios"
            image="inventory"
            href="inventory"
          />
          <Card name="Teoría de Colas" image="queue" href="queue" />
        </div>
      </section>
    </Page>
  );
}
