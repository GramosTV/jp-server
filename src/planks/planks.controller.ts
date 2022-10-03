import {
  Controller,
  Delete,
  Get,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StatsSetGuard } from 'src/auth/statsSet.decorator';
import { ParseIntMinMaxPipe } from 'src/pipes/parseIntMinMax.pipe';
import { PlanksService } from './planks.service';

@Controller('planks')
export class PlanksController {
  constructor(private planksService: PlanksService) {}

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Delete('/:numeration')
  async findMany(
    @Request() req,
    @Param('numeration', new ParseIntMinMaxPipe(1, 65535)) numeration: number,
  ) {
    return await this.planksService.deleteOne(req.user.id, numeration);
  }

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Get('/latest/:dayId')
  async getLatest(@Request() req, @Param('dayId') dayId: string) {
    return await this.planksService.getLatest(req.user.id, dayId);
  }
}
