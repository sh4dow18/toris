// Home Page Requirements
import { Card, Page } from "@/components";
import { Metadata } from "next";
// Home Page Constants
const TITLE = "Teoría de Inventarios";
const DESCRIPTION =
  "Soluciona Problemas Fáciles de Teoría de Inventarios con unos Cuantos Clics";
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
        <h2>Modelos Disponibles</h2>
        {/* Model Cards Lists */}
        <div>
          {/* EPQ with Deficit Model Card */}
          <Card
            name="EPQ con Déficit (Con Faltantes)"
            image="epq-w-d"
            href="inventory/variables"
            model="epq-w-d"
          />
          {/* EPQ without Deficit Model Card */}
          <Card
            name="EPQ sin Déficit (Sin Faltantes)"
            image="epq-wo-d"
            href="inventory/variables"
            model="epq-wo-d"
          />
          {/* EOQ with Deficit Model Card */}
          <Card
            name="EOQ con Déficit (Con Faltantes)"
            image="eoq-w-d"
            href="inventory/variables"
            model="eoq-w-d"
          />
          {/* EOQ without Deficit Model Card */}
          <Card
            name="EOQ sin Déficit (Sin Faltantes)"
            image="eoq-wo-d"
            href="inventory/variables"
            model="eoq-wo-d"
          />
        </div>
      </section>
    </Page>
  );
}
