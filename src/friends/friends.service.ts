import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bool } from 'types';
import { Friend } from './entity/friend.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend) private friendRepository: Repository<Friend>,
    private usersService: UsersService,
  ) {}

  async findMany(id: string) {
    return await Friend.find({
      where: [
        { friendReceived: { id }, accepted: Bool.true },
        { friendInvited: { id }, accepted: Bool.true },
      ],
    });
  }

  async acceptFriendRequest(id: string, name: string) {
    return 'TODO';
  }

  async getFriendRequestsAmount(id: string) {
    return await Friend.countBy({
      friendReceived: { id },
      accepted: Bool.false,
    });
  }

  async checkIfAreFriends(id: string, profileId: string) {
    return await Friend.count({
      where: [
        {
          friendReceived: { id },
          friendInvited: { id: profileId },
          accepted: Bool.true,
        },
        {
          friendReceived: { id: profileId },
          friendInvited: { id },
          accepted: Bool.true,
        },
      ],
    });
  }

  async unfriend(id: string, name: string) {
    const friend = await this.usersService.findOneByName(name);
    if (!friend) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "There's no user with that name",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const relation = await Friend.findOne({
      where: [
        {
          friendReceived: { id },
          friendInvited: { id: friend.id },
          accepted: Bool.true,
        },
        {
          friendReceived: { id: friend.id },
          friendInvited: { id },
          accepted: Bool.true,
        },
      ],
    });
    if (!relation) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: "You're not friends",
        },
        HttpStatus.CONFLICT,
      );
    }
    return await Friend.remove(relation);
  }
}
