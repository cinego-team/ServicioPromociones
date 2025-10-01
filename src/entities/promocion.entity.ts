import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

//import { TipoClienteEntity } from "./tipoCliente.entity";
import {Dia} from   "./dia.entity"

@Entity('Promociones')
export class Promocion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  porcentajeDescuento: number;

   // ID tipo de cliente
  @Column({ type: 'int', nullable: false })
  tipoClienteId: number;

   // Relación con los días
 @ManyToOne(() => Dia, dia => dia.promocion)
  @JoinColumn({name: 'diaID'})
  dia: Dia;

}