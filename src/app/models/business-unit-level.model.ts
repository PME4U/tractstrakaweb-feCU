export interface BusinessUnitLevel {
  id: number;
  business_unit_level: string;
  is_active: boolean;
}
export function sortAlpha(c1: BusinessUnitLevel, c2: BusinessUnitLevel) {
  const item1 = c1.business_unit_level.toLowerCase(),
    item2 = c2.business_unit_level.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
