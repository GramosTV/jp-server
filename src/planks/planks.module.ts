import { Module } from '@nestjs/common';
import { PlanksService } from './planks.service';
import { PlanksController } from './planks.controller';

@Module({
  providers: [PlanksService],
  controllers: [PlanksController]
})
export class PlanksModule {}
