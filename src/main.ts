/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe(),
  );
  app.enableCors({
    origin: 'https://job-management-admin-ui-ogs2.vercel.app/', 
    credentials: true,             
  });
  const port = configService.get<number>('PORT') || 5000;
  await app.listen(port ?? 5000);
}
bootstrap();
