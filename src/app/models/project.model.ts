export interface Project {
  id: number;
  project_title: string;
  project_description: string;
  project_status: string;
  project_website: string;
  project_notes: string;
}
export function sortAlpha(c1: Project, c2: Project) {
  const item1 = c1.project_title.toLowerCase(),
    item2 = c2.project_title.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}
