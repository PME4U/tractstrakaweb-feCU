export interface ContractStatus {
  id: number;
  contract_status: string;
  status_description: string;
  status_sequence: number;
  in_progress: boolean;
  is_current: boolean;
  is_active: boolean;
}
export function sortStatusBySeqNo(c1: ContractStatus, c2: ContractStatus) {
  return c1.status_sequence - c2.status_sequence;
}
