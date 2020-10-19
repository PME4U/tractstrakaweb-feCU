export interface BusinessUnit {
  id: number;
  business_unit_level: any;
  business_unit_name: string;
  parent_business_unit: any;
  business_unit_description: string;
  is_active: boolean;
}
export function sortAlphaBU(c1: BusinessUnit, c2: BusinessUnit) {
  const item1 = c1.business_unit_name.toLowerCase(),
    item2 = c2.business_unit_name.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
