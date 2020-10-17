export interface RiskClassification {
  id: number;
  risk_classification: string;
  risk_description: string;
  is_active: boolean;
}
export function sortAlpha(c1: RiskClassification, c2: RiskClassification) {
  const item1 = c1.risk_classification.toLowerCase(),
    item2 = c2.risk_classification.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
