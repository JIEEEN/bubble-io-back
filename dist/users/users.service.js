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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const common_2 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entity/user.entity");
const bcrypt = require("bcrypt");
let UsersService = exports.UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async createUser(id, name, password) {
        const exist = await this.checkUserExist(id);
        if (exist) {
            throw new common_2.UnprocessableEntityException("Already Exist ID");
        }
        else {
            this.saveUser(id, name, password);
        }
    }
    async checkUserExist(id) {
        const user = await this.usersRepository.findOne({
            where: { id: id }
        });
        return user != undefined;
    }
    async saveUser(id, name, password) {
        const user = new user_entity_1.UserEntity();
        user.id = id;
        user.name = name;
        user.password = await hash(password);
        await this.usersRepository.save(user);
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne({
            where: { id: id }
        });
        return user;
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
const hash = async (plainPW) => {
    const saltOrRounds = 10;
    return await bcrypt.hashSync(plainPW, saltOrRounds);
};
//# sourceMappingURL=users.service.js.map