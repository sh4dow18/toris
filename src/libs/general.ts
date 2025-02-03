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
