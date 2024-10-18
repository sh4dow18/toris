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
// Get Factorial of a Number
function Factorial(n: number): number {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * Factorial(n - 1);
}
// Get System Utilization Factor (ro = ρ)
export function GetRo(l: number, m: number, s?: number) {
  const S = s ? s : 1;
  const RESULT = l / (m * S);
  return FixResult(RESULT, 4);
}
// Get Expected number of customers in the system (Ls) Function
export function GetLs(
  l: number,
  m: number,
  k: number,
  ro: number,
  Lq?: number
) {
  let result = 0;
  if (Lq) {
    result = Lq + l / m;
  } else if (k !== 0) {
    if (ro === 1) {
      result = k / 2;
    } else {
      const FIRST_PART = ro / (1 - ro);
      const SECOND_PART = (k + 1) * Math.pow(ro, k + 1);
      const THIRD_PART = 1 - Math.pow(ro, k + 1);
      result = FIRST_PART - SECOND_PART / THIRD_PART;
    }
  } else {
    result = l / (m - l);
  }
  return FixResult(result, 4);
}
// Get Expected number of customers in queue (Lq) function
export function GetLq(
  model: string,
  l: number,
  m: number,
  s: number,
  ro: number,
  P0?: number
) {
  let result = 0;
  if (P0) {
    if (model.startsWith("M/M/s")) {
      const FIRST_PART = Math.pow(l / m, s) * ro;
      const SECOND_PART = Factorial(s) * Math.pow(1 - ro, 2);
      result = (FIRST_PART / SECOND_PART) * P0;
    }
  } else {
    result = Math.pow(l, 2) / (m * (m - l));
  }
  return FixResult(result, 4);
}
// Get Expected time of customers in the system (Ws) function
export function GetWs(l: number, m: number, Wq?: number) {
  let result = 0;
  if (Wq) {
    result = Wq + 1 / m;
  } else {
    result = 1 / (m - l);
  }
  return FixResult(result, 4);
}
// Get Expected time of customers in queue (Wq) function
export function GetWq(l: number, m: number, Lq?: number) {
  let result = 0;
  if (Lq) {
    result = Lq / l;
  } else {
    result = l / (m * (m - l));
  }
  return FixResult(result, 4);
}
// Get Probability of 0 customers in the system (Pn) function for M/M/s:FIFO/∞/∞ model
export function GetP0(l: number, m: number, s: number, ro: number, k: number) {
  let result = 0;
  if (k !== 0) {
    if (ro === 1) {
      result = 1 / (k + 1);
    } else {
      result = (1 - ro) / (1 - Math.pow(ro, k + 1));
    }
  } else {
    let sum = 0;
    for (let i = 0; i < s; i++) {
      sum = sum + Math.pow(l / m, i) / Factorial(i);
    }
    const FIRST_PART = Math.pow(l / m, s) / Factorial(s);
    const SECOND_PART = 1 / (1 - ro);
    result = 1 / (FIRST_PART * SECOND_PART + sum);
  }
  return FixResult(result, 4);
}
// Get Probability of n customers in the system (Pn) function
export function GetPn(
  ro: number,
  n: number,
  l: number,
  m: number,
  s: number,
  k: number,
  P0?: number
) {
  let result = 0;
  if (P0) {
    if (n === 0) {
      result = P0;
    } else if (k === 0) {
      if (n <= s) {
        result = (Math.pow(l / m, n) / Factorial(n)) * P0;
      } else {
        result =
          (Math.pow(l / m, n) / (Factorial(s) * Math.pow(s, n - s))) * P0;
      }
    } else {
      if (ro === 1) {
        result = P0;
      } else {
        result = ((1 - ro) * Math.pow(ro, n)) / (1 - Math.pow(ro, k + 1));
      }
    }
  } else {
    result = (1 - ro) * Math.pow(ro, n);
  }
  return FixResult(result, 4);
}
// Get Probability that it is more than t units of time in the system (P(Ws)) function
export function GetPWs(
  m: number,
  ro: number,
  t: number,
  l: number,
  s: number,
  P0?: number
) {
  let result = 0;
  if (P0) {
    const FIRST_PART = P0 * Math.pow(l / m, s);
    const SECOND_PART = 1 - Math.pow(Math.E, -1 * m * (s - 1 - (l / m) * t));
    const THIRD_PART = Factorial(s) * (1 - ro) * (s - 1 - l / m);
    result =
      Math.pow(Math.E, -1 * m * t) *
      (1 + (FIRST_PART * SECOND_PART) / THIRD_PART);
  } else {
    result = Math.pow(Math.E, -1 * m * (1 - ro) * t);
  }
  return FixResult(result, 4);
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
// Get Probability that the customer will have to wait (Pw) function
export function GetPw(l: number, m: number, s: number, ro: number, P0: number) {
  const RESULT = (Math.pow(l / m, s) / (Factorial(s) * (1 - ro))) * P0;
  return FixResult(RESULT, 4);
}
// Get Average number of unoccupied stations (US) function
export function GetUS(ro: number, s: number) {
  const RESULT = (1 - ro) * s;
  return FixResult(RESULT, 4);
}
