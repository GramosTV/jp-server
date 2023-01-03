import { jwtConstants } from './../auth/constants';
import { JwtService } from '@nestjs/jwt';
import { User } from './entity/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bool, Units } from 'types';
import { CreateUserDto } from './dto/create-user.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private mailService: MailService,
    private jwtService: JwtService,
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
    const emailCheck = await User.findOneBy({ email: createUserDto.email });
    if (emailCheck) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'This email is already taken',
        },
        HttpStatus.CONFLICT,
      );
    }
    const nameCheck = await User.findOneBy({ name: createUserDto.name });
    if (nameCheck) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'This name is already taken',
        },
        HttpStatus.CONFLICT,
      );
    }

    const emailToken = this.jwtService.sign({ email: createUserDto.email });
    this.mailService.sendUserConfirmation(createUserDto.email, emailToken);
    console.log(emailToken);
    return await User.insert(createUserDto);
  }

  async verifyMail(token: string) {
    try {
      const result = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.emailSecret,
      });

      const user = await User.findOneBy({ email: result.email });
      user.emailVerified = Bool.true;
      user.save();
      return 'ok';
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'This token is invalid or has expired',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
