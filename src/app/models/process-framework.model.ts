export interface ProcurementFramework {
  id: number;
  procurement_framework: string;
  procurement_framework_description: string;
  is_active: boolean;
}

export function sortAlpha(c1: ProcurementFramework, c2: ProcurementFramework) {
  const item1 = c1.procurement_framework.toLowerCase(),
    item2 = c2.procurement_framework.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}