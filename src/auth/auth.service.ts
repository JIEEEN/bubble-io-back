import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; 
import { UsersService } from  '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ){}

    async signIn(id:string, pass:string): Promise<any>{
        const user = await this.usersService.findOne(id);

        const pwdMatch = await bcrypt.compareSync(pass, user.password);

        if(!pwdMatch){
            throw new UnauthorizedException();
        }

        const payload = {sub: user.id, name: user.name};
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
