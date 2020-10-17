export interface ProcurementMethod {
  id: number;
  procurement_strategy: any;
  procurement_method: string;
  method_description: string;
  is_active: boolean;
}
export function sortAlpha(c1: ProcurementMethod, c2: ProcurementMethod) {
  const item1 = c1.procurement_method.toLowerCase(),
    item2 = c2.procurement_method.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
