import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StatsSetGuard } from 'src/auth/statsSet.decorator';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Get('/')
  async findMany(@Request() req) {
    return await this.friendsService.findMany(req.user.id);
  }
}
