import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Bool } from 'types';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async googleLogin(user: any) {
    const registeredUser = await this.usersService.findOne(user.email);
    if (registeredUser?.isGoogleAccount === Bool.false) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'This email is already taken',
        },
        HttpStatus.CONFLICT,
      );
    }
    let payload = {};
    if (!registeredUser) {
      await this.usersService.addUser({
        email: user.email,
        password: '000',
        name: user.name,
      });
      const addedUser = await this.usersService.findOne(user.email);
      payload = { email: user.email, sub: addedUser.id };
    } else {
      payload = { email: registeredUser.email, sub: registeredUser.id };
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
