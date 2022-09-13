import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlanksModule } from './planks/planks.module';
import { DaysModule } from './days/days.module';
import dbConfiguration from './config/db.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    PlanksModule,
    DaysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
