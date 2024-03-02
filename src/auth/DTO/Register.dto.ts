
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDTO {

    @MinLength(1)
    @IsString()
    username: string;

    @Transform( ( {value} ) => value.trim() )
    @MinLength(3)
    @IsString()
    password: string;

    @IsEmail()
    email: string;
}