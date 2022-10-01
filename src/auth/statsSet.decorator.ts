import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ConflictException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class StatsSetGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest();
    const { statsSet } = await this.usersService.findOneById(request.user.id);
    if (!statsSet) {
      throw new ConflictException();
    }
    return !!statsSet;
  }
}
