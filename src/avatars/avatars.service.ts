import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Avatar } from './entity/avatar.entity';

@Injectable()
export class AvatarsService {
  constructor(
    @InjectRepository(Avatar) private avatarRepository: Repository<Avatar>,
    private usersService: UsersService,
  ) {}

  async findOne(id: string) {
    return await Avatar.findOne({ where: { user: { id } } });
  }
}
