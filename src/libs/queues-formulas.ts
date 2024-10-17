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
// Get Expected number of customers in the system (Ls) Function
export function GetLs(l: number, m: number) {
  const RESULT = l / (m - l);
  return FixResult(RESULT, 4);
}
// Get Expected number of customers in queue (Lq) function
export function GetLq(l: number, m: number) {
  const RESULT = Math.pow(l, 2) / (m * (m - l));
  return FixResult(RESULT, 4);
}
// Get Expected time of customers in the system (Ws) function
export function GetWs(l: number, m: number) {
  const RESULT = 1 / (m - l);
  return FixResult(RESULT, 4);
}
// Get Expected time of customers in queue (Wq) function
export function GetWq(l: number, m: number) {
  const RESULT = l / (m * (m - l));
  return FixResult(RESULT, 4);
}
