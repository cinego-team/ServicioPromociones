import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Dia } from './dia.entity';

@Entity('promocion')
export class Promocion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'porcentaje_descuento' })
  porcentajeDescuento: number;

  @Column({ name: 'tipo_cliente_id', type: 'int', nullable: false })
  tipoClienteId: number;

  @ManyToOne(() => Dia, (dia) => dia.promocion, { nullable: false })
  @JoinColumn({ name: 'dia_id' })
  dia: Dia;
}
