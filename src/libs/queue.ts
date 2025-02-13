// Queue Libraries Requirements
import { Factorial, FixResult } from "./general";
// Get System Utilization Factor
export function GetSystemUtilizationFactor(
  model: number,
  arrivalDistributionRate: number,
  averageServiceRate: number,
  decimals: number,
  numberOfServers?: number
) {
  // If M/M/s:FIFO/∞/∞ use the number of servers sent, otherwise set it to 1
  const SERVERS_AMOUNT = model === 2 && numberOfServers ? numberOfServers : 1;
  const RESULT =
    arrivalDistributionRate / (averageServiceRate * SERVERS_AMOUNT);
  return FixResult(RESULT, decimals);
}
// Get Probability of 0 clients in the system function
export function GetProbabilityOfZeroClientsinSystem(
  model: number,
  arrivalDistributionRate: number,
  averageServiceRate: number,
  sysUtilFactor: number,
  decimals: number,
  numberOfServers?: number,
  queueSize?: number
) {
  let result = 0;
  // If M/M/1:FIFO/K/∞ use the queue size, if not, means that is M/M/s:FIFO/∞/∞ model
  if (model === 3 && queueSize !== undefined) {
    if (sysUtilFactor === 1) {
      result = 1 / (queueSize + 1);
    } else {
      result =
        (1 - sysUtilFactor) / (1 - Math.pow(sysUtilFactor, queueSize + 1));
    }
  } else if (model === 2 && numberOfServers !== undefined) {
    let sum = 0;
    for (let i = 0; i < numberOfServers; i++) {
      sum =
        sum +
        Math.pow(arrivalDistributionRate / averageServiceRate, i) /
          Factorial(i);
    }
    const FIRST_PART =
      Math.pow(arrivalDistributionRate / averageServiceRate, numberOfServers) /
      Factorial(numberOfServers);
    const SECOND_PART = 1 / (1 - sysUtilFactor);
    result = 1 / (FIRST_PART * SECOND_PART + sum);
  }
  return FixResult(result, decimals);
}
// Get Expected number of customers in queue function
export function GetExpectedNumberOfClientsInQueue(
  model: number,
  arrivalDistributionRate: number,
  averageServiceRate: number,
  sysUtilFactor: number,
  decimals: number,
  numberOfServers?: number,
  queueSize?: number,
  probZeroClientsSys?: number
) {
  let result = 0;
  // If probZeroClientsSys exists, it is not M/M/1:FIFO/∞/∞
  if (probZeroClientsSys !== undefined) {
    // If numberOfServers exists, it is M/M/s:FIFO/∞/∞
    if (model === 2 && numberOfServers !== undefined) {
      const FIRST_PART =
        Math.pow(
          arrivalDistributionRate / averageServiceRate,
          numberOfServers
        ) * sysUtilFactor;
      const SECOND_PART =
        Factorial(numberOfServers) * Math.pow(1 - sysUtilFactor, 2);
      result = (FIRST_PART / SECOND_PART) * probZeroClientsSys;
    }
    // If queueSize exists, it is M/M/1:FIFO/K/∞
    else if (model === 3 && queueSize !== undefined) {
      result =
        GetExpectedNumberOfClientsInSystem(
          arrivalDistributionRate,
          averageServiceRate,
          sysUtilFactor,
          decimals,
          queueSize
        ) -
        (1 - probZeroClientsSys);
    }
  }
  // If probZeroClientsSys was not submitted, it is M/M/1:FIFO/∞/∞
  else {
    result =
      Math.pow(arrivalDistributionRate, 2) /
      (averageServiceRate * (averageServiceRate - arrivalDistributionRate));
  }
  return FixResult(result, decimals);
}
// Get Expected number of clients in the system Function
export function GetExpectedNumberOfClientsInSystem(
  arrivalDistributionRate: number,
  averageServiceRate: number,
  sysUtilFactor: number,
  decimals: number,
  queueSize?: number,
  clientsQueue?: number
) {
  let result = 0;
  // If clientsQueue was submitted, it is the M/M/s:FIFO/∞/∞ model
  if (clientsQueue) {
    result = clientsQueue + arrivalDistributionRate / averageServiceRate;
  }
  // If queueSize was submitted, it is the M/M/1:FIFO/K/∞ model
  else if (queueSize !== undefined && queueSize !== 0) {
    if (sysUtilFactor === 1) {
      result = queueSize / 2;
    } else {
      const FIRST_PART = sysUtilFactor / (1 - sysUtilFactor);
      const SECOND_PART =
        (queueSize + 1) * Math.pow(sysUtilFactor, queueSize + 1);
      const THIRD_PART = 1 - Math.pow(sysUtilFactor, queueSize + 1);
      result = FIRST_PART - SECOND_PART / THIRD_PART;
    }
  }
  // Else, it is the M/M/1:FIFO/∞/∞ model
  else {
    result =
      arrivalDistributionRate / (averageServiceRate - arrivalDistributionRate);
  }
  return FixResult(result, decimals);
}
// Get Probability of n clients in the system function
export function GetProbabilityOfNClientsInSystem(
  model: number,
  sysUtilFactor: number,
  numberOfClients: number,
  arrivalDistributionRate: number,
  averageServiceRate: number,
  decimals: number,
  numberOfServers?: number,
  queueSize?: number,
  probZeroClientsSys?: number
) {
  let result = 0;
  // If probZeroClientsSys was submitted, it is not the M/M/1:FIFO/∞/∞ model
  if (probZeroClientsSys !== undefined) {
    // If numberOfClients is 0, set it as probZeroClientsSys
    if (numberOfClients === 0) {
      result = probZeroClientsSys;
    }
    // If numberOfClients is not 0, check if is the M/M/s:FIFO/∞/∞ model
    else if (model === 2 && numberOfServers) {
      if (numberOfClients <= numberOfServers) {
        result =
          (Math.pow(
            arrivalDistributionRate / averageServiceRate,
            numberOfClients
          ) /
            Factorial(numberOfClients)) *
          probZeroClientsSys;
      } else {
        result =
          (Math.pow(
            arrivalDistributionRate / averageServiceRate,
            numberOfClients
          ) /
            (Factorial(numberOfServers) *
              Math.pow(numberOfServers, numberOfClients - numberOfServers))) *
          probZeroClientsSys;
      }
    }
    // Check if it is the M/M/1:FIFO/K/∞ model
    else if (model === 3 && queueSize) {
      if (sysUtilFactor === 1) {
        result = probZeroClientsSys;
      } else {
        result =
          ((1 - sysUtilFactor) * Math.pow(sysUtilFactor, numberOfClients)) /
          (1 - Math.pow(sysUtilFactor, queueSize + 1));
      }
    }
  }
  // If probZeroClientsSys is undefined, it is the M/M/1:FIFO/∞/∞ model
  else {
    result = (1 - sysUtilFactor) * Math.pow(sysUtilFactor, numberOfClients);
  }
  return FixResult(result, decimals);
}
// Get Expected time of clients in queue function
export function GetExpectedTimeOfClientsInQueue(
  arrivalDistributionRate: number,
  averageServiceRate: number,
  decimals: number,
  clientsQueue?: number,
  probQueueClientsSys?: number
) {
  let result = 0;
  // If clientsQueue is not undefined, it is not the M/M/1:FIFO/∞/∞ model
  if (clientsQueue !== undefined) {
    // If probQueueClientsSys is not undefined, it is the M/M/1:FIFO/K/∞ model
    if (probQueueClientsSys !== undefined) {
      result =
        clientsQueue / (arrivalDistributionRate * (1 - probQueueClientsSys));
    }
    // If probQueueClientsSys is undefined, it is the M/M/s:FIFO/∞/∞ model
    else {
      result = clientsQueue / arrivalDistributionRate;
    }
  }
  // If clientsQueue is undefined, it is the M/M/1:FIFO/∞/∞ model
  else {
    result =
      arrivalDistributionRate /
      (averageServiceRate * (averageServiceRate - arrivalDistributionRate));
  }
  return FixResult(result, decimals);
}
// Get Expected time of Clients in the system function
export function GetExpectedTimeOfClientsInSystem(
  arrivalDistributionRate: number,
  averageServiceRate: number,
  decimals: number,
  timeClientsQueue?: number,
  thirdModel?: { clientsSys: number; probQueueClientsSys: number }
) {
  let result = 0;
  // If timeClientsQueue is was submitted, it is the M/M/s:FIFO/∞/∞ model
  if (timeClientsQueue) {
    result = timeClientsQueue + 1 / averageServiceRate;
  }
  // If thirdModel is was submitted, it is the M/M/1:FIFO/K/∞ model
  else if (thirdModel) {
    result =
      thirdModel.clientsSys /
      (arrivalDistributionRate * (1 - thirdModel.probQueueClientsSys));
  }
  // Else, it is the M/M/1:FIFO/∞/∞ model
  else {
    result = 1 / (averageServiceRate - arrivalDistributionRate);
  }
  return FixResult(result, decimals);
}
// Get Probability that it is more than t units of time in the system function
export function GetProbabilityThatItsMoreThanTTimeInSystem(
  arrivalDistributionRate: number,
  averageServiceRate: number,
  sysUtilFactor: number,
  timeUnits: number,
  numberOfServers: number,
  decimals: number,
  probZeroClientsSys?: number
) {
  let result = 0;
  // If probZeroClientsSys was submitted, it is the M/M/s:FIFO/∞/∞ model
  if (probZeroClientsSys !== undefined) {
    const FIRST_PART =
      probZeroClientsSys *
      Math.pow(arrivalDistributionRate / averageServiceRate, numberOfServers);
    const SECOND_PART =
      1 -
      Math.pow(
        Math.E,
        -1 *
          averageServiceRate *
          (numberOfServers -
            1 -
            (arrivalDistributionRate / averageServiceRate) * timeUnits)
      );
    const THIRD_PART =
      Factorial(numberOfServers) *
      (1 - sysUtilFactor) *
      (numberOfServers - 1 - arrivalDistributionRate / averageServiceRate);
    result =
      Math.pow(Math.E, -1 * averageServiceRate * timeUnits) *
      (1 + (FIRST_PART * SECOND_PART) / THIRD_PART);
  }
  // If probZeroClientsSys was not submitted, it is the M/M/1:FIFO/∞/∞ model
  else {
    result = Math.pow(
      Math.E,
      -1 * averageServiceRate * (1 - sysUtilFactor) * timeUnits
    );
  }
  return FixResult(result, decimals);
}
// Get Probability that it is more than t units of time in queue function
export function GetProbabilityThatItsMoreThanTTimeInQueue(
  averageServiceRate: number,
  sysUtilFactor: number,
  timeUnits: number,
  decimals: number
) {
  const RESULT =
    sysUtilFactor *
    Math.pow(Math.E, -1 * averageServiceRate * (1 - sysUtilFactor) * timeUnits);
  return FixResult(RESULT, decimals);
}
// Get Probability of having a queue of more than n clients function
export function GetProbabilityOfHavingQueueOfMoreThanNClients(
  sysUtilFactor: number,
  numberOfClients: number,
  decimals: number
) {
  const RESULT = Math.pow(sysUtilFactor, numberOfClients + 1);
  return FixResult(RESULT, decimals);
}
// Get Probability that the client will have to wait function
export function GetProbabilityClientWillHaveToWait(
  arrivalDistributionRate: number,
  averageServiceRate: number,
  numberOfServers: number,
  sysUtilFactor: number,
  probZeroClientsSys: number,
  decimals: number
) {
  const RESULT =
    (Math.pow(arrivalDistributionRate / averageServiceRate, numberOfServers) /
      (Factorial(numberOfServers) * (1 - sysUtilFactor))) *
    probZeroClientsSys;
  return FixResult(RESULT, decimals);
}
// Get Average number of unoccupied servers function
export function GetAverageUnoccupiedServers(
  sysUtilFactor: number,
  numberOfServers: number,
  decimals: number
) {
  const RESULT = (1 - sysUtilFactor) * numberOfServers;
  return FixResult(RESULT, decimals);
}
