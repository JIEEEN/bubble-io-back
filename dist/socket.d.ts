import { Server } from 'socket.io';
export declare class EventsGateway {
    server: Server;
    handleMessage(data: any): Promise<void>;
}
