import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    ){}

    async createUser(id:string, name:string, password:string){
        const exist = await this.checkUserExist(id);

        if(exist){
            throw new UnprocessableEntityException("Already Exist ID")
        }else{
            this.saveUser(id, name, password);
        }
    }

    async checkUserExist(id:string){
        const user = await this.usersRepository.findOne({
            where: { id: id }
        })

        return user != undefined;
    }

    async saveUser(id:string, name:string, password:string){
        const user = new UserEntity();
        user.id = id;
        user.name = name;
        user.password = await hash(password);

        await this.usersRepository.save(user);
    }


}


const hash = async(plainPW: string): Promise<string> => {
    const saltOrRounds = 10;
    return await bcrypt.hash(plainPW, saltOrRounds);
}


