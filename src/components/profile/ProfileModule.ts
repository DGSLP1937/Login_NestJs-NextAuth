//ProfileModule.ts

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileController } from "./ProfileController";
import { ProfileService } from "./ProfileService";
import { ProfileEntity } from "../../entities/Profile.entity";
import { UserEntity } from "../../entities/User.entity";



@Module({
    imports: [TypeOrmModule.forFeature([ProfileEntity, UserEntity])],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: [ProfileService],
})

export class ProfileModule {}