import { WsResponse, MessageBody, OnGatewayDisconnect, WebSocketServer, OnGatewayInit, WebSocketGateway, OnGatewayConnection, ConnectedSocket, SubscribeMessage } from "@nestjs/websockets";
import { Namespace, Server, Socket } from "socket.io";
import { Logger } from "@nestjs/common";

interface loginMessage{
    user: string;
}
interface roomMessage extends loginMessage{
    message: string;
}

@WebSocketGateway({
    namespace: 'events',
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    namespace: Namespace;
    private logger: Logger = new Logger('EventsGateway');
    
    afterInit(server: Namespace){
        this.logger.log('Initialized');
    }

    handleDisconnect(client: Namespace){
        this.logger.log(`Client disconnected: ${client}`);
    }

    handleConnection(client: Namespace, ...args: any[]){
        this.logger.log(`Client connected: ${client}`);
    }

    @SubscribeMessage('hello')
    findAll(@MessageBody() data: string){
        console.log(data);
    }
}