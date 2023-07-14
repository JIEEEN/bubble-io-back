import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/validationSchema';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';

@Module({
  imports:[
    UsersModule,
    ConfigModule.forRoot({
      // envFilePath: [`./config/env/.${process.env.NODE_ENV}.env`],
      envFilePath: `./src/config/env/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + `/**/*.entity{.ts,.js}`],
      synchronize: process.env.DB_SYNC === 'true',
    }),
  ], 
  controllers: [AppController],
  // providers: [AppService],
}) 
export class AppModule{}
 