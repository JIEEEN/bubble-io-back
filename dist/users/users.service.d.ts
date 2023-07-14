import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    createUser(id: string, name: string, password: string): Promise<void>;
    checkUserExist(id: string): Promise<boolean>;
    saveUser(id: string, name: string, password: string): Promise<void>;
    login(id: string, password: string): Promise<void>;
}
