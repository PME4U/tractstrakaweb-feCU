export interface ProcessStatusModel {
  id: number;
  process_status: string;
  status_description: string;
  process_sequence: number;
  in_progress: boolean;
  is_active: boolean;
}
