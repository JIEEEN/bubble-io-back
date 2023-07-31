import { WsResponse, MessageBody, OnGatewayDisconnect, WebSocketServer, OnGatewayInit, WebSocketGateway, OnGatewayConnection, ConnectedSocket, SubscribeMessage } from "@nestjs/websockets";
import { Namespace, Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";

interface loginMessage{
    user: string;
}
interface roomMessage extends loginMessage{
    message: string;
}

@WebSocketGateway(8080, {
    namespace: 'events',
    transports: ['websocket'],
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    constructor(){}

    @WebSocketServer()
    namespace: Namespace;
    private logger: Logger = new Logger('EventsGateway');
    
    afterInit(server: Namespace){
        this.logger.log('Initialized');
        this.namespace.adapter.on('create-room', (room) => {
            console.log(`Created room ${room}`);
        });

        this.namespace.adapter.on('join-room', (room) => {
            console.log(`Created room ${room}`);
        });

        this.namespace.adapter.on('leave-room', (room) => {
            console.log(`Created room ${room}`);
        });

        this.namespace.adapter.on('delete-room', (room) => {
            console.log(`Deleted room ${room}`);
        });
    }

    handleDisconnect(client: Namespace){
        this.logger.log(`Client disconnected: ${client}`);
        console.log()
    }

    handleConnection(client: Namespace, ...args: any[]){
        this.logger.log(`Client connected: ${client}`);
    }

    @SubscribeMessage('hello')
    findAll(@MessageBody() data: string,
            @ConnectedSocket() client: Socket): string{
        return data;
    }
}