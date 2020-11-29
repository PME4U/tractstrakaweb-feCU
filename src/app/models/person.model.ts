export interface Person {
  id: number;
  first_name: string;
  middle_initial: string;
  last_name: string;
  full_name: string;
  profile_pic: string;
  about_me: string;
  create_date: Date;
}

export function sortAlphaFN(c1: Person, c2: Person) {
  const item1 = c1.first_name.toLowerCase(),
    item2 = c2.first_name.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
