class ActiveMetricsManager {
  currentMetrics = {
    revenueGrowthRate: null,
    taxRate: null,
    wacc: null,
    longTermGrowthRate: null,
  };

  constructor() {}

  setMetric(metricName, value) {
    this.currentMetrics[metricName] = value;
  }

  getMetrics() {}
}

const activeMetrics = new ActiveMetricsManager();

// Exports to revenue-and-expenses
export { activeMetrics };
