//AuthService.ts

import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import  { UserService} from '../components/users/UserService'
import { LoginDTO } from './DTO/LoginDTO';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService:JwtService,
        ) {}
    async login(loginDTO: LoginDTO, res: Response): Promise<void>{
        const { username, password} = loginDTO;

        const userFound = await this.userService.findOneUsernWithPassword(username);
        if(!userFound) throw new HttpException('Usuario no encontrado: '+ username, HttpStatus.NOT_FOUND);

        const checkPassword = await bcrypt.compare(password, userFound.password);
        if(!checkPassword) throw new HttpException('Credenciales incorrectas', HttpStatus.NOT_FOUND);

        const payload = {id: userFound.iduser, username: userFound.username, role: userFound.role};
        const token = this.jwtService.sign(payload);
        
        const response = {
            iduser: userFound.iduser,
            username: userFound.username,
            email: userFound.email,
            fecha_registro: userFound.fecha_registro,
            role: userFound.role,
            profile: userFound.profile
        };

        res.cookie('token', token, {httpOnly: true});

        res.json(response);
    }

    async renewToken(oldToken: string): Promise<string> {
        try {
            // Verificar si el token actual es válido
            const decodedToken = this.jwtService.verify(oldToken);
            
            // Extraer los datos relevantes del token anterior
            const { id, username, role } = decodedToken;

            // Firmar un nuevo token con los mismos datos
            const newToken = this.jwtService.sign({ id, username, role });

            return newToken;
        } catch (error) {
            // Manejar el caso de un token inválido
            throw new Error('Token inválido');
        }
    }

    async logout(): Promise<string> {
        // No necesitas realizar ninguna acción aquí, simplemente devuelve un mensaje de éxito o indicador
        return 'Logout successful';
    }

    async profile({username, role}: {username:string, role: string}) {
        return this.userService.findByUsername(username);
    }


}