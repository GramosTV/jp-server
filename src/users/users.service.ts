import { User } from './entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async findOne(email: string): Promise<User | undefined> {
    return await User.findOneBy({ email });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return await User.findOneBy({ id });
  }
  async findOneByName(name: string): Promise<User | undefined> {
    return await User.findOneBy({ name });
  }
}
