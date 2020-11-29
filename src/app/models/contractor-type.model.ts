export interface ContractorType {
  id: number;
  contractor_type: string;
  contractor_type_description: string;
  is_active: boolean;
}

export function sortAlpha(c1: ContractorType, c2: ContractorType) {
  const item1 = c1.contractor_type.toLowerCase(),
    item2 = c2.contractor_type.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
