//RazaController.ts

import { Body, Controller, Get, Post, Param, ParseIntPipe, Delete, Put } from "@nestjs/common";
import { RazaService } from "./RazaService";
import { CreateRazaDTO } from "./DTO/CreateRazaDTO";
import { ApiTags } from "@nestjs/swagger";
import { Auth } from "src/auth/decorators/AuthDecorator";
import { Role } from "src/common/enum/Rol.enum";

@ApiTags('breeds')
@Controller('breeds')
export class RazaController {

    constructor(private readonly razaService: RazaService) {}

    @Auth(Role.ADMIN)
    @Post()
    createRaza(@Body() newRaza: CreateRazaDTO){
        return this.razaService.createRaza(newRaza);
    }

    @Get()
    getAllRazas(){
        return this.razaService.getAllRazas();
    }
}
