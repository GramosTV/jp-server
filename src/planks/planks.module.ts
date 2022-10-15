import { forwardRef, Module } from '@nestjs/common';
import { PlanksService } from './planks.service';
import { PlanksController } from './planks.controller';
import { Plank } from './entity/plank.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DaysModule } from '../days/days.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    forwardRef(() => DaysModule),
    TypeOrmModule.forFeature([Plank]),
    UsersModule,
  ],
  providers: [PlanksService],
  controllers: [PlanksController],
  exports: [PlanksService],
})
export class PlanksModule {}
