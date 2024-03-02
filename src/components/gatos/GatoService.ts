//GatoService.ts


import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { GatoEntity } from "../../entities/Gato.entity";
import { CreateGatoDTO } from "./DTO/CreateGatoDTO";
import { RazaEntity } from "../../entities/Raza.entity";
import { Role } from "src/common/enum/Rol.enum";
import { UserActiveInterface } from "../../common/interface/UserActiveInterface";

@Injectable()

export class GatoService {
    constructor(
        @InjectRepository(GatoEntity)
        private gatoRepository: Repository<GatoEntity>,
        
        @InjectRepository(RazaEntity)
        private razaRepository: Repository<RazaEntity>,

        ){}
    
    async findByIdgato(idgato: number): Promise<GatoEntity | undefined> {
        return this.gatoRepository.findOne({ where: { idgato }});
    }

    async createGato(gato: CreateGatoDTO, user: UserActiveInterface) {
        const razaFound = await this.razaRepository.findOneBy({name: gato.raza})

        if (!razaFound) {
            throw new BadRequestException('Raza no encontrada');
        }

        return await this.gatoRepository.save({
            ...gato,
            raza: razaFound,
            username: user.username
        });
    }

    async getAllGatos( user: UserActiveInterface ){
        if ( user.role === Role.ADMIN) { 
            return await this.gatoRepository.find();
        }
        return await this.gatoRepository.find({where: {username: user.username} });
    }
    
}