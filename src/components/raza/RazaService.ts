//RazaService.ts


import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { RazaEntity } from "../../entities/Raza.entity";
import { Repository } from "typeorm";
import { CreateRazaDTO } from "./DTO/CreateRazaDTO";

@Injectable()

export class RazaService {
    constructor(
        @InjectRepository(RazaEntity)
        private razaRepository: Repository<RazaEntity>,
        ){}
    
    async findByIdraza(idraza: number): Promise<RazaEntity | undefined> {
        return this.razaRepository.findOne({ where: { idraza }});
    }

    async createRaza(raza: CreateRazaDTO) {
        const newRaza = this.razaRepository.create(raza)
        return await this.razaRepository.save(newRaza)
    }

    async getAllRazas(): Promise <RazaEntity[]>{
        return await this.razaRepository.find();
    }
    
}