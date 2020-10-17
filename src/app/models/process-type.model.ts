export interface ProcessType {
  id: number;
  process_type: string;
  type_description: string;
  is_active: boolean;
}

export function sortAlpha(c1: ProcessType, c2: ProcessType) {
  const item1 = c1.process_type.toLowerCase(),
    item2 = c2.process_type.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}