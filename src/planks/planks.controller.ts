import { Controller, Delete, Param, Request, UseGuards } from '@nestjs/common';
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
    return this.planksService.deleteOne(req.user.id, numeration);
  }
}
