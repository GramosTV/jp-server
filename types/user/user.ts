import { Bool } from 'types';
export enum Units {
  Metric = '',
  Imperial = '1',
}

export enum Genders {
  Male = '',
  Female = '1',
}
export enum ProfileStatus {
  Private = '',
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
