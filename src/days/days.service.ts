import { PlanksService } from './../planks/planks.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import {
  Between,
  LessThan,
  RemoveOptions,
  Repository,
  SaveOptions,
} from 'typeorm';
import { Bool } from 'types';
import { Day } from './entity/day.entity';

@Injectable()
export class DaysService {
  constructor(
    @InjectRepository(Day) private dayRepository: Repository<Day>,
    private usersService: UsersService,
    private planksService: PlanksService,
  ) {}

  async findMany(id: string, numeration: number) {
    const res = await Day.find({
      where: { user: { id }, numeration: LessThan(numeration) },
      order: { numeration: 'DESC' },
      take: 10,
    });
    return res;
  }

  async findOne(id: string, numeration: number) {
    const res = await Day.findOneBy({
      user: { id },
      numeration: numeration,
    });
    return res;
  }

  async findLatestOne(id: string) {
    const res = await Day.find({
      where: { user: { id } },
      order: { numeration: 'DESC' },
      take: 1,
    });
    return res;
  }

  async InsertOne(id: string) {
    const res = await Day.find({
      where: { user: { id } },
      order: { numeration: 'DESC' },
      take: 1,
    });
    return res;
  }

  async insertOne(id: string) {
    const latestDay = await this.findLatestOne(id);
    console.log(latestDay);
    if (!latestDay[0]?.isFinished) {
      return "You haven't finished your previous day";
    }
    if (
      new Date().getTime() - new Date(latestDay[0]?.createdAt).getTime() <
      86400000
    ) {
      return 'A new day has not begun yet';
    }

    const numeration = ++latestDay[0].numeration || 1;
    const { weight, statsSet } = await this.usersService.findOneById(id);
    if (!statsSet) {
      return "You haven't set your stats";
    }
    //Create stats set guard decorator TO DO

    const day = new Day();
    const user = new User();
    user.id = id;

    day.numeration = numeration;
    day.weight = weight;
    day.caloriesBurnt = 0;
    day.bestPlankTime = 0;
    day.user = user;
    day.isFinished = Bool.false;
    day.createdAt = new Date();

    await day.save();
    return numeration;
  }

  async finishDay(id: string, weight: number, finish: number) {
    const day = await this.findLatestOne(id);
    const planks = await this.planksService.getMany(id, 65535);
    return planks;
  }
}
