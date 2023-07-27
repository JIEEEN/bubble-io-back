import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SocketIoAdapter } from './socket-io.adapter';
import * as dotenv from 'dotenv';
import * as path from 'path';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
