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

export type Users = {
  id: string,
  email: string,
  username: string,
  first_name: string,
  last_name: string,
  points: number,
}

export type Friends = {
  friendId: string,
  friendFirstName: string,
  friendLastName: string,
  username: string,
  email: string
}
