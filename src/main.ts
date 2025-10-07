import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       // remove campos não definidos no DTO
    forbidNonWhitelisted: true, // lança erro se campos extras forem enviados
    transform: true, // importante para transformar query em tipos corretos
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
