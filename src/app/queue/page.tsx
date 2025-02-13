"use client";
// Queue Page Requirements
import { Card, Form, Input, Section } from "@/components";
import {
  GetValueFromString,
  GetValueFromPossibleEmptyString,
  Percentage,
} from "@/libs/general";
import {
  GetExpectedNumberOfClientsInQueue,
  GetProbabilityOfZeroClientsinSystem,
  GetExpectedNumberOfClientsInSystem,
  GetSystemUtilizationFactor,
  GetProbabilityOfNClientsInSystem,
  GetExpectedTimeOfClientsInQueue,
  GetExpectedTimeOfClientsInSystem,
  GetProbabilityThatItsMoreThanTTimeInSystem,
  GetProbabilityThatItsMoreThanTTimeInQueue,
  GetProbabilityOfHavingQueueOfMoreThanNClients,
  GetProbabilityClientWillHaveToWait,
  GetAverageUnoccupiedServers,
} from "@/libs/queue";
import { FormEvent, useState } from "react";
// Queue Page Main Function
function Queue() {
  // Queue Page Constants
  const INIT_RESULTS_VALUES = {
    sysUtilFactor: 0, // System Utilization Factor
    clientsSys: 0, // Clients in System
    clientsQueue: 0, // Clients in Queue
    timeClientsSys: 0, // Time of Clients In System
    timeClientsQueue: 0, // Time of Clients in Queue
    probQueueClientsSys: 0, // Probability of Queue Clients in System
    probClientsSys: 0, // Probability of N Clients in System
    probMoreTimeSys: 0, // Probability that it's more than N Time in System
    probMoreTimeQueue: 0, // Probability of being more than N Time in Queue
    probQueueMoreClients: 0, // Probability of Having Queue of More than N Customers
    probWait: 0, // Probability that the Client will have to wait
    avgUnoccupiedServers: 0, // Average Number of Unoccupied Servers
  };
  const MODELS_LIST = [
    { id: 1, name: "M/M/1 : FIFO/∞/∞" },
    { id: 2, name: "M/M/s : FIFO/∞/∞" },
    { id: 3, name: "M/M/1 : FIFO/K/∞" },
  ];
  // Queue Page Hooks
  const [selectedModel, SetSelectedModel] = useState<number>(1);
  const [results, SetResults] = useState(INIT_RESULTS_VALUES);
  // Submit Arrow Function to use in Form
  const Submit = (event: FormEvent<HTMLFormElement>) => {
    // Avoid refreshing the page
    event.preventDefault();
    // Get the entire form as a variable
    const FORM = event.target as HTMLFormElement;
    // Get every value from Form
    const ARRIVAL_DISTRIBUTION_RATE = GetValueFromString(
      FORM.arrivalDistributionRate.value
    );
    const AVERAGE_SERVICE_RATE = GetValueFromString(
      FORM.averageServiceRate.value
    );
    const NUMBER_OF_CLIENTS_TO_1 = GetValueFromString(
      FORM.numberOfClientsTo1.value
    );
    const NUMBER_OF_CLIENTS_TO_2 = GetValueFromPossibleEmptyString(
      FORM.numberOfClientsTo2.value
    );
    const AMOUNT_TIME_TO_3 = GetValueFromPossibleEmptyString(
      FORM.amountTimeTo3.value
    );
    const AMOUNT_TIME_TO_4 = GetValueFromPossibleEmptyString(
      FORM.amountTimeTo4.value
    );
    const NUMBER_OF_SERVERS = GetValueFromPossibleEmptyString(
      FORM.numberOfServers.value
    );
    const QUEUE_SIZE = GetValueFromPossibleEmptyString(FORM.queueSize.value);
    const DECIMALS = GetValueFromString(FORM.decimals.value);
    // Calculate all results
    const SYS_UTIL_FACTOR = GetSystemUtilizationFactor(
      selectedModel,
      ARRIVAL_DISTRIBUTION_RATE,
      AVERAGE_SERVICE_RATE,
      DECIMALS,
      NUMBER_OF_SERVERS
    );
    const PROB_ZERO_CLIENTS_SYS =
      selectedModel !== 1
        ? GetProbabilityOfZeroClientsinSystem(
            selectedModel,
            ARRIVAL_DISTRIBUTION_RATE,
            AVERAGE_SERVICE_RATE,
            SYS_UTIL_FACTOR,
            DECIMALS,
            NUMBER_OF_SERVERS,
            QUEUE_SIZE
          )
        : undefined;
    const CLIENTS_QUEUE = GetExpectedNumberOfClientsInQueue(
      selectedModel,
      ARRIVAL_DISTRIBUTION_RATE,
      AVERAGE_SERVICE_RATE,
      SYS_UTIL_FACTOR,
      DECIMALS,
      NUMBER_OF_SERVERS,
      QUEUE_SIZE,
      PROB_ZERO_CLIENTS_SYS
    );
    const CLIENTS_SYS = GetExpectedNumberOfClientsInSystem(
      ARRIVAL_DISTRIBUTION_RATE,
      AVERAGE_SERVICE_RATE,
      SYS_UTIL_FACTOR,
      DECIMALS,
      QUEUE_SIZE,
      selectedModel === 2 ? CLIENTS_QUEUE : undefined
    );
    const PROB_QUEUE_CLIENTS_SYS =
      selectedModel === 3 && QUEUE_SIZE
        ? GetProbabilityOfNClientsInSystem(
            selectedModel,
            SYS_UTIL_FACTOR,
            QUEUE_SIZE,
            ARRIVAL_DISTRIBUTION_RATE,
            AVERAGE_SERVICE_RATE,
            DECIMALS,
            NUMBER_OF_SERVERS,
            QUEUE_SIZE,
            PROB_ZERO_CLIENTS_SYS
          )
        : undefined;
    const TIME_CLIENTS_QUEUE = GetExpectedTimeOfClientsInQueue(
      ARRIVAL_DISTRIBUTION_RATE,
      AVERAGE_SERVICE_RATE,
      DECIMALS,
      selectedModel !== 1 ? CLIENTS_QUEUE : undefined,
      PROB_QUEUE_CLIENTS_SYS
    );
    const TIME_CLIENTS_SYS = GetExpectedTimeOfClientsInSystem(
      ARRIVAL_DISTRIBUTION_RATE,
      AVERAGE_SERVICE_RATE,
      DECIMALS,
      selectedModel === 2 ? TIME_CLIENTS_QUEUE : undefined,
      PROB_QUEUE_CLIENTS_SYS
        ? {
            clientsSys: CLIENTS_SYS,
            probQueueClientsSys: PROB_QUEUE_CLIENTS_SYS,
          }
        : undefined
    );
    const PROB_CLIENTS_SYS = GetProbabilityOfNClientsInSystem(
      selectedModel,
      SYS_UTIL_FACTOR,
      NUMBER_OF_CLIENTS_TO_1,
      ARRIVAL_DISTRIBUTION_RATE,
      AVERAGE_SERVICE_RATE,
      DECIMALS,
      NUMBER_OF_SERVERS,
      QUEUE_SIZE,
      PROB_ZERO_CLIENTS_SYS
    );
    const PROB_MORE_TIME_SYS =
      selectedModel !== 3 && AMOUNT_TIME_TO_3
        ? GetProbabilityThatItsMoreThanTTimeInSystem(
            ARRIVAL_DISTRIBUTION_RATE,
            AVERAGE_SERVICE_RATE,
            SYS_UTIL_FACTOR,
            AMOUNT_TIME_TO_3,
            NUMBER_OF_SERVERS ? NUMBER_OF_SERVERS : 1,
            DECIMALS,
            PROB_ZERO_CLIENTS_SYS
          )
        : 0;
    const PROB_MORE_TIME_QUEUE =
      selectedModel === 1 && AMOUNT_TIME_TO_4
        ? GetProbabilityThatItsMoreThanTTimeInQueue(
            AVERAGE_SERVICE_RATE,
            SYS_UTIL_FACTOR,
            AMOUNT_TIME_TO_4,
            DECIMALS
          )
        : 0;
    const PROB_QUEUE_MORE_CLIENTS =
      selectedModel === 1 && NUMBER_OF_CLIENTS_TO_2
        ? GetProbabilityOfHavingQueueOfMoreThanNClients(
            SYS_UTIL_FACTOR,
            NUMBER_OF_CLIENTS_TO_2 - 1,
            DECIMALS
          )
        : 0;
    const PROB_WAIT =
      selectedModel === 2 && NUMBER_OF_SERVERS && PROB_ZERO_CLIENTS_SYS
        ? GetProbabilityClientWillHaveToWait(
            ARRIVAL_DISTRIBUTION_RATE,
            AVERAGE_SERVICE_RATE,
            NUMBER_OF_SERVERS,
            SYS_UTIL_FACTOR,
            PROB_ZERO_CLIENTS_SYS,
            DECIMALS
          )
        : 0;
    const AVG_UNOCCUPIED_SERVERS =
      selectedModel === 2 && NUMBER_OF_SERVERS
        ? GetAverageUnoccupiedServers(
            SYS_UTIL_FACTOR,
            NUMBER_OF_SERVERS,
            DECIMALS
          )
        : 0;
    SetResults({
      sysUtilFactor: SYS_UTIL_FACTOR,
      clientsQueue: CLIENTS_QUEUE,
      clientsSys: CLIENTS_SYS,
      probQueueClientsSys: PROB_QUEUE_CLIENTS_SYS ? PROB_QUEUE_CLIENTS_SYS : 0,
      timeClientsQueue: TIME_CLIENTS_QUEUE,
      timeClientsSys: TIME_CLIENTS_SYS,
      probClientsSys: PROB_CLIENTS_SYS,
      probMoreTimeSys: PROB_MORE_TIME_SYS,
      probMoreTimeQueue: PROB_MORE_TIME_QUEUE,
      probQueueMoreClients: PROB_QUEUE_MORE_CLIENTS,
      probWait: PROB_WAIT,
      avgUnoccupiedServers: AVG_UNOCCUPIED_SERVERS,
    });
  };
  // Returns Queue Page
  return (
    <Section
      title="Teorias de Colas"
      description="Soluciona Problemas Fáciles de Teoría de Colas con unos Cuantos Clícs"
      main
    >
      {/* Inventory Form */}
      <Form submitButton="Obtener Resultados" OnSubmit={Submit}>
        {/* Select Model Form Section */}
        <Section
          title="Modelos Disponibles"
          description="Aquí se presentan los modelos disponibles de colas"
          contentClassName="flex flex-col gap-4 justify-center min-[405px]:flex-row min-[405px]:flex-wrap"
          small
        >
          {MODELS_LIST.map((model) => (
            // When the button is clicked, change the selected model and set the results to their initial values
            <button
              key={model.id}
              type="button"
              onClick={() => {
                SetSelectedModel(model.id);
                SetResults(INIT_RESULTS_VALUES);
              }}
              className={`py-2 px-3 font-medium rounded-md text-center ${
                selectedModel === model.id
                  ? "bg-mateoryPurple text-white"
                  : "bg-gray-700 cursor-pointer"
              }`}
            >
              {model.name}
            </button>
          ))}
        </Section>
        {/* Variables Form Section */}
        <Section
          title="Variables"
          description="Aquí se toman los datos necesarios para calcular los resultados"
          small
        >
          {/* Arrival Distribution Rate Input */}
          <Input
            label="Tasa de Distribución de Llegada"
            name="arrivalDistributionRate"
            placeholder="90"
            help="Números Positivos Solamente"
            validation="number"
          />
          {/* Average Service Rate Input */}
          <Input
            label="Tasa media de Servicio"
            name="averageServiceRate"
            placeholder="120"
            help="Números Positivos Solamente"
            validation="number"
          />
          {/* Number of Clients for (1) Input */}
          <Input
            label="Número de Clientes para (1)"
            name="numberOfClientsTo1"
            placeholder="0"
            help="Números Positivos Solamente, incluido Cero"
            validation="numberWithZero"
          />
          {/* Number of Clients for (2) Input */}
          <Input
            label="Número de Clientes para (2)"
            name="numberOfClientsTo2"
            placeholder="4"
            help="Números Positivos Solamente, incluido Cero"
            validation="number"
            disabled={selectedModel !== 1}
          />
          {/* Time Units for (3) Input */}
          <Input
            label="Unidades de Tiempo para (3)"
            name="amountTimeTo3"
            placeholder="10"
            help="Números Positivos Solamente, incluido Cero"
            validation="numberWithZero"
            disabled={selectedModel === 3}
          />
          {/* Time Units for (4) Input */}
          <Input
            label="Unidades de Tiempo para (4)"
            name="amountTimeTo4"
            placeholder="20"
            help="Números Positivos Solamente, incluido Cero"
            validation="numberWithZero"
            disabled={selectedModel !== 1}
          />
          {/* Number of Servers Input */}
          <Input
            label="Cantidad de Servidores"
            name="numberOfServers"
            placeholder="2"
            help="Números Mayores que 2 Solamente"
            validation="servers"
            disabled={selectedModel !== 2}
          />
          {/* Queue Size Input */}
          <Input
            label="Tamaño de la Cola"
            name="queueSize"
            placeholder="100"
            help="Números Positivos Solamente, incluido Cero"
            validation="numberWithZero"
            disabled={selectedModel !== 3}
          />
        </Section>
        {/* Settings Form Section */}
        <Section
          title="Configuración"
          description="Aquí se configuran los valores para los resultados"
          small
        >
          {/* Number of Decimals */}
          <Input
            label="Cantidad de Decimales"
            name="decimals"
            placeholder="2"
            help="Números del 1 al 10 Solamente"
            validation="numberWithOneDigit"
          />
        </Section>
      </Form>
      {/* Results Section */}
      <Section
        title="Resultados"
        description="Aquí se muestran los resultados obtenidos con base a lo puesto anteriormente"
        contentClassName="flex flex-col gap-4 min-[768px]:grid min-[768px]:grid-cols-2 min-[768px]:mx-auto"
        small
      >
        {/* System Utilization Factor Card */}
        <Card
          name="Factor de Utilización del Sistema"
          value={results.sysUtilFactor}
          staticWidth
        />
        {/* Expected Clients in System Card */}
        <Card
          name="Número Esperado de Clientes en el Sistema"
          value={results.clientsSys}
          staticWidth
        />
        {/* Expected Clients in Queue Card */}
        <Card
          name="Número Esperado de Clientes en Cola"
          value={results.clientsQueue}
          staticWidth
        />
        {/* Time of Clients In System Card */}
        <Card
          name="Tiempo esperado de clientes en el sistema (1)"
          value={results.timeClientsSys}
          staticWidth
        />
        {/* Time of Clients in Queue Card */}
        <Card
          name="Tiempo esperado de clientes en cola"
          value={results.timeClientsQueue}
          staticWidth
        />
        {/* Probability of N Clients in System Card */}
        <Card
          name="Probabilidad de n clientes en el sistema (1)"
          value={Percentage(results.probClientsSys)}
          staticWidth
        />
        {/* Probability of Having Queue of More than N Customers Card */}
        <Card
          name="Probabilidad de tener una cola de más de n clientes (2)"
          value={Percentage(results.probQueueMoreClients)}
          staticWidth
          disabled={selectedModel !== 1}
        />
        {/* Probability that it's more than N Time in System Card */}
        <Card
          name="Probabilidad de que este más de n unidades de tiempo en el sistema (3)"
          value={Percentage(results.probMoreTimeSys)}
          staticWidth
          disabled={selectedModel === 3}
        />
        {/* Probability that it's more than N Time in Queue Card */}
        <Card
          name="Probabilidad de que este más de n unidades de tiempo en cola (4)"
          value={Percentage(results.probMoreTimeQueue)}
          staticWidth
          disabled={selectedModel !== 1}
        />
        {/* Probability that the Client will have to wait Card */}
        <Card
          name="Probabilidad de que el cliente tenga que esperar"
          value={Percentage(results.probWait)}
          staticWidth
          disabled={selectedModel !== 2}
        />
        {/* Average Number of Unoccupied Servers Card */}
        <Card
          name="Cantidad promedio de servidores que se encuentran desocupados en el sistema"
          value={results.avgUnoccupiedServers}
          staticWidth
          disabled={selectedModel !== 2}
        />
        {/* Probability that there are the maximum number of clients that the queue supports in the system Card */}
        <Card
          name="Probabilidad de que estén el máximo de clientes que soporta la cola en el sistema"
          value={Percentage(results.probQueueClientsSys)}
          staticWidth
          disabled={selectedModel !== 3}
        />
      </Section>
    </Section>
  );
}

export default Queue;
