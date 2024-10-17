// Queue Variables Page Requirements
import { Form, Input, Page } from "@/components";
import { Metadata } from "next";
// Queue Page Constants
const TITLE = "Variables";
const DESCRIPTION =
  "Aquí se agregan los valores a las variables para el resultado final";
// Queue Variables Metadata
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};
// Queue Variables Page Props
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
// Queue Variables Page Main Function
function QueueVariablesPage({ searchParams }: Props) {
  // Get Model from Param
  const MODEL =
    typeof searchParams["model"] === "string"
      ? searchParams["model"]
      : "mm1-fifo-inf-inf";
  // Returns Queue Variables Page
  return (
    <Page title={TITLE} description={DESCRIPTION}>
      <section>
        {/* Set Values */}
        <h2>Establecer Valores</h2>
        {/* Variables Form */}
        <Form
          api="queue/result"
          method="GET"
          button="Calcular"
          modal={{
            success: "Se han Calculado las Nuevas Variables",
            error: "No se han podido calcular las Nuevas Variables",
            loading: "Obteniendo Variables",
          }}
        >
          <div>
            {/* Invisible Input that has Model Code and it is Read Only */}
            <input
              className="invisible"
              type="text"
              name="model"
              value={MODEL}
              readOnly
            />
            {/* Arrival Distribution Rate Input */}
            <Input
              label="Tasa de Distribución de Llegada (λ)"
              type="text"
              name="l"
              example="90"
              help="Números Positivos Solamente"
              validation="number"
            />
            {/* Average Service Rate Input */}
            <Input
              label="Tasa media de Servicio (µ)"
              type="text"
              name="m"
              example="120"
              help="Números Positivos Solamente"
              validation="number"
            />
            {/* Number of Clients in the System Input */}
            <Input
              label="Número de Clientes en el Sistema (n)"
              type="text"
              name="n"
              example="0"
              help="Números Positivos Solamente"
              validation="number"
            />
          </div>
        </Form>
      </section>
    </Page>
  );
}

export default QueueVariablesPage;
