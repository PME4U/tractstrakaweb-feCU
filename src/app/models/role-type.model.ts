export interface RoleType {
  id: number;
  role_in_process: string;
  used_in_forward_plans: boolean;
  used_in_invitation_processes: boolean;
  used_in_contracts: boolean;
  is_active: boolean;
}
export function sortAlpha(c1: RoleType, c2: RoleType) {
  const item1 = c1.role_in_process.toLowerCase(),
    item2 = c2.role_in_process.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
