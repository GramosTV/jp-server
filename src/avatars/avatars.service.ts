import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';

import { Repository } from 'typeorm';
import { Avatar } from './entity/avatar.entity';

@Injectable()
export class AvatarsService {
  constructor(
    @InjectRepository(Avatar) private avatarRepository: Repository<Avatar>,
  ) {}

  async findOne(id: string) {
    return await Avatar.findOneBy({ user: { id } });
  }

  async insertOne(
    id: string,
    body: number,
    eye: number,
    face: number,
    hat: number,
  ) {
    const check = await this.findOne(id);
    if (check) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'You have already created an avatar',
        },
        HttpStatus.CONFLICT,
      );
    }
    const avatar = new Avatar();
    const user = new User();
    user.id = id;
    avatar.body = body;
    avatar.eye = eye;
    avatar.face = face;
    avatar.hat = hat;
    avatar.user = user;
    return await Avatar.insert(avatar);
  }

  async updateOne(
    id: string,
    body: number,
    eye: number,
    face: number,
    hat: number,
  ) {
    const avatar = await this.findOne(id);
    if (!avatar) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: "You don't have an avatar",
        },
        HttpStatus.CONFLICT,
      );
    }
    avatar.body = body;
    avatar.eye = eye;
    avatar.face = face;
    avatar.hat = hat;
    return await Avatar.save(avatar);
  }
}
