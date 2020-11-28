export interface TaxCode {
  id: number;
  tax_code: string;
  tax_code_description: string;
  tax_percentage: number;
  is_active: boolean;
}
export function sortAlpha(c1: TaxCode, c2: TaxCode) {
  const item1 = c1.tax_code.toLowerCase(),
    item2 = c2.tax_code.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
