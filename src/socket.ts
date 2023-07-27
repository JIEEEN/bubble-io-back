import { Logger } from '@nestjs/common';
import { 
    MessageBody, 
    SubscribeMessage, 
    WebSocketGateway, 
    WebSocketServer, 
    WsResponse,
 } from '@nestjs/websockets';
import { Server } from 'socket.io';


@WebSocketGateway(8080, {transports:['websocket']})
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('ClientToServer')
    async handleMessage(@MessageBody() data){
        this.server.emit('ServerToClient', data);
    }
}