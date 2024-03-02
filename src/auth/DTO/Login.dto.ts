
import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class LoginDTO {

    @MinLength(1)
    @IsString()
    username: string;

    @Transform( ( {value} ) => value.trim() )
    @MinLength(3)
    @IsString()
    password: string;
    
}