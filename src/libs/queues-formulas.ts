// Fix Results Function to have a Number with the decimals that the user specifies
// Also, check if the user wants to round the number up or down.
function FixResult(result: number, decimals: number, rounded?: "up" | "down") {
  return Number.parseFloat(
    rounded
      ? rounded === "down"
        ? Math.trunc(result).toString()
        : Math.ceil(result).toString()
      : result.toFixed(decimals)
  );
}
// Get System Utilization Factor (ro = ρ)
export function GetRo(l: number, m: number, s?: number) {
  const S = s ? s : 1;
  const RESULT = l / (m * S);
  return FixResult(RESULT, 4);
}
