export interface Complexity {
  id: number;
  complexity_classification: string;
  complexity_description: string;
  is_active: boolean;
}
export function sortAlpha(c1: Complexity, c2: Complexity) {
  const item1 = c1.complexity_classification.toLowerCase(),
    item2 = c2.complexity_classification.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
