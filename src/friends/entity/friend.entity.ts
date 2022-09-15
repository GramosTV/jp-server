import { Day } from 'src/days/entity/day.entity';
import { User } from 'src/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bool } from 'types';

@Entity()
export class Friend extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.friendsReceived, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  friendReceived: User;

  @ManyToOne(() => User, (user) => user.friendsInvited, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  friendInvited: User;

  @Column({
    type: 'enum',
    enum: Bool,
  })
  accepted: Bool;
}
