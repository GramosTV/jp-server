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
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Get('/')
  async findMany(@Request() req) {
    return await this.friendsService.findMany(req.user.id);
  }

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Patch('/acceptFriendRequest/:name')
  async acceptFriendRequest(
    @Request() req,
    @Param('name', new ParseStringMinMaxPipe(3, 25)) name: string,
  ) {
    return await this.friendsService.acceptFriendRequest(req.user.id, name);
  }

  @UseGuards(JwtAuthGuard, StatsSetGuard)
  @Get('/friendRequestsAmount')
  async getFriendRequestsAmount(@Request() req) {
    return await this.friendsService.getFriendRequestsAmount(req.user.id);
  }
}
