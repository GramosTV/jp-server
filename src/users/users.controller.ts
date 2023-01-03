import { MailService } from './../mail/mail.service';
import { ParseIntMinMaxPipe } from './../pipes/parseIntMinMax.pipe';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StatsSetGuard } from 'src/auth/statsSet.decorator';
import { UsersService } from './users.service';
import { DecimalPipe } from 'src/pipes/decimal.pipe';
import { Units } from 'types';
import { enumPipe } from 'src/pipes/enum.pipe';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Patch('/changeUnit/:unit')
  async changeUnit(
    @Request() req,
    @Param('unit', new enumPipe(Units))
    unit: Units,
  ) {
    return await this.usersService.changeUnit(req.user.id, unit);
  }

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Patch('/changeHeight/:height')
  async changeHeight(
    @Request() req,
    @Param('height', new DecimalPipe(1, 999, 2))
    height: number,
  ) {
    return await this.usersService.changeHeight(req.user.id, height);
  }

  @Post('/')
  async addUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.addUser(createUserDto);
  }

  @Patch('/emailVerification/:token')
  async verifyMail(@Param('token') token: string) {
    return await this.usersService.verifyMail(token);
  }
}
