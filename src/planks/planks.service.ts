import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Day } from 'src/days/entity/day.entity';
import { Repository } from 'typeorm';
import { Plank } from './entity/plank.entity';

@Injectable()
export class PlanksService {
  constructor(
    @InjectRepository(Plank) private dayRepository: Repository<Plank>,
  ) {}

  async getMany(id: string, plankNumber: number, dayId = '') {
    if (!dayId) {
      return await Plank.find({
        where: { day: { user: { id } } },
      });
    }
  }
}
