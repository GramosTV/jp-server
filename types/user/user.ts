import { Bool } from 'types';
export enum Units {
  Metric,
  Imperial,
}

export enum Genders {
  Male,
  Female,
}
export enum ProfileStatus {
  Private,
  FriendsOnly,
  Public,
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
