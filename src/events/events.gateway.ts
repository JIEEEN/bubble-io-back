import { MessageBody, WebSocketServer, WebSocketGateway, ConnectedSocket, SubscribeMessage } from "@nestjs/websockets";
import { Namespace, Socket } from "socket.io";
import { Logger } from "@nestjs/common";

@WebSocketGateway({
    namespace: 'events',
    transports: ['websocket'],
    cors: {
        origin: "*",
        credentials: true,
    }
})
export class EventsGateway {
    constructor() { }
    private rooms: Object[] = [];

    @WebSocketServer()
    namespace: Namespace;
    // private logger: Logger = new Logger('EventsGateway');

    @SubscribeMessage('message')
    findAll(@MessageBody() data: any,
        @ConnectedSocket() client: Socket) {
        this.namespace.to(data['room']).emit('message', data['message']);
    };

    @SubscribeMessage('createRoom')
    joinRoom(@MessageBody() data: any,
        @ConnectedSocket() client: Socket) {
        client.join(data);
        console.log(`Client ${client.id} joined room ${data.room}, ${data.roompwd}`
        );
        this.rooms.push({ roomNum: data.room, roomPwd: data.roompwd });
        this.namespace.to(data).emit('message', {
            clientId: client.id,
            roomNum: data.room,
            roomPwd: data.roompwd
        });
        this.namespace.emit('roomList', this.rooms);
    };

    @SubscribeMessage('getRoomList')
    getRoomList(@MessageBody() data: any,
        @ConnectedSocket() client: Socket) {
        this.namespace.emit('roomList', this.rooms);
    };

    @SubscribeMessage('deleteRoom')
    deleteRoom(@MessageBody() data: any,
        @ConnectedSocket() client: Socket) {
            console.log(this.rooms);
            this.rooms = this.rooms.filter((room) => room['roomNum']!== data.room.roomNum || room['roomPwd'] !== data.room.roomPwd);
            this.namespace.emit('roomList', this.rooms);
    }
}