import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//import { TipoClienteEntity } from "./tipoCliente.entity";
<<<<<<< HEAD
import { Dia } from './dia.entity';
=======
import { Dia } from "./dia.entity"
>>>>>>> d36cb4edc2d70c14504f503393298056c2496e8e

@Entity('promocion')
export class Promocion extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ name: 'porcentaje_descuento' })
    porcentajeDescuento: number;

<<<<<<< HEAD
  // ID tipo de cliente
  @Column({ type: 'int', nullable: false })
  tipoClienteId: number;

  // Relación con los días
  @ManyToOne(() => Dia, (dia) => dia.promocion)
  dia: Dia;
}
=======
    // ID tipo de cliente
    @Column({ type: 'int', nullable: false, name: 'tipo_cliente_id' })
    tipoClienteId: number;

    // Relación con los días
    @ManyToOne(() => Dia, dia => dia.promocion)
    @JoinColumn({ name: 'dia_id' })
    dia: Dia;

}
>>>>>>> d36cb4edc2d70c14504f503393298056c2496e8e
