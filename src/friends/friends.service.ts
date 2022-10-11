import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bool } from 'types';
import { Friend } from './entity/friend.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend) private friendRepository: Repository<Friend>,
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
}
