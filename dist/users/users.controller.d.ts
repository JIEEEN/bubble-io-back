import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(dto: CreateUserDto): Promise<void>;
    findAll(): Promise<{
        id: string;
        password: string;
    }>;
}
