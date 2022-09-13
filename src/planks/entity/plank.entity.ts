import { Day } from 'src/days/entity/day.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bool } from 'types';

@Entity()
export class Plank extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Day, (day) => day.planks, {
    cascade: true,
  })
  day: Day;

  @Column({
    width: 8,
    type: 'mediumint',
    unsigned: true,
  })
  plankTime: number;

  @Column({
    width: 5,
    type: 'smallint',
    unsigned: true,
  })
  caloriesBurnt: number;

  @Column({
    width: 3,
    type: 'tinyint',
    unsigned: true,
  })
  numeration: number;

  @Column({
    type: 'enum',
    enum: Bool,
  })
  duel: Bool;
}
