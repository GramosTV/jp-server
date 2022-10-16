import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { statsSetGuard } from 'src/auth/statsSet.decorator';
import { AvatarsService } from './avatars.service';
@Controller('avatars')
export class AvatarsController {
  constructor(private avatarsService: AvatarsService) {}

  @UseGuards(JwtAuthGuard, statsSetGuard)
  @Get('/')
  async findOne(@Request() req) {
    return await this.avatarsService.findOne(req.user.id);
  }
}
