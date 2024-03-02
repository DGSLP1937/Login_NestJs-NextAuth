//Gato.entity.ts


import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { RazaEntity } from "./Raza.entity";
import { UserEntity } from "./User.entity";

@Entity({name: 'gato'})

export class GatoEntity {

    @PrimaryGeneratedColumn()
    idgato: number;

    @Column()
    name: string;


    @ManyToOne( () => RazaEntity, (raza) => raza.gatos, {
        eager:true
    } )
    raza: RazaEntity

    @ManyToOne( () =>  UserEntity  ) 
    @JoinColumn( {name: 'username', referencedColumnName:'username'} )
    user: UserEntity

    @Column()
    username: string
}
