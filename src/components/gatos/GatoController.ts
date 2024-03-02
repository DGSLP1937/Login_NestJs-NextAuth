//GatoController.ts

import { Body, Controller, Get, Post, Param, ParseIntPipe, Delete, Put } from "@nestjs/common";
import { CreateGatoDTO } from "./DTO/CreateGatoDTO";
import { GatoService } from "./GatoService";
import { GatoEntity } from "../../entities/Gato.entity";
import { Auth } from "../../auth/decorators/AuthDecorator";
import { Role } from "../../common/enum/Rol.enum";
import { ActiveUser } from "../../common/decorator/ActiveUserDecorator";
import { UserActiveInterface } from "../../common/interface/UserActiveInterface";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Cats')
@Auth(Role.USER)
@Controller('cats')

export class GatoController {
    
    constructor(private readonly gatoService: GatoService) {}
    
    @Post()
    createGato(@Body() newCat: CreateGatoDTO, @ActiveUser() user: UserActiveInterface){
        return this.gatoService.createGato(newCat, user);
    }

    
    @Get()
    async getAllGatos( @ActiveUser() user:UserActiveInterface ) {
        return this.gatoService.getAllGatos(user)
    }
}
