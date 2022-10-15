import {
  Controller,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StatsSetGuard } from 'src/auth/statsSet.decorator';
import { ParseStringMinMaxPipe } from 'src/pipes/parseStringMinMax.pipe';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {}
