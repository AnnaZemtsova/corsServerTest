import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from './ws.adapter';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import {ValidationPipe} from "@nestjs/common";
import {NestExpressApplication} from "@nestjs/platform-express";
let corsOptions = {
  origins: '*:*',
  // credentials: true
};
async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  // app.useWebSocketAdapter(new WsAdapter(3000));
  // app.use(cors());
  //app.enableCors();
  app.use(cors(corsOptions));
  await app.listen(8000);
}
bootstrap();
