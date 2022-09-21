import { Module } from '@nestjs/common';
import { PlanksService } from './planks.service';
import { PlanksController } from './planks.controller';
import { Plank } from './entity/plank.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Plank])],
  providers: [PlanksService],
  controllers: [PlanksController],
  exports: [PlanksService],
})
export class PlanksModule {}
