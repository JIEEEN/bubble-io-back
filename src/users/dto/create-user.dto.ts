import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export class CreateUserDto{
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    id: string;

    @Transform(params => params.value.trim())
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    name: string;

    @Transform(({value, obj})=>{
        if (obj.password.includes(obj.id.trim())){
            throw new BadRequestException('password can\'t include same word in id')
        }
        return value.trim()
    })
    @IsString()
    // @Matches(/^[A-Za-z\d!@#$%^&*()]{8, 30}$/)
    password: string;
}