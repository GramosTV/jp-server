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
export class PlanksService {}
