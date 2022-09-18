import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, RemoveOptions, Repository, SaveOptions } from 'typeorm';
import { Bool } from 'types';
import { Day } from './entity/day.entity';

@Injectable()
export class DaysService {
  constructor(@InjectRepository(Day) private userRepository: Repository<Day>) {}

  async findMany(id: string, numeration: number) {
    const res = await Day.find({
      where: { user: { id: id }, numeration: LessThan(numeration) },
      order: { numeration: 'DESC' },
      take: 10,
    });
    return res;
  }

  async findOne(id: string, numeration: number) {
    const res = await Day.findOneBy({
      user: { id: id },
      numeration: numeration,
    });
    return res;
  }

  async findLatestOne(id: string) {
    const res = await Day.find({
      where: { user: { id: id } },
      order: { numeration: 'DESC' },
      take: 1,
    });
    return res;
  }

//   async addOne(id: string) {
//     const latestDay = await this.findLatestOne(id);
//     if (latestDay[0]?.isFinished === Bool.false) {
//       return "You haven't finished your previous day";
//       //CUSTOM ERROR TODO
//     }
//     if (
//       new Date().getTime() - new Date(latestDay[0]?.createdAt).getTime() <
//       86400000
//     ) {
//       return 'A new day has not begun yet';
//     }
//   }
// }

