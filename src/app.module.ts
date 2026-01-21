import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({
    isGlobal: true,
  }),],
})
export class AppModule { }
