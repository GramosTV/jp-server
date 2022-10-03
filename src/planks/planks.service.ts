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
          status: HttpStatus.BAD_REQUEST,
          error: "You don't have an ongoing day",
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return await Plank.delete({ day: { id: latestDay.id }, numeration });
    }
  }

  async getLatest(id: string, dayId: string) {
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
}
