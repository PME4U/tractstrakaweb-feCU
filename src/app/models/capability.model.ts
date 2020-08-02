export interface Capability {
  id: number;
  capability: string;
  description: string;
  is_active: boolean;
}
export function sortAlpha(c1: Capability, c2: Capability) {
  const item1 = c1.capability.toLowerCase(),
    item2 = c2.capability.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
