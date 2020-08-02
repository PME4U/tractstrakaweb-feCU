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
