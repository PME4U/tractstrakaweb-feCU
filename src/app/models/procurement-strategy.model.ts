export interface ProcurementStrategy {
  id: number;
  procurement_strategy: string;
  stratgey_description: string;
  is_active: boolean;
}
export function sortAlphaPS(c1: ProcurementStrategy, c2: ProcurementStrategy) {
  const item1 = c1.procurement_strategy.toLowerCase(),
    item2 = c2.procurement_strategy.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}