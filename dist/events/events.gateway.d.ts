import { OnGatewayDisconnect, OnGatewayInit, OnGatewayConnection } from "@nestjs/websockets";
import { Namespace } from "socket.io";
export declare class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    namespace: Namespace;
    private logger;
    afterInit(server: Namespace): void;
    handleDisconnect(client: Namespace): void;
    handleConnection(client: Namespace, ...args: any[]): void;
    findAll(data: string): void;
}
