
export type Sport = string;

export interface Player {
  id: string;
  name: string;
  age: number;
  gender: string;
  contact: string;
  sport: Sport;
  level: string;
  registered: boolean;
  attendance?: boolean;
}

export interface UserRole {
  isAdmin: boolean;
}
