export interface ProductGroup {
  id: number;
  product_group: string;
  product_group_description: string;
  is_active: boolean;
}
export function sortAlphaPG(c1: ProductGroup, c2: ProductGroup) {
  const item1 = c1.product_group.toLowerCase(),
    item2 = c2.product_group.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
