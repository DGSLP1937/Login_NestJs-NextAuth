//User.entity.ts

import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { ProfileEntity } from "./Profile.entity"
import { Role } from "../common/enum/Rol.enum"


@Entity({name: 'user'})
export class UserEntity {

    @PrimaryGeneratedColumn()
    iduser: number
    
    @Column({unique: true, nullable: false})
    username: string

    @Column({nullable: false, select:false})
    password: string

    @Column({unique: true, nullable: false})
    email: string

    @Column({type: 'date', default: () => 'CURRENT_DATE'})
    fecha_registro: Date

    @Column({ type:'enum',  default: Role.USER, enum: Role })
    role: Role;
    
    @OneToOne(() => ProfileEntity)
    @JoinColumn()
    profile: ProfileEntity
}