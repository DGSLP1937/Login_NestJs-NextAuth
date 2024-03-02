//Profile.entity.ts

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_profile')
export class ProfileEntity {

    @PrimaryGeneratedColumn()
    idprofile: number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    age: number
}
