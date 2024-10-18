// Queue Page Requirements
import { Card, Page } from "@/components";
import { Metadata } from "next";
// Queue Page Constants
const TITLE = "Teoría de Colas";
const DESCRIPTION =
  "Soluciona Problemas Fáciles de Teoría de Colas con unos Cuantos Clics";
// Queue Page Metadata
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};
// Queue Page Main Function
function Queue() {
  // Returns Queue Page
  return (
    <Page title={TITLE} description={DESCRIPTION}>
      <section className="cards-list-container">
        {/* Available Queue Models */}
        <h2>Modelos Disponibles</h2>
        {/* Model Cards Lists */}
        <div>
          <Card
            name="M/M/1 : FIFO/∞/∞"
            image="mm1-fifo-inf-inf"
            href="queue/variables"
            model="mm1-fifo-inf-inf"
          />
          <Card
            name="M/M/s : FIFO/∞/∞"
            image="mms-fifo-inf-inf"
            href="queue/variables"
            model="mms-fifo-inf-inf"
          />
          <Card
            name="M/M/1 : FIFO/K/∞"
            image="mm1-fifo-inf-inf"
            href="queue/variables"
            model="mm1-fifo-k-inf"
          />
        </div>
      </section>
    </Page>
  );
}

export default Queue;
