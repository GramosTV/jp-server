import { ParseIntMinMaxPipe } from './../pipes/parseIntMinMax.pipe';
import {
  Controller,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { statsSetGuard } from 'src/auth/statsSet.decorator';
import { UsersService } from './users.service';
import { DecimalPipe } from 'src/pipes/decimal.pipe';
import { Units } from 'types';
import { enumPipe } from 'src/pipes/enum.pipe';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, statsSetGuard)
  @Patch('/changeUnit/:unit')
  async changeUnit(
    @Request() req,
    @Param('unit', new enumPipe(Units))
    unit: Units,
  ) {
    return await this.usersService.changeUnit(req.user.id, unit);
  }

  @UseGuards(JwtAuthGuard, statsSetGuard)
  @Patch('/changeHeight/:height')
  async changeHeight(
    @Request() req,
    @Param('height', new DecimalPipe(1, 999, 2))
    height: number,
  ) {
    return await this.usersService.changeHeight(req.user.id, height);
  }
}
