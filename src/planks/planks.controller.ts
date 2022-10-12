import { Controller, Delete, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StatsSetGuard } from 'src/auth/statsSet.decorator';
import { ParseIntMinMaxPipe } from 'src/pipes/parseIntMinMax.pipe';
import { PlanksService } from './planks.service';

@Controller('planks')
export class PlanksController {}
