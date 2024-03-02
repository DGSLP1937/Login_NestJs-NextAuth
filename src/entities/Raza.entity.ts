//Raza.entity.ts


import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { GatoEntity } from "./Gato.entity";

@Entity({name: 'raza'})

export class RazaEntity {

    @PrimaryGeneratedColumn()
    idraza: number

    @Column()
    name: string

    @OneToMany( () => GatoEntity , (gato) => gato.raza )
    gatos: GatoEntity[]
}
