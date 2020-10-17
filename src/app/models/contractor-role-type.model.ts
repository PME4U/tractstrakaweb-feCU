export interface ContractorRoleType {
  id: number;
  contractor_role_type: string;
  is_active: boolean;
}

export function sortAlpha(c1: ContractorRoleType, c2: ContractorRoleType) {
  const item1 = c1.contractor_role_type.toLowerCase(),
    item2 = c2.contractor_role_type.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
