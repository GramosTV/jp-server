import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ParseIntMinMaxPipe } from 'src/pipes/parseIntMinMax.pipe';
import { DaysService } from './days.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StatsSetGuard } from 'src/auth/statsSet.decorator';
import { Genders } from 'types';
import { enumPipe } from 'src/pipes/enum.pipe';
@Controller('days')
export class DaysController {
  constructor(private daysService: DaysService) {}

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Get('/many/:numeration')
  async findMany(
    @Request() req,
    @Param('numeration', new ParseIntMinMaxPipe(2, 65535)) numeration: number,
  ) {
    return this.daysService.findMany(req.user.id, numeration);
  }

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Get('/single/:numeration')
  async findOne(
    @Request() req,
    @Param('numeration', new ParseIntMinMaxPipe(1, 65535)) numeration: number,
  ) {
    return this.daysService.findOne(req.user.id, numeration);
  }

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Get('/latest')
  async findLatestOne(@Request() req) {
    return this.daysService.findLatestOne(req.user.id);
  }

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Post('/')
  async InsertOne(@Request() req) {
    const res = await this.daysService.insertOne(req.user.id);
    return res;
  }

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Patch('/:weight')
  async finishDay(
    @Request() req,
    @Param('weight', new ParseIntMinMaxPipe(1, 65535)) weight: number, //CUSTOM PIPE TODO
  ) {
    const res = await this.daysService.finishDay(req.user.id, weight, 1);
    return res;
    //IN PROGRESS
  }

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Get('/averagePlankTime/:gender')
  async getAveragePlankTime(
    @Param('gender', new enumPipe(Genders))
    gender: Genders,
  ) {
    return this.daysService.getAveragePlankTime(gender);
  }
}
