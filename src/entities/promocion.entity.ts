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

  // ID tipo de cliente
  @Column({ type: 'int', nullable: false })
  tipoClienteId: number;

  // Relación con los días
  @ManyToOne(() => Dia, (dia) => dia.promocion)
  dia: Dia;
}
