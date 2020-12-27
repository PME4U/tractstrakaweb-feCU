export interface User {
  id: number;
  email: string;
  user_type: string;
  person: any;
  team: string;
  companies: string;
  forward_plans: string;
  processes: string;
  contracts: string;
  purchase_orders: string;
  tasks: string;
  people: string;
  system_params: string;
  user_admin: string;
  tokens: {
    access?: string;
    refresh?: string;
  };
}
