export interface Team {
  id: number;
  team: string;
  description: string;
  is_active: boolean;
}
export function sortAlpha(c1: Team, c2: Team) {
  const item1 = c1.team.toLowerCase(),
    item2 = c2.team.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
