// Set this component as a client component
"use client";
// Inventory Page Requirements
import { Card, Form, Input, Section, Select } from "@/components";
import { FormatNumberToAccounting, GetValueFromString } from "@/libs/general";
import {
  GetFirstTimeInterval,
  GetFourthTimeInterval,
  GetFrequencyBetweenTwoProductionRuns,
  GetMaxDeficit,
  GetMaxInventoryLevel,
  GetOptimalProductionLotSize,
  GetSecondTimeInterval,
  GetThirdTimeInterval,
  GetTimeBetweenTwoProductionRuns,
  GetTotalDeficitCost,
  GetTotalHoldingInventoryCost,
  GetTotalProductionCost,
  GetTotalProductionUnitCost,
} from "@/libs/inventory";
import { FormEvent, useState } from "react";
// Inventory Page Constants
const TITLE = "Teoría de Inventarios";
const DESCRIPTION =
  "Soluciona Problemas Fáciles de Teoría de Inventarios con unos Cuantos Clics";
// Inventory Page Main Function
function Inventory() {
  // Inventory Page Constants
  const INIT_RESULTS_VALUES = {
    optimalProductionLotSize: 0,
    timeBetweenTwoProductionRuns: 0,
    frequencyBetweenTwoProductionRuns: 0,
    maxDeficit: 0,
    maxInventoryLevel: 0,
    firstTimeInterval: 0,
    secondTimeInterval: 0,
    thirdTimeInterval: 0,
    fourthTimeInterval: 0,
    totalHoldingInventoryCost: "0",
    totalDeficitCost: "0",
    totalProductionCost: "0",
    totalProductionUnitCost: "0",
    totalCost: "0",
  };
  const MODELS_LIST = [
    { id: 1, name: "EPQ sin Déficit" },
    { id: 2, name: "EPQ con Déficit" },
    { id: 3, name: "EOQ sin Déficit" },
    { id: 4, name: "EOQ con Déficit" },
  ];
  const COINS_LIST = [
    { name: "Colón (₡)", value: "₡" },
    { name: "Dólar ($)", value: "$" },
    { name: "Euro (€)", value: "€" },
  ];
  // Inventory Page Hooks
  const [selectedModel, SetSelectedModel] = useState<number>(1);
  const [results, SetResults] = useState(INIT_RESULTS_VALUES);
  // Submit Arrow Function to use in Form
  const Submit = (event: FormEvent<HTMLFormElement>) => {
    // Avoid refreshing the page
    event.preventDefault();
    // Get the entire form as a variable
    const FORM = event.target as HTMLFormElement;
    // Get every value from Form Variable
    const DEMAND = GetValueFromString(FORM.demand.value);
    const RELEASE_COST = GetValueFromString(FORM.releaseCost.value);
    const INVENTORY_COST = GetValueFromString(FORM.inventoryCost.value);
    const CONSTANT_PRODUCTION_RATIO = GetValueFromString(
      FORM.constantProductionRatio.value
    );
    const DEFICIT_COST = GetValueFromString(FORM.deficitCost.value);
    const UNIT_PRODUCTION_COST = GetValueFromString(
      FORM.unitProductionCost.value
    );
    const DECIMALS = GetValueFromString(FORM.decimals.value);
    const CURRENCY = FORM.currency.value;
    // Calculate all results
    const OPTIMAL_PRODUCTION_LOT_SIZE = GetOptimalProductionLotSize(
      selectedModel,
      DEMAND,
      RELEASE_COST,
      INVENTORY_COST,
      CONSTANT_PRODUCTION_RATIO,
      DEFICIT_COST,
      DECIMALS
    );
    const TIME_BETWEEN_TWO_PRODUCTION_RUNS = GetTimeBetweenTwoProductionRuns(
      OPTIMAL_PRODUCTION_LOT_SIZE,
      DEMAND,
      DECIMALS
    );
    const FREQUENCY_BETWEEN_TWO_PRODUCTION_RUNS =
      GetFrequencyBetweenTwoProductionRuns(
        TIME_BETWEEN_TWO_PRODUCTION_RUNS,
        DECIMALS
      );
    const MAX_DEFICIT = GetMaxDeficit(
      selectedModel,
      DEMAND,
      INVENTORY_COST,
      RELEASE_COST,
      CONSTANT_PRODUCTION_RATIO,
      DEFICIT_COST,
      DECIMALS
    );
    const SECOND_TIME_INTERVAL = GetSecondTimeInterval(
      selectedModel,
      DEFICIT_COST,
      RELEASE_COST,
      DEMAND,
      CONSTANT_PRODUCTION_RATIO,
      INVENTORY_COST,
      DECIMALS
    );
    const MAX_INVENTORY_LEVEL = GetMaxInventoryLevel(
      selectedModel,
      DEMAND,
      SECOND_TIME_INTERVAL,
      OPTIMAL_PRODUCTION_LOT_SIZE,
      DECIMALS
    );
    const FIRST_TIME_INTERVAL = GetFirstTimeInterval(
      selectedModel,
      MAX_INVENTORY_LEVEL,
      DEMAND,
      DEFICIT_COST,
      RELEASE_COST,
      INVENTORY_COST,
      TIME_BETWEEN_TWO_PRODUCTION_RUNS,
      DECIMALS,
      CONSTANT_PRODUCTION_RATIO
    );
    const THIRD_TIME_INTERVAL = GetThirdTimeInterval(
      INVENTORY_COST,
      RELEASE_COST,
      DEMAND,
      CONSTANT_PRODUCTION_RATIO,
      DEFICIT_COST,
      DECIMALS
    );
    const FOURTH_TIME_INTERVAL = GetFourthTimeInterval(
      MAX_DEFICIT,
      CONSTANT_PRODUCTION_RATIO,
      DEMAND,
      DECIMALS
    );
    const TOTAL_HOLDING_INVENTORY_COST = GetTotalHoldingInventoryCost(
      selectedModel,
      INVENTORY_COST,
      MAX_INVENTORY_LEVEL,
      FIRST_TIME_INTERVAL,
      SECOND_TIME_INTERVAL,
      DECIMALS
    );
    const TOTAL_DEFICIT_COST = GetTotalDeficitCost(
      selectedModel,
      DEFICIT_COST,
      MAX_DEFICIT,
      SECOND_TIME_INTERVAL,
      THIRD_TIME_INTERVAL,
      FOURTH_TIME_INTERVAL,
      DECIMALS
    );
    const TOTAL_PRODUCTION_COST = GetTotalProductionCost(
      RELEASE_COST,
      FREQUENCY_BETWEEN_TWO_PRODUCTION_RUNS,
      DECIMALS
    );
    const TOTAL_PRODUCTION_UNIT_COST = GetTotalProductionUnitCost(
      DEMAND,
      UNIT_PRODUCTION_COST,
      DECIMALS
    );
    SetResults({
      optimalProductionLotSize: OPTIMAL_PRODUCTION_LOT_SIZE,
      timeBetweenTwoProductionRuns: TIME_BETWEEN_TWO_PRODUCTION_RUNS,
      frequencyBetweenTwoProductionRuns: FREQUENCY_BETWEEN_TWO_PRODUCTION_RUNS,
      maxDeficit: MAX_DEFICIT,
      secondTimeInterval: SECOND_TIME_INTERVAL,
      maxInventoryLevel: MAX_INVENTORY_LEVEL,
      firstTimeInterval: FIRST_TIME_INTERVAL,
      thirdTimeInterval: THIRD_TIME_INTERVAL,
      fourthTimeInterval: FOURTH_TIME_INTERVAL,
      totalHoldingInventoryCost: FormatNumberToAccounting(
        CURRENCY,
        TOTAL_HOLDING_INVENTORY_COST
      ),
      totalDeficitCost: FormatNumberToAccounting(CURRENCY, TOTAL_DEFICIT_COST),
      totalProductionCost: FormatNumberToAccounting(
        CURRENCY,
        TOTAL_PRODUCTION_COST
      ),
      totalProductionUnitCost: FormatNumberToAccounting(
        CURRENCY,
        TOTAL_PRODUCTION_UNIT_COST
      ),
      totalCost: FormatNumberToAccounting(
        CURRENCY,
        TOTAL_HOLDING_INVENTORY_COST +
          (selectedModel === 2 || selectedModel === 4
            ? TOTAL_DEFICIT_COST
            : 0) +
          TOTAL_PRODUCTION_COST +
          TOTAL_PRODUCTION_UNIT_COST
      ),
    });
  };
  // Returns Inventory Page
  return (
    <div className="flex flex-col justify-center text-gray-400 z-10 px-8 mx-auto my-5">
      {/* Main Section with Page Title and Description */}
      <section className="flex flex-col gap-5">
        <h1 className="text-white text-5xl font-bold">{TITLE}</h1>
        <p>{DESCRIPTION}</p>
      </section>
      {/* Page Important Content */}
      <div className="min-[1440px]:flex min-[1440px]:gap-10">
        {/* Inventory Form */}
        <Form submitButton="Obtener Resultados" OnSubmit={Submit}>
          {/* Select Model Form Section */}
          <Section
            title="Modelos Disponibles"
            description="Aquí se presentan los modelos disponibles sobre teoría de inventarios que afectaran a las variables necesarias"
            contentClassName="flex flex-col gap-4 justify-center min-[372px]:flex-row min-[372px]:flex-wrap"
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
                className={`py-2 px-3 font-medium rounded-md text-center min-[372px]:w-[9.1rem] ${
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
          >
            {/* Constant Production Ratio Input */}
            <Input
              label="Razón de Producción Constante"
              name="constantProductionRatio"
              placeholder="8000"
              help="Números Positivos Solamente"
              validation="number"
              disabled={selectedModel === 3 || selectedModel === 4}
            />
            {/* Constant Demand */}
            <Input
              label="Demanda Constante"
              name="demand"
              placeholder="3000"
              help="Números Positivos Solamente"
              validation="number"
            />
            {/* Unit Production Cost */}
            <Input
              label="Costo Unitario de Producción"
              name="unitProductionCost"
              placeholder="4"
              help="Números Positivos Solamente"
              validation="number"
            />
            {/* Inventory Cost */}
            <Input
              label="Costo por Mantener en Inventario"
              name="inventoryCost"
              placeholder="3"
              help="Números Positivos Solamente"
              validation="number"
            />
            {/* Release Cost */}
            <Input
              label="Costo de Lanzamiento"
              name="releaseCost"
              placeholder="100"
              help="Números Positivos Solamente"
              validation="number"
            />
            {/* Deficit Cost */}
            <Input
              label="Costo por Déficit"
              name="deficitCost"
              placeholder="2"
              help="Números Positivos Solamente"
              validation="number"
              disabled={selectedModel === 1 || selectedModel === 3}
            />
          </Section>
          {/* Settings Form Section */}
          <Section
            title="Configuración"
            description="Aquí se configura los valores para los resultados obtenidos con base a los variables"
          >
            {/* Number of Decimals */}
            <Input
              label="Cantidad de Decimales"
              name="decimals"
              placeholder="2"
              help="Números del 1 al 10 Solamente"
              validation="numberWithOneDigit"
            />
            {/* Currency Type */}
            <Select
              label="Tipo de Moneda"
              name="currency"
              optionsList={COINS_LIST}
            />
          </Section>
        </Form>
        {/* Results Section */}
        <Section
          title="Resultados"
          description="Aquí se muestran los resultados obtenidos con base a lo puesto anteriormente"
          contentClassName="flex flex-col gap-4 min-[768px]:grid min-[768px]:grid-cols-2"
        >
          {/* Optimal Production Lot Size Card */}
          <Card
            name="Tamaño óptimo del Lote de Producción"
            value={results.optimalProductionLotSize}
          />
          {/* Time between 2 Production Runs Card */}
          <Card
            name="Tiempo entre 2 Corridas de Producción"
            value={results.timeBetweenTwoProductionRuns}
          />
          {/* Frequency between 2 Production Runs Card */}
          <Card
            name="Frecuencia entre 2 Corridas de Producción"
            value={results.frequencyBetweenTwoProductionRuns}
          />
          {/* Max Deficit Card */}
          <Card
            name="Déficit Máximo"
            value={results.maxDeficit}
            disabled={selectedModel === 1 || selectedModel === 3}
          />
          {/* Max Inventory Level Card */}
          <Card
            name="Nivel de Inventario Máximo"
            value={results.maxInventoryLevel}
          />
          {/* First Time Interval Card */}
          <Card
            name="Primer Intervalo de Tiempo"
            value={results.firstTimeInterval}
          />
          {/* Second Time Interval Card */}
          <Card
            name="Segundo Intervalo de Tiempo"
            value={results.secondTimeInterval}
            disabled={selectedModel === 3}
          />
          {/* Third Time Interval Card */}
          <Card
            name="Tercer Intervalo de Tiempo"
            value={results.thirdTimeInterval}
            disabled={selectedModel !== 2}
          />
          {/* Fourth Time Interval Card */}
          <Card
            name="Cuarto Intervalo de Tiempo"
            value={results.fourthTimeInterval}
            disabled={selectedModel !== 2}
          />
          {/* Total Holding Inventory Cost Card */}
          <Card
            name="Costo Total por Mantener en Inventario"
            value={results.totalHoldingInventoryCost}
          />
          {/* Total Deficit Cost Card */}
          <Card
            name="Costo Total por Déficit"
            value={results.totalDeficitCost}
            disabled={selectedModel === 1 || selectedModel === 3}
          />
          {/* Total Production Cost Card */}
          <Card
            name="Costo Total por Producción"
            value={results.totalProductionCost}
          />
          {/* Total Unit Production Cost Card */}
          <Card
            name="Costo Total por Unidad de Producción"
            value={results.totalProductionUnitCost}
          />
          {/* Total Cost Card */}
          <Card name="Costo Total" value={results.totalCost} />
        </Section>
      </div>
    </div>
  );
}

export default Inventory;
