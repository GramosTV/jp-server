import { Avatar } from 'src/avatars/entity/avatar.entity';
import { Day } from 'src/days/entity/day.entity';
import { Friend } from 'src/friends/entity/friend.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bool, Genders, ProfileStatus, Units } from 'types';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    width: 255,
    type: 'text',
  })
  email: string;

  @Column({
    width: 255,
    type: 'text',
  })
  password: string;

  @Column({
    width: 25,
    type: 'varchar',
    nullable: true,
  })
  name: string | null;

  @Column({
    type: 'enum',
    enum: Units,
    nullable: true,
  })
  unit: Units | null;

  @Column({
    type: 'date',
    nullable: true,
  })
  dateOfBirth: Date | null;

  @Column({
    type: 'enum',
    enum: Genders,
    nullable: true,
  })
  gender: Genders | null;

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 5,
    scale: 2,
    unsigned: true,
  })
  height: number | null;

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 32,
    scale: 29,
    unsigned: true,
  })
  weight: number | null;

  @Column({
    type: 'enum',
    enum: Bool,
  })
  statsSet: Bool;

  @Column({
    type: 'enum',
    enum: Bool,
  })
  emailVerified: Bool;

  @Column({
    type: 'enum',
    enum: Bool,
  })
  isGoogleAccount: Bool;

  @Column({
    type: 'enum',
    enum: ProfileStatus,
  })
  profileStatus: ProfileStatus;

  @OneToMany(() => Day, (day) => day.user)
  days: Day[];

  @OneToOne(() => Avatar, (avatar) => avatar.user)
  avatar: Avatar;

  @OneToMany(() => Friend, (friend) => friend.friendReceived)
  friendsReceived: Friend[];

  @OneToMany(() => Friend, (friend) => friend.friendInvited)
  friendsInvited: Friend[];
}
