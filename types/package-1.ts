export type Events = {
  id: number;
  host: string;
  name: string;
  event_name: string;
  date: Date;
  budget: number;
  created_at: number;
  modified: number;
};

export type Tasks = {
  id: number;
  description: string;
  status: boolean;
  points: number;
  cost: number;
  complete: boolean;
};
