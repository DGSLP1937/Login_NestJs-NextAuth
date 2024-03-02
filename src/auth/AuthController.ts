//AuthController.ts

import { Body, Controller, Post, Get, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './AuthService';
import { LoginDTO } from './DTO/Login.dto';

import { Response } from 'express';

import { Request } from 'express';
import { AuthGuard } from './guard/AuthGuard';
import { RolesGuard } from './guard/RolesGuard';
import { Role } from '../common/enum/Rol.enum';
import { Auth } from './decorators/AuthDecorator';
import { ActiveUser } from 'src/common/decorator/ActiveUserDecorator';
import { UserActiveInterface } from 'src/common/interface/UserActiveInterface';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDTO } from './DTO/Register.dto';


interface RequestWithUser extends Request {
  user: {
    username: string;
    role: string;
  }
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('register')
  register(
    @Body()
    registerDTO: RegisterDTO){
    //console.log(registerDTO);
    return this.authService.register(registerDTO);
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
    /*
    try {
      await this.authService.login(loginDTO, res);
      res.status(HttpStatus.OK).send(); 
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
    }
    */
  }
  
  @Get('profile')
  @Auth(Role.ADMIN)
  profile(@ActiveUser() user: UserActiveInterface){
    return this.authService.profile(user)
  }

  @Auth(Role.USER)
  @Post('refresh')
  async refreshToken (){}

  @Auth(Role.USER)
  @Post('logout')
  async logout(): Promise<string> {
      return this.authService.logout();
  }
}
