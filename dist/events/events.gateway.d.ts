import { Namespace, Socket } from "socket.io";
export declare class EventsGateway {
    constructor();
    private rooms;
    namespace: Namespace;
    findAll(data: any, client: Socket): void;
    createRoom(data: any, client: Socket): void;
    getRoomList(data: any, client: Socket): void;
    joinRoom(data: any, client: Socket): void;
    deleteRoom(data: any, client: Socket): void;
    playerPos(data: any, client: Socket): void;
}
