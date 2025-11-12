import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

//import { TipoClienteEntity } from "./tipoCliente.entity";
import { Dia } from "./dia.entity"

@Entity('promociones')
export class Promocion extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ name: 'porcentaje_descuento' })
    porcentajeDescuento: number;

    // ID tipo de cliente
    @Column({ type: 'int', nullable: false, name: 'tipo_cliente_id' })
    tipoClienteId: number;

    // Relación con los días
    @ManyToOne(() => Dia, dia => dia.promocion)
    @JoinColumn({ name: 'dia_id' })
    dia: Dia;

}