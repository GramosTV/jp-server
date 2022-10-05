import { Bool } from 'types';
export enum Units {
  Metric = '0',
  Imperial = '1',
}

export enum Genders {
  Male = '0',
  Female = '1',
}
export enum ProfileStatus {
  Private = '0',
  FriendsOnly = '1',
  Public = '2',
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string | null;
  unit: Units | null;
  dateOfBirth: Date | null;
  gender: Genders | null;
  height: number | null;
  weight: number | null;
  statsSet: Bool;
  emailVerified: Bool;
  isGoogleAccount: Bool;
  profileStatus: ProfileStatus;
}
