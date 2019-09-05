import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {LivetickerGateway} from "./fuelLevel.gateway";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, LivetickerGateway],
})
export class AppModule {}
