import * as WebSocket from 'ws';
import { WebSocketAdapter } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import {fromEvent, Observable} from 'rxjs';
import {IoAdapter} from "@nestjs/platform-socket.io";
import {filter, switchMap} from "rxjs/operators";

export class WsAdapter extends IoAdapter {
    public bindMessageHandlers(
        client,
        handlers: MessageMappingProperties[],
        process: (data: any) => Observable<any>,
    ) {
        handlers.forEach(({ message, callback }) => {
            client.on('event', function (data, ack) {
                console.log('DATA', data);
                ack('woot')
            });
            fromEvent(client, message).pipe(switchMap(data => process(callback(data)))
                ,filter(result => !!result && result.event))
                    .subscribe(({ event, data }) => client.emit(event, data))
        });
    }
}
