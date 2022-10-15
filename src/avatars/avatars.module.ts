import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AvatarsService } from './avatars.service';
import { Avatar } from './entity/avatar.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Avatar])],
  providers: [AvatarsService],
  exports: [AvatarsService],
})
export class AvatarsModule {}
