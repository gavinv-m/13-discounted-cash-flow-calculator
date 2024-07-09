// Exports to wacc-manager.js
export default function calculateEquityCost(riskFreeRate, marketReturn, beta) {
  return riskFreeRate + beta * (marketReturn - riskFreeRate);
}
