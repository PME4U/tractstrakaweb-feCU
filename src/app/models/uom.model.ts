export interface UnitsOfMeasure {
  id: number;
  unit_of_measure: string;
  uom_description: string;
  is_active: boolean;
}
export function sortAlpha(c1: UnitsOfMeasure, c2: UnitsOfMeasure) {
  const item1 = c1.unit_of_measure.toLowerCase(),
    item2 = c2.unit_of_measure.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
