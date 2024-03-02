//ProfileController.ts

import { Body, Controller, Get, Post, Param, ParseIntPipe, Delete, Put } from "@nestjs/common";
import { ProfileService } from "./ProfileService";
import { UpdateProfileDTO } from "./DTO/UpdateProfileDTO";
import { ProfileEntity } from "../../entities/Profile.entity";
import { CreateProfileDTO } from "./DTO/CreateProfileDTO";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('profiles')
@Controller('profile')

export class ProfileController {
    constructor (
        private readonly profileService: ProfileService,
        ){}

    @Get()
    getAllProfiles(): Promise <ProfileEntity[]> {
        return this.profileService.getAllProfiles();
    }
    
    @Post(':id/profile')
    createProfile(
        @Param('id', ParseIntPipe) id:number,
        @Body() profile: CreateProfileDTO
    ){
        return this.profileService.createProfile(id,profile);
    }
    
    /*
    @Post()
    createProfile(@Body() newProfile: CreateProfileDTO ){
        return this.profileService.createProfile(newProfile);
    }
    */
    @Get(':id')
    getSelectedProfile(@Param('id', ParseIntPipe) idprofile:number ) {
        return this.profileService.getSelectedProfile(idprofile);
    }

    @Put(':id')
    updateProfile(@Param('id', ParseIntPipe) idprofile: number, @Body()profile: UpdateProfileDTO) {
        return this.profileService.updateProfile(idprofile, profile)
    }

    @Delete(':id')
    deleteProfile(@Param('id', ParseIntPipe) idprofile: number) {
        return this.profileService.deleteProfile(idprofile);
    }

}