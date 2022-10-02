import { PlanksService } from './../planks/planks.service';
import {
  CACHE_MANAGER,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';
import {
  Between,
  LessThan,
  RemoveOptions,
  Repository,
  SaveOptions,
} from 'typeorm';
import { Bool, Genders } from 'types';
import { Day } from './entity/day.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class DaysService {
  constructor(
    @InjectRepository(Day) private dayRepository: Repository<Day>,
    private usersService: UsersService,
    @Inject(forwardRef(() => PlanksService))
    private planksService: PlanksService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    const res = await Day.findOne({
      where: { user: { id } },
      order: { numeration: 'DESC' },
    });
    return res;
  }

  async insertOne(id: string) {
    const latestDay = await this.findLatestOne(id);
    console.log(latestDay);
    if (!latestDay[0]?.isFinished) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "You haven't finished your previous day",
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      new Date().getTime() - new Date(latestDay[0]?.createdAt).getTime() <
      86400000
    ) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'A new day has not begun yet',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const numeration = ++latestDay[0].numeration || 1;
    const { weight, statsSet } = await this.usersService.findOneById(id);
    if (!statsSet) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "You haven't set your stats",
        },
        HttpStatus.BAD_REQUEST,
      );
    }

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
    //IN PROGRESS
  }

  async getAveragePlankTime(gender: Genders) {
    const value = await this.cacheManager.get(
      `average${Genders[gender]}PlankTime`,
    );
    if (value) {
      return value;
    } else {
      const days = await Day.find({ where: { user: { gender } } });
      const bestPlankTimes = days.map((day) => {
        return day.bestPlankTime;
      });
      const sum = bestPlankTimes.reduce((a, b) => a + b, 0);
      const avg = sum / bestPlankTimes.length || 0;
      const result = Math.round(avg);
      await this.cacheManager.set(
        `average${Genders[gender]}PlankTime`,
        result,
        { ttl: 43200 },
      );
      return result;
    }
  }
}
