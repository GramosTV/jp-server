import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlanksModule } from './planks/planks.module';
import { DaysModule } from './days/days.module';
import { AvatarsController } from './avatars/avatars.controller';
import { AvatarsModule } from './avatars/avatars.module';
import { FriendsModule } from './friends/friends.module';
import { AuthModule } from './auth/auth.module';
import dbConfiguration from './config/db.config';
import { UsersModule } from './users/users.module';
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
    UsersModule,
    PlanksModule,
    DaysModule,
    AvatarsModule,
    FriendsModule,
    AuthModule,
  ],
  controllers: [AppController, AvatarsController],
  providers: [AppService],
})
export class AppModule {}
