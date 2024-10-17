// Queue Result Page Stylesheets
import "@/stylesheets/pages/result.css";
// Queue Result Page Requirements
import { Metadata } from "next";
import { Page } from "@/components";
import {
  GetLq,
  GetLs,
  GetPn,
  GetPWq,
  GetPWs,
  GetRo,
  GetWq,
  GetWs,
} from "@/libs/queues-formulas";
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
  const n = GetNumberFromParam("n");
  const t = GetNumberFromParam("t");
  // Get Results
  const ro = GetRo(l, m, 1);
  const Ls = GetLs(l, m);
  const Lq = GetLq(l, m);
  const Ws = GetWs(l, m);
  const Wq = GetWq(l, m);
  const Pn = GetPn(ro, n);
  const PWs = GetPWs(m, ro, t);
  const PWq = GetPWq(m, ro, t);
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
          <li>
            {/* Expected time of customers in the system */}
            <strong>
              Tiempo esperado de clientes en el sistema (Ws):
            </strong>{" "}
            {Ws} unidades de tiempo
          </li>
          <li>
            {/* Expected time of customers in queue */}
            <strong>Tiempo esperado de clientes en cola (Wq):</strong> {Wq}{" "}
            unidades de tiempo
          </li>
          <li>
            {/* Probability of n customers in the system  */}
            <strong>
              Probabilidad de {n} clientes en el sistema (P(n)):
            </strong>{" "}
            {Pn} ({Pn * 100}%) de Probabilidad
          </li>
          <li>
            {/* Probability that it is more than t units of time in the system  */}
            <strong>
              Probabilidad de que este más de {t} unidades de tiempo en el
              sistema (P({`Ws > t`})):
            </strong>{" "}
            {PWs} ({PWs * 100}%) de Probabilidad
          </li>
          <li>
            {/* Probability that it is more than t units of time in queue  */}
            <strong>
              Probabilidad de que este más de {t} unidedes de tiempo en cola (P(
              {`Wq > t`})):
            </strong>{" "}
            {PWq} ({PWq * 100}%) de Probabilidad
          </li>
        </ul>
      </section>
    </Page>
  );
}

export default QueueResultPage;
