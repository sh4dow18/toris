// Queue Result Page Stylesheets
import "@/stylesheets/pages/result.css";
// Queue Result Page Requirements
import { Metadata } from "next";
import { Page } from "@/components";
import { GetLq, GetLs, GetRo } from "@/libs/queues-formulas";
// Queue Result Page Constants
const TITLE = "Resultados";
const DESCRIPTION = "Solución Encontrada al Problema Indicado";
// Queue Result Page Metadata
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};
// Queue Result Page Props
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
// Force dynamism to ensure the correct calculation
export const dynamic = "force-dynamic";
// Model Record to display the model name using the submitted model code
const modelsRecord: Record<string, string> = {
  "mm1-fifo-inf-inf": "M/M/1 : FIFO/∞/∞",
};
function QueueResultPage({ searchParams }: Props) {
  // Transform String Param to Number
  const GetNumberFromParam = (param: string): number => {
    return typeof searchParams[param] === "string"
      ? Number.parseFloat(searchParams[param])
      : 0;
  };
  // Get every param
  // If it is a correct model, use it, if not, use a correct one
  const model =
    typeof searchParams["model"] === "string"
      ? modelsRecord[searchParams["model"]]
      : modelsRecord["mm1-fifo-inf-inf"];
  const l = GetNumberFromParam("l");
  const m = GetNumberFromParam("m");
  // Get Results
  const ro = GetRo(l, m, 1);
  const Ls = GetLs(l, m);
  const Lq = GetLq(l, m);
  return (
    <Page className="results-container" title={TITLE} description={DESCRIPTION}>
      <section>
        {/* Data Entered Title */}
        <h2>Datos Ingresados</h2>
        <ul>
          <li>
            {/* Selected Model */}
            <strong>Modelo Seleccionado:</strong> {model}
          </li>
          <li>
            {/* Arrival Distribution Rate */}
            <strong>Tasa de Distribución de Llegada (λ):</strong> {l} unidades
            en un tiempo
          </li>
          <li>
            {/* Average Service Rate */}
            <strong>Tasa media de Servicio (µ):</strong> {m} unidades en un
            tiempo
          </li>
        </ul>
      </section>
      <section>
        {/* Results Obtained */}
        <h2>Resultados Obtenidos</h2>
        <ul>
          <li>
            {/* System Utilization Factor */}
            <strong>Factor de Utilización del Sistema (ρ):</strong> {ro}
          </li>
          <li>
            {/* Expected number of customers in the system */}
            <strong>
              Número Esperado de Clientes en el Sistema (Ls):
            </strong>{" "}
            {Ls} Clientes
          </li>
          <li>
            {/* Expected number of customers in queue */}
            <strong>Número Esperado de Clientes en la Cola (Lq):</strong> {Lq}{" "}
            Clientes
          </li>
        </ul>
      </section>
    </Page>
  );
}

export default QueueResultPage;
