export interface ProcessStatus {
  id: number;
  process_status: string;
  status_description: string;
  process_sequence: number;
  in_progress: boolean;
  is_active: boolean;
}

export function sortStatusBySeqNo(c1: ProcessStatus, c2: ProcessStatus) {
  return c1.process_sequence - c2.process_sequence;
}

export function sortAlpha(c1: ProcessStatus, c2: ProcessStatus) {
  const item1 = c1.process_status.toLowerCase(),
    item2 = c2.process_status.toLowerCase();
  if (item1 < item2) {
    // sort string ascending
    return -1;
  }
  if (item1 > item2) {
    return 1;
  }
  return 0; // default return value (no sorting)
}