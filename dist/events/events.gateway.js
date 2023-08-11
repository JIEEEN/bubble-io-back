"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let EventsGateway = exports.EventsGateway = class EventsGateway {
    constructor() {
        this.rooms = [];
    }
    findAll(data, client) {
        this.namespace.to(data['room']).emit('message', data['message']);
    }
    ;
    createRoom(data, client) {
        const newRoom = {
            roomNum: data.room,
            roomPwd: data.roompwd,
            index: this.rooms.length
        };
        client.join(newRoom.roomNum);
        console.log(`Client ${client.id} joined room ${newRoom.roomNum}`);
        this.rooms.push({ roomNum: data.room, roomPwd: data.roompwd, index: this.rooms.length });
        this.namespace.emit('roomList', this.rooms);
    }
    ;
    getRoomList(data, client) {
        this.namespace.emit('roomList', this.rooms);
    }
    ;
    joinRoom(data, client) {
        const joinedRoom = {
            roomNum: data.room.roomNum,
            roomPwd: data.room.roomPwd,
            index: data.room.index,
        };
        client.join(data.room);
        console.log(`Client ${client.id} joined room ${joinedRoom.roomNum}, ${joinedRoom.roomPwd}`);
    }
    ;
    deleteRoom(data, client) {
        console.log(this.rooms);
        this.rooms = this.rooms.filter((room) => room['roomNum'] !== data.room.roomNum
            || room['roomPwd'] !== data.room.roomPwd
            || room['index'] !== data.room.index);
        this.rooms = reindex(this.rooms);
        this.namespace.emit('roomList', this.rooms);
        console.log(this.rooms);
    }
    playerPos(data, client) {
        client.broadcast.emit('playerPos', data);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Namespace)
], EventsGateway.prototype, "namespace", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "findAll", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "createRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getRoomList'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "getRoomList", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('deleteRoom'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "deleteRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('playerPos'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "playerPos", null);
exports.EventsGateway = EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'events',
        transports: ['websocket'],
        cors: {
            origin: "*",
            credentials: true,
        }
    }),
    __metadata("design:paramtypes", [])
], EventsGateway);
const reindex = arr => {
    let i = 0;
    return arr.map(item => {
        item.index = i++;
        return item;
    });
};
//# sourceMappingURL=events.gateway.js.map