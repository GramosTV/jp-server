import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, Repository } from 'typeorm';
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
}
