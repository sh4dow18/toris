// Queue Result Page Stylesheets
import "@/stylesheets/pages/result.css";
// Queue Result Page Requirements
import { Metadata } from "next";
import { Page } from "@/components";
import {
  GetLq,
  GetLs,
  GetMMSP0,
  GetPLs,
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
  "mms-fifo-inf-inf": "M/M/s : FIFO/∞/∞",
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
  const s =
    typeof searchParams["s"] === "string"
      ? Number.parseFloat(searchParams["s"])
      : 1;
  const n1 = GetNumberFromParam("n1");
  const n2 = GetNumberFromParam("n2");
  const t1 = GetNumberFromParam("t1");
  const t2 = GetNumberFromParam("t2");
  // Get Results
  const ro = GetRo(l, m, s);
  const P0 = model.startsWith("M/M/s") ? GetMMSP0(l, m, s, ro) : undefined;
  const Ls = GetLs(l, m);
  const Lq = GetLq(l, m);
  const Ws = GetWs(l, m);
  const Wq = GetWq(l, m);
  const Pn = GetPn(ro, n1, l, m, s, P0);
  const PWs = GetPWs(m, ro, t1);
  const PWq = GetPWq(m, ro, t2);
  const PLs = GetPLs(ro, n2 - 1);
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
          <li>
            {/* Servers Amount */}
            <strong>Cantidad de Servidores (s):</strong> {s} servidores
          </li>
          <li>
            {/* Number of Clients in the System */}
            <strong>Número de Clientes en el Sistema (n1):</strong> {n1}{" "}
            clientes
          </li>
          <li>
            {/* Number of Clients in Queue */}
            <strong>Número de Clientes en Cola (n2):</strong> {n2} clientes
          </li>
          <li>
            {/* Units of time in the system */}
            <strong>Unidades de tiempo en el sistema (t1):</strong> {t1}{" "}
            unidades de tiempo
          </li>
          <li>
            {/* Units of time in Queue */}
            <strong>Unidades de tiempo en Cola (t2):</strong> {t2} unidades de
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
            <strong>Número Esperado de Clientes en Cola (Lq):</strong> {Lq}{" "}
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
              Probabilidad de {n1} clientes en el sistema (P(n1)):
            </strong>{" "}
            {Pn} ({Pn * 100}%) de Probabilidad
          </li>
          <li>
            {/* Probability that it is more than t units of time in the system  */}
            <strong>
              Probabilidad de que este más de {t1} unidades de tiempo en el
              sistema (P({`Ws > t1`})):
            </strong>{" "}
            {PWs} ({PWs * 100}%) de Probabilidad
          </li>
          <li>
            {/* Probability that it is more than t units of time in queue  */}
            <strong>
              Probabilidad de que este más de {t2} unidades de tiempo en cola
              (P(
              {`Wq > t2`})):
            </strong>{" "}
            {PWq} ({PWq * 100}%) de Probabilidad
          </li>
          <li>
            {/* Probability that it is more than t units of time in queue  */}
            <strong>
              Probabilidad de tener una cola de más de {n2 - 1} clientes (P(
              {`Ls > n2`})):
            </strong>{" "}
            {PLs} ({PLs * 100}%) de Probabilidad
          </li>
        </ul>
      </section>
    </Page>
  );
}

export default QueueResultPage;
