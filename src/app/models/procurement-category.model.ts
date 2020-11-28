export interface ProcurementCategory {
  id: number;
  procurement_category: string;
  procurement_category_description: string;
  is_active: boolean;
}
export function sortAlpha(c1: ProcurementCategory, c2: ProcurementCategory) {
  const item1 = c1.procurement_category.toLowerCase(),
    item2 = c2.procurement_category.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
