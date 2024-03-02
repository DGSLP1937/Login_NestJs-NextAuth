//ProfileService.ts

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProfileEntity } from "src/entities/Profile.entity";
import { UpdateProfileDTO } from "./DTO/UpdateProfileDTO";
import { UserEntity } from "src/entities/User.entity";

@Injectable()

export class ProfileService {

    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,

        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ){}
    
    getAllProfiles() {
        return this.profileRepository.find();
    }

    async createProfile(iduser: number, profile: ProfileEntity) {
        const userFound = await this.userRepository.findOne({
            where: {
                iduser
            },
            relations: ['profile']
        })

        if(!userFound) {
            return new HttpException('No se encontro el User a relacionarV1: ', HttpStatus.NOT_FOUND);
        }

        if(userFound.profile !== null ){
            return new HttpException('El Usuario ya esta asignado a otro Perfil: ' + 
            userFound.profile.firstname+' '+userFound.profile.lastname, HttpStatus.NOT_FOUND); 
        }

        const newProfile = this.profileRepository.create(profile);
        const savedProfile = await this.profileRepository.save(newProfile);

        userFound.profile = savedProfile;
        return this.userRepository.save(userFound);
    }

    async getSelectedProfile(idprofile: number) {
        const profileFound = await this.profileRepository.findOne({
            where: {
                idprofile
            },
        })

        if(!profileFound) {
            return new HttpException('No se encontro el Perfil', HttpStatus.NOT_FOUND);
        }

        return profileFound;
    }
    
    async updateProfile(idprofile: number, profile: UpdateProfileDTO) {
        const profileFound =  await this.profileRepository.findOne({
            where: {
                idprofile
            }
        })

        if(!profileFound) {
            return new HttpException('No se encontro el Perfil a actualizar', HttpStatus.NOT_FOUND);
        }
        const updateIata = Object.assign(profileFound, profile)
        return this.profileRepository.save(updateIata)
    }

    async deleteProfile(idprofile: number) {
        
        const result = await this.profileRepository.delete({idprofile})

        if(result.affected === 0) {
            return new HttpException('No se encontro el Perfil', HttpStatus.NOT_FOUND);
        }

        return result;
    }

}