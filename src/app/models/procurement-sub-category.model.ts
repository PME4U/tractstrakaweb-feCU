export interface ProcurementSubCategory {
  id: number;
  procurement_sub_category: string;
  procurement_category: any;
  procurement_sub_category_description: string;
  is_active: boolean;
}
export function sortAlphaSC(
  c1: ProcurementSubCategory,
  c2: ProcurementSubCategory
) {
  const item1 = c1.procurement_sub_category.toLowerCase(),
    item2 = c2.procurement_sub_category.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
