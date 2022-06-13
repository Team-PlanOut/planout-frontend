export type Events = {
  id: number;
  host: string | null;
  hostFirstName: string | null;
  hostLastName: string | null;
  name: string | null;
  event_name: string | null;
  date: Date;
  budget: number | null;
  created_at: number | null;
  modified: number | null;
  hostPhoto: any;
};

export type Tasks = {
  id: number;
  description: string | null;
  status: boolean | null;
  points: number | null;
  cost: number | null;
  complete: boolean;
};

export type Users = {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  points: number;
};

export type Friends = {
  friendPhoto: any;
  friendId: string;
  friendFirstName: string | null;
  friendLastName: string | null;
  username: string | null;
  email: string | null;
  photoUrl: any;
};
