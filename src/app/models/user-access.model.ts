export interface UserAccessModel {
  id: number;
  email: string;
  is_active: boolean;
  date_added: Date;
  last_logged_in: Date;
  user_type: any;
  team: any;
  companies: string;
  forward_plans: string;
  processes: string;
  contracts: string;
  purchase_orders: string;
  tasks: string;
  people: string;
  system_params: string;
  user_admin: string;
}
