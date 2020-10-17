export interface ProductType {
  id: number;
  product_group: any;
  product_type: string;
  product_type_description: string;
  is_active: boolean;
}
export function sortAlpha(c1: ProductType, c2: ProductType) {
  const item1 = c1.product_type.toLowerCase(),
    item2 = c2.product_type.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
