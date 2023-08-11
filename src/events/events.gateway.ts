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
    createRoom(@MessageBody() data: any,
        @ConnectedSocket() client: Socket) {
        const newRoom = {
            roomNum: data.room,
            roomPwd: data.roompwd,
            index: this.rooms.length
        }
        client.join(newRoom.roomNum);
        console.log(`Client ${client.id} joined room ${newRoom.roomNum}`);
        this.rooms.push({ roomNum: data.room, roomPwd: data.roompwd, index: this.rooms.length });
        this.namespace.emit('roomList', this.rooms);
    };

    @SubscribeMessage('getRoomList')
    getRoomList(@MessageBody() data: any,
        @ConnectedSocket() client: Socket) {
        this.namespace.emit('roomList', this.rooms);
    };

    @SubscribeMessage('joinRoom')
    joinRoom(@MessageBody() data: any,
        @ConnectedSocket() client: Socket) {
        const joinedRoom = {
            roomNum: data.room.roomNum,
            roomPwd: data.room.roomPwd,
            index: data.room.index,
        }
        client.join(data.room);
        console.log(`Client ${client.id} joined room ${joinedRoom.roomNum}, ${joinedRoom.roomPwd}`);
    }; 

    @SubscribeMessage('deleteRoom')
    deleteRoom(@MessageBody() data: any,
        @ConnectedSocket() client: Socket) {
        console.log(this.rooms);
        this.rooms = this.rooms.filter((room) => room['roomNum'] !== data.room.roomNum
            || room['roomPwd'] !== data.room.roomPwd
            || room['index'] !== data.room.index);
        this.rooms = reindex(this.rooms);
        this.namespace.emit('roomList', this.rooms);
        console.log(this.rooms);
    }

    @SubscribeMessage('playerPos')
    playerPos(@MessageBody() data: any,
        @ConnectedSocket() client: Socket) {
        // console.log(data);
        // this.namespace.to(data['room']).emit('playerPos', data['pos']);
        client.broadcast.emit('playerPos', data);
    }
}

const reindex = arr => {
    let i = 0;
    return arr.map(item => {
        item.index = i++;
        return item;
    });
}