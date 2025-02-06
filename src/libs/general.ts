// Fix Results Function to have a Number with the decimals that the user specifies
export function FixResult(result: number, decimals: number) {
  return Number.parseFloat(result.toFixed(decimals));
}
// Returns a string number in accounting form
// Example: "12000" to "$12,000.00"
export function FormatNumberToAccounting(
  symbol: string,
  number: number
): string {
  return `${symbol}${number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
// Gets a Float Value from a String
export function GetValueFromString(value: string) {
  return Number.parseFloat(value);
}
// Gets a Float Value from a String or Undefined
export function GetValueFromPossibleEmptyString(value: string) {
  return value !== "" ? Number.parseFloat(value) : undefined;
}
// Get Factorial of a Number
export function Factorial(number: number): number {
  if (number === 0 || number === 1) {
    return 1;
  }
  return number * Factorial(number - 1);
}
// Get Percentage from a Probability
export function Percentage(number: number) {
  if (Number.isNaN(number)) {
    return "Sin Definir";
  }
  const RESULT = (number * 100).toFixed(2);
  return `${RESULT}%`;
}
export function CheckNumber(number: number) {
  // If Number is undefined, return Undefined
  if (Number.isNaN(number)) {
    return "Sin Definir";
  }
  // If Number is Infinite, returns Infinite Symbol
  else if (!Number.isFinite(number)) {
    return "∞"
  }
  // Else, return number
  return number
}
