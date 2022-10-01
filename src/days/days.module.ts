import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanksModule } from '../planks/planks.module';
import { UsersModule } from '../users/users.module';
import { DaysController } from './days.controller';
import { DaysService } from './days.service';
import { Day } from './entity/day.entity';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => PlanksModule),
    TypeOrmModule.forFeature([Day]),
  ],
  controllers: [DaysController],
  providers: [DaysService],
  exports: [DaysService],
})
export class DaysModule {}
