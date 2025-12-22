import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [HttpModule, JwtModule.register({
    secret: 'your_jwt_secret_key',
    signOptions: { expiresIn: '1h' },
    global: true,
  })],
})
export class AppModule {}
