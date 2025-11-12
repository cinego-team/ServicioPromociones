import { Column, Entity, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm";
import { Promocion } from "./promocion.entity";

@Entity('dias')
export class Dia extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => Promocion, promocion => promocion.dia)
    promocion: Promocion[];
}