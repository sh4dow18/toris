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
// Get Probability of n customers in the system (Pn) function
export function GetPn(ro: number, n: number) {
  const RESULT = (1 - ro) * Math.pow(ro, n);
  return FixResult(RESULT, 4);
}
// Get Probability that it is more than t units of time in the system (P(Ws)) function
export function GetPWs(m: number, ro: number, t: number) {
  const RESULT = Math.pow(Math.E, -1 * m * (1 - ro) * t);
  return FixResult(RESULT, 4);
}
// Get Probability that it is more than t units of time in queue (P(Wq)) function
export function GetPWq(m: number, ro: number, t: number) {
  const RESULT = ro * Math.pow(Math.E, -1 * m * (1 - ro) * t);
  return FixResult(RESULT, 4);
}
// Get Probability of having a queue of more than n customers (P(Ls)) function
export function GetPLs(ro: number, n: number) {
  const RESULT = Math.pow(ro, n + 1);
  return FixResult(RESULT, 4);
}
