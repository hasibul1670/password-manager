import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { validationPipe } from './helpers/utills/validation-pipe.config';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.get(ConfigService);
  app.useGlobalPipes(validationPipe);
  // app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(5000);
}
bootstrap();
