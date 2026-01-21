import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { EnvModule } from "../env/env.module";
import { EnvService } from "../env/env.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { JwtStrategy } from "./jwt.strategy";
import { RolesGuard } from "./permissions.guard";

@Module({
  imports: [
    EnvModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (config: EnvService) => {
        const privateKey = config.get('JWT_PRIVATE_KEY');
        const publicKey = config.get('JWT_PUBLIC_KEY');

        if (!privateKey || !publicKey) {
          throw new Error('JWT_PRIVATE_KEY ou JWT_PUBLIC_KEY não estão definidos');
        }

        return {
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
          signOptions: { algorithm: 'RS256', expiresIn: '1h' },
        };
      },
    }),
  ],
  providers: [
    JwtStrategy,
    EnvService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [JwtModule],
})
export class AuthModule {}