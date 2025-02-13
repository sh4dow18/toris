// Inventory Libs Requirements
import { FixResult } from "./general";
// Get Optimal Production Lot Size Function
export function GetOptimalProductionLotSize(
  model: number,
  demand: number,
  releaseCost: number,
  inventoryCost: number,
  constantProductionRatio: number,
  deficitCost: number,
  decimals: number
) {
  const FIRST_PART = (2 * demand * releaseCost) / inventoryCost;
  let result = FIRST_PART;
  // If it is the EPQ Model, add Constant Production Ratio to the result formula
  if (model === 1 || model === 2) {
    const SECOND_PART = 1 / (1 - demand / constantProductionRatio);
    result = result * SECOND_PART;
  }
  // If it is a Deficit Model, add deficit cost to the result formula
  if (model === 2 || model === 4) {
    const THIRD_PART = (inventoryCost + deficitCost) / deficitCost;
    result = result * THIRD_PART;
  }
  return FixResult(Math.sqrt(result), decimals);
}
// Get Time Between Two Production Runs function
export function GetTimeBetweenTwoProductionRuns(
  optimalProductionLotSize: number,
  demand: number,
  decimals: number
) {
  return FixResult(optimalProductionLotSize / demand, decimals);
}
// Get Frequency Between Two Production Runs
export function GetFrequencyBetweenTwoProductionRuns(
  timeBetweenTwoProductionRuns: number,
  decimals: number
) {
  return FixResult(1 / timeBetweenTwoProductionRuns, decimals);
}
// Get Maximum Deficit
export function GetMaxDeficit(
  model: number,
  demand: number,
  inventoryCost: number,
  releaseCost: number,
  constantProductionRatio: number,
  deficitCost: number,
  decimals: number
) {
  const FIRST_PART = 2 * demand * inventoryCost * releaseCost;
  let secondPart = 1 - demand / constantProductionRatio;
  const THIRD_PART = deficitCost * (inventoryCost + deficitCost);
  // If it is the EOQ with Deficit Model, set the second part to 1
  if (model === 4) {
    secondPart = 1;
  }
  const RESULT = (FIRST_PART * secondPart) / THIRD_PART;
  return FixResult(Math.sqrt(RESULT), decimals);
}
// Get Second Time Interval
export function GetSecondTimeInterval(
  model: number,
  deficitCost: number,
  releaseCost: number,
  demand: number,
  constantProductionRatio: number,
  inventoryCost: number,
  decimals: number
) {
  let firstPart = 2 * releaseCost;
  let secondPart = 1 - demand / constantProductionRatio;
  let thirdPart = demand * inventoryCost;
  // If the model is EOQ with Deficit, add deficit to the EOQ formula
  if (model === 4) {
    firstPart = firstPart * inventoryCost;
    secondPart = 1;
    thirdPart = demand * deficitCost * (inventoryCost + deficitCost);
  }
  // If the model is EPQ with Deficit, add deficit to EPQ formula
  else if (model === 2) {
    firstPart = firstPart * deficitCost;
    thirdPart = thirdPart * (inventoryCost + deficitCost);
  }
  const RESULT = (firstPart * secondPart) / thirdPart;
  return FixResult(Math.sqrt(RESULT), decimals);
}
// Get Max Inventory Level
export function GetMaxInventoryLevel(
  model: number,
  demand: number,
  secondTimeInterval: number,
  optimalProductionLotSize: number,
  decimals: number
) {
  let result = demand * secondTimeInterval;
  // If it is the EOQ with Deficit Model, change the formula to Q - a * t2
  // If it is the EOQ without Deficit Model, set result to Q
  if (model === 3 || model === 4) {
    result =
      model === 4
        ? optimalProductionLotSize - result
        : optimalProductionLotSize;
  }
  return FixResult(result, decimals);
}
// Get First Time Interval
export function GetFirstTimeInterval(
  model: number,
  maxInventoryLevel: number,
  demand: number,
  deficitCost: number,
  releaseCost: number,
  inventoryCost: number,
  timeBetweenTwoProductionRuns: number,
  decimals: number,
  constantProductionRatio?: number
) {
  let result = 0;
  // If it is a EPQ Model, use the Constant Production Ratio to calculate
  if ((model === 1 || model === 2) && constantProductionRatio !== undefined) {
    result = maxInventoryLevel / (constantProductionRatio - demand);
  }
  // If it is the EOQ without Deficit Model, use the Time between 2 Production Runs
  else if (model === 3) {
    result = timeBetweenTwoProductionRuns;
  }
  // If it is the EOQ with Deficit Model, use the model of EOQ with Deficit Model
  else if (model === 4) {
    const FIRST_PART = 2 * deficitCost * releaseCost;
    const SECOND_PART = demand * inventoryCost * (inventoryCost + deficitCost);
    result = Math.sqrt(FIRST_PART / SECOND_PART);
  }
  return FixResult(result, decimals);
}
// Get Third Time Interval
export function GetThirdTimeInterval(
  inventoryCost: number,
  releaseCost: number,
  demand: number,
  constantProductionRatio: number,
  deficitCost: number,
  decimals: number
) {
  const FIRST_PART = 2 * inventoryCost * releaseCost;
  const SECOND_PART = 1 - demand / constantProductionRatio;
  const THIRD_PART = demand * deficitCost;
  const FOURTH_PART = inventoryCost + deficitCost;
  const RESULT = (FIRST_PART * SECOND_PART) / (THIRD_PART * FOURTH_PART);
  return FixResult(Math.sqrt(RESULT), decimals);
}
// Get Fourth Time Interval
export function GetFourthTimeInterval(
  maxDeficit: number,
  constantProductionRatio: number,
  demand: number,
  decimals: number
) {
  return FixResult(maxDeficit / (constantProductionRatio - demand), decimals);
}
// Get Total Holding Inventory Cost
export function GetTotalHoldingInventoryCost(
  model: number,
  inventoryCost: number,
  maxInventoryLevel: number,
  firstTimeInterval: number,
  secondTimeInterval: number,
  decimals: number
) {
  const FIRST_PART = inventoryCost * maxInventoryLevel;
  let secondPart = firstTimeInterval;
  if (model === 1 || model === 2) {
    secondPart = secondPart + secondTimeInterval;
  }
  const RESULT = (FIRST_PART * secondPart) / 2;
  return FixResult(RESULT, decimals);
}
// Get Total Deficit Cost
export function GetTotalDeficitCost(
  model: number,
  deficitCost: number,
  maxDeficit: number,
  secondTimeInterval: number,
  thirdTimeInterval: number,
  fourthTimeInterval: number,
  decimals: number
) {
  const FIRST_PART = deficitCost * maxDeficit;
  let secondPart = thirdTimeInterval + fourthTimeInterval;
  if (model === 4) {
    secondPart = secondTimeInterval;
  }
  const RESULT = (FIRST_PART * secondPart) / 2;
  return FixResult(RESULT, decimals);
}
// Get Total Production Cost
export function GetTotalProductionCost(
  releaseCost: number,
  frequencyBetweenTwoProductionRuns: number,
  decimals: number
) {
  return FixResult(releaseCost * frequencyBetweenTwoProductionRuns, decimals);
}
// Get Total Unit Cost
export function GetTotalProductionUnitCost(
  demand: number,
  unitProductionCost: number,
  decimals: number
) {
  return FixResult(demand * unitProductionCost, decimals);
}
