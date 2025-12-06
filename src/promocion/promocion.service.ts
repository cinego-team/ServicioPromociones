import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promocion } from '../entities/promocion.entity';

import { PromocionInput, PromocionOutput, PromocionMayorDTO } from './dto';
import { axiosAPIUsuarios } from '../axios_service/axios.client';
import { config } from '../axios_service/env';
import { Dia } from 'src/entities/dia.entity';

@Injectable()
export class PromocionService {
  constructor(
    @InjectRepository(Promocion)
    private readonly promocionRepo: Repository<Promocion>,
    @InjectRepository(Dia) private readonly diaRepo: Repository<Dia>,
  ) {}

  async nuevaPromocion(dato: PromocionInput): Promise<PromocionOutput> {
    const constTipoCliente: number = await axiosAPIUsuarios.get(
      config.APIUsuariosUrls.validarTipoCliente(dato.tipoClienteId),
    );
    if (!constTipoCliente) {
      throw new BadRequestException(
        `Tipo de cliente con id ${dato.tipoClienteId} no válido`,
      );
    }
    const constDia = await this.diaRepo.findOne({
      where: { nombre: dato.dia },
    });
    if (!constDia) {
      throw new BadRequestException('Día no encontrado');
    }
    const nuevaPromocion = this.promocionRepo.create({
      nombre: dato.nombre,
      porcentajeDescuento: dato.porcentajeDescuento,
      tipoClienteId: dato.tipoClienteId,
      dia: constDia,
    });
    await this.promocionRepo.save(nuevaPromocion);
    const response: PromocionOutput = {
      id: nuevaPromocion.id,
      nombre: nuevaPromocion.nombre,
      porcentajeDescuento: nuevaPromocion.porcentajeDescuento,
      tipoClienteId: nuevaPromocion.tipoClienteId,
      dia: nuevaPromocion.dia.nombre,
    };
    return response;
  }

  async getAllPromociones(
    page: number,
    quantity: number,
  ): Promise<PromocionOutput[]> {
    const skip = (page - 1) * quantity;
    const constPromo = await this.promocionRepo.find({
      relations: {
        dia: true,
      },
      skip,
      take: quantity,
    });
    return constPromo.map((promocion) => ({
      id: promocion.id,
      nombre: promocion.nombre,
      porcentajeDescuento: promocion.porcentajeDescuento,
      tipoClienteId: promocion.tipoClienteId,
      dia: promocion.dia.nombre,
    }));
  }
  async getPromocionById(id: number): Promise<PromocionOutput> {
    const constPromocion = await this.promocionRepo.findOne({
      where: { id },
      relations: {
        dia: true,
      },
    });
    if (!constPromocion) throw new Error('404 Promocion not found.');
    return {
      id: constPromocion.id,
      nombre: constPromocion.nombre,
      porcentajeDescuento: constPromocion.porcentajeDescuento,
      tipoClienteId: constPromocion.tipoClienteId,
      dia: constPromocion.dia.nombre,
    };
  }
  async updatePromocion(
    id: number,
    datos: PromocionInput,
  ): Promise<PromocionOutput> {
    const constPromo = await this.promocionRepo.findOne({ where: { id } });
    if (!constPromo) throw new Error('404 Promocion not found.');
    const constDia = await this.diaRepo.findOne({
      where: { nombre: datos.dia },
    });
    if (!constDia) throw new Error('404 Dia not found.');
    constPromo.nombre = datos.nombre;
    constPromo.porcentajeDescuento = datos.porcentajeDescuento;
    constPromo.dia = constDia;
    constPromo.tipoClienteId = await axiosAPIUsuarios.get(
      config.APIUsuariosUrls.validarTipoCliente(constPromo.tipoClienteId),
    );
    if (!constPromo.tipoClienteId) {
      throw new BadRequestException(`Tipo de cliente con id  no válido`);
    }
    await this.promocionRepo.save(constPromo);
    const response: PromocionOutput = {
      id: constPromo.id,
      nombre: constPromo.nombre,
      porcentajeDescuento: constPromo.porcentajeDescuento,
      tipoClienteId: constPromo.tipoClienteId,
      dia: constPromo.dia.nombre,
    };
    return response;
  }

  async deletePromocionById(id: number): Promise<{ message: string }> {
    const constPromo = await this.promocionRepo.findOne({
      where: { id },
    });
    if (!constPromo) throw new Error('404 Promocion  not found.');
    await this.promocionRepo.remove(constPromo);
    return { message: 'Deleted' };
  }

  async verificarPromocionById(
    tipoClienteId: number,
  ): Promise<PromocionMayorDTO | null> {
    // Trae las promociones del repositorio
    const promociones = await this.promocionRepo.find({
      where: { tipoClienteId },
    });

    // Si no hay promociones, lanza excepción
    if (!promociones || promociones.length === 0) {
      throw new BadRequestException(
        'No existen promociones para este tipo de cliente',
      );
    }

    // Busca la de mayor porcentaje
    const promoMayor = promociones.reduce((max, actual) =>
      actual.porcentajeDescuento > max.porcentajeDescuento ? actual : max,
    );

    // Retorna solo id y porcentaje
    return {
      id: promoMayor.id,
      porcentajeDescuento: promoMayor.porcentajeDescuento,
    };
  }
}
