import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dia } from '../entities/dia.entity';
import { DiaInput, DiaResponse } from './dto';

@Injectable()
export class DiaService {
  constructor(
    @InjectRepository(Dia)
    private diaRepo: Repository<Dia>,
  ) {}
  /* metodos CRUD*/
  async create(datos: DiaInput): Promise<DiaResponse> {
    const dia = this.diaRepo.create({ nombre: datos.nombre });
    await this.diaRepo.save(dia);
    const response: DiaResponse = { id: dia.id, nombre: dia.nombre };
    return response;
  }
  async findAll(): Promise<Dia[]> {
    return await this.diaRepo.find();
  }
  async getDiaById(id: number): Promise<DiaResponse> {
    const dia = await this.diaRepo.findOneBy({ id });
    if (!dia) {
      throw new Error(`Dia con id ${id} no encontrada`);
    }
    return dia;
  }
  async updateDia(id: number, datos: DiaInput): Promise<DiaResponse> {
    const constDia = await this.diaRepo.findOne({
      where: { id },
    });
    if (!constDia) {
      throw new Error(`Dia con id ${id} no encontrada`);
    }
    constDia.nombre = datos.nombre;
    await this.diaRepo.save(constDia);
    const response: DiaResponse = {
      id: constDia.id,
      nombre: constDia.nombre,
    };
    return response;
  }
  async deleteDiaById(id: number): Promise<{ message: string }> {
    const dia = await this.diaRepo.findOneBy({ id });
    if (!dia) {
      throw new Error(`Dia con id ${id} no encontrada`);
    }
    await this.diaRepo.remove(dia);
    return { message: 'Dia Eliminada' };
  }
  async findDiaById(id: number): Promise<Dia | null> {
    return this.diaRepo.findOne({
      where: { id },
    });
  }
}
