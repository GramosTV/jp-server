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
}
