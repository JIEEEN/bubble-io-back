import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';


// dotenv.config({
//   path: path.resolve(
//     // `./config/env/.${process.env.NODE_ENV}.env`
//     './src/config/env/.development.env'
//   )
// });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }))
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
