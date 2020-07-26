export interface ContractStatusModel {
  id: number;
  contract_status: string;
  status_description: string;
  status_sequence: number;
  in_progress: boolean;
  is_active: boolean;
}
