import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DaysService } from '../days/days.service';
import { Day } from '../days/entity/day.entity';
import { Repository } from 'typeorm';
import { Plank } from './entity/plank.entity';
import { User } from 'src/users/entity/user.entity';
import { Bool } from 'types';

@Injectable()
export class PlanksService {
  constructor(
    @InjectRepository(Plank) private plankRepository: Repository<Plank>,
    @Inject(forwardRef(() => DaysService))
    private daysService: DaysService,
  ) {}

  async getMany(id: string, plankNumber: number, dayId = '') {
    if (!dayId) {
      return await Plank.find({
        where: { day: { user: { id } } },
      });
    }
  }

  async deleteOne(id: string, numeration: number) {
    const latestDay = await this.daysService.findLatestOne(id);
    if (latestDay.isFinished) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: "You don't have an ongoing day",
        },
        HttpStatus.CONFLICT,
      );
    } else {
      return await Plank.delete({ day: { id: latestDay.id }, numeration });
    }
  }

  async findLatestOne(id: string, dayId: string) {
    const day = await Day.findOne({ where: { user: { id }, id: dayId } });
    if (!day) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Invalid dayId',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return await Plank.findOne({
      where: { day: { id: dayId } },
      order: { numeration: 'DESC' },
    });
  }

  async insertOne(id: string, plankTime: number, caloriesBurnt: number) {
    const latestDay = await this.daysService.findLatestOne(id);
    if (latestDay?.isFinished) {
      const latestPlank = await Plank.findOne({
        where: { day: { id: latestDay.id } },
        order: { numeration: 'DESC' },
      });
      const plank = new Plank();
      if (latestPlank?.numeration === 50) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'You have reached the maximum amount of planks',
          },
          HttpStatus.CONFLICT,
        );
      }
      plank.numeration = latestPlank?.numeration ? ++latestPlank.numeration : 1;
      plank.caloriesBurnt = caloriesBurnt;
      plank.plankTime = plankTime;
      plank.day = latestDay;
      plank.duel = Bool.false;

      return await plank.save();
    } else {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: "You don't have an ongoing day",
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
