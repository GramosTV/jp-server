import { User } from 'src/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Avatar extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.avatar, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  body: number;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  eye: number;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  face: number;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  hat: number;
}
