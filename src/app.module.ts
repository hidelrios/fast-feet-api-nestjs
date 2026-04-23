import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './domain/notification/notification.module';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({
    isGlobal: true,
  }),
  NotificationModule],
})
export class AppModule { }
