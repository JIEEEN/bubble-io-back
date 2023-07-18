import { 
    Controller,
    Post,
    Body,
    Get,
         } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<void>{
        const {id, name, password} = dto;

        await this.usersService.createUser(id, name, password);
    }

    @Get()
    async findAll(){
        const a = {
            id: "JIN",
            password: "PASSWORD",
        }
        return a;
    }
}
