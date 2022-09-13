import { Bool, User } from 'types';

export interface Day {
  id: string;
  numeration: number;
  weight: number;
  caloriesBurnt: number;
  bestPlankTime: number;
  user: User[];
  isFinished: Bool;
  dateOfBirth: Date;
}
