import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DaysController } from './days.controller';
import { DaysService } from './days.service';
import { Day } from './entity/day.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Day])],
  controllers: [DaysController],
  providers: [DaysService],
})
export class DaysModule {}
