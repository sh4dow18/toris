// Queue Page Requirements
import { Page } from "@/components";
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
      <section className="models-cards-list-container">
        {/* Available Queue Models */}
        <h2>Modelos Disponibles</h2>
        {/* Coming Soon */}
        <div>
          <p>Próximamente</p>
        </div>
      </section>
    </Page>
  );
}

export default Queue;
