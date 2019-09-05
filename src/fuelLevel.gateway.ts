import {
  OnGatewayConnection,
  OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, WsResponse
} from "@nestjs/websockets";
import {Server} from "http";
import {Observable} from "rxjs";
const  fs = require("fs");
import { Logger } from '@nestjs/common';
@WebSocketGateway()
export class LivetickerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  views: number = 0;

  async handleConnection(client: any) {
    this.views++;
    console.log(this.views);
    this.server.emit('views', this.views);
  }

  async handleDisconnect() {
    this.views--;
    console.log('DISCONNECT');
    this.server.emit('views', this.views);
  }

  @SubscribeMessage('liveticker')
  handleLiveticker(client: string, data: unknown): Observable<WsResponse<string>> {
  return null;
  }

  afterInit(server: any): any {
    console.log('OKOK');
  }

}
