import { User } from './entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Units } from 'types';
import { CreateUserDto } from './dto/create-user.dto';

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
  
  async changeUnit(id: string, unit: Units) {
    return (await User.update(id, { unit })).affected;
  }

  async changeHeight(id: string, height: number) {
    return (await User.update(id, { height })).affected;
  }

  async findOneByName(name: string): Promise<User | undefined> {
    return await User.findOneBy({ name });
  }

  async addUser(createUserDto: CreateUserDto) {
    return await User.insert(createUserDto);
  }
}
