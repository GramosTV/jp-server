import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { DaysController } from './days.controller';
import { DaysService } from './days.service';
import { Day } from './entity/day.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Day])],
  controllers: [DaysController],
  providers: [DaysService],
})
export class DaysModule {}
