import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promocion } from '../entities/promocion.entity';
import { TipoClienteService } from '../servicios/tipoCliente.service';
import { PromocionInput, PromocionOutput } from './dto';

@Injectable()
export class PromocionService {
    diaRepo: any;
    constructor(
        @InjectRepository(Promocion) private readonly promocionRepo: Repository<Promocion>,
        private readonly tipoClienteService: TipoClienteService,
        
    ) { }
    
async nuevaPromocion(datos: PromocionInput): Promise<PromocionOutput> {
  // Validar tipo de cliente vía microservicio
  if (datos.tipoClienteId) {
    const constTipoCliente = await this.tipoClienteService.validarTipoCliente(datos.tipoClienteId);
    if (!constTipoCliente) {
      throw new BadRequestException(`Tipo de cliente con id ${datos.tipoClienteId} no válido`);
    }
  }

  // Validar día existente
  const constDia = await this.diaRepo.findOne({
    where: { id: datos.diaId },
  });
  if (!constDia) throw new Error("404 Día no encontrado.");

  // Crear promoción
  const promocion = this.promocionRepo.create({
    nombre: datos.nombre,
    porcentajeDescuento: datos.porcentajeDescuento,
    tipoClienteId: datos.tipoClienteId,
    dia: { id: datos.diaId }, // 👈 relación correcta
  });

  await this.promocionRepo.save(promocion);

  const response: PromocionOutput = {
    id: promocion.id,
    nombre: promocion.nombre,
    porcentajeDescuento: promocion.porcentajeDescuento,
    tipoClienteId: promocion.tipoClienteId,
    diaId: constDia.id, 
  };

  return response;
}
   async getAllPromociones(page: number, quantity: number): Promise<PromocionOutput[]> {
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
            diaId: promocion.dia.id,
        }));
    }
    async getPromocionById(id: number): Promise<PromocionOutput> {
        const constPromocion = await this.promocionRepo.findOne({
            where: { id },
            relations: {
                dia: true,
            },
        });
        if (!constPromocion) throw new Error("404 Promocion not found.");
        return {
            id: constPromocion.id,
            nombre: constPromocion.nombre,
            porcentajeDescuento: constPromocion.porcentajeDescuento,
            tipoClienteId: constPromocion.tipoClienteId,  
            diaId: constPromocion.dia.id,
        };
    }
     async updatePromocion(id: number, datos: PromocionInput): Promise<PromocionOutput> {
        const constPromo = await this.promocionRepo.findOne({ where: { id } });
        if (!constPromo) throw new Error('404 Promocion not found.');
        const constDia = await this.diaRepo.findOne({ where: { id: datos.diaId } });
        if (!constDia) throw new Error('404 Dia not found.');
        constPromo.nombre = datos.nombre;
        constPromo.porcentajeDescuento = datos.porcentajeDescuento;
        constPromo.tipoClienteId=datos.tipoClienteId
        constPromo.dia = constDia;
        await this.promocionRepo.save(constPromo);
        const response: PromocionOutput = {
            id: constPromo.id,
            nombre: constPromo.nombre,
            porcentajeDescuento: constPromo.porcentajeDescuento,
            tipoClienteId: constPromo.tipoClienteId,
            diaId: constPromo.dia.id
        };
        return response;
    }
        async updateParcialPromocion(id: number, datos: Partial<PromocionInput>): Promise<PromocionOutput> {
        const constPromo = await this.promocionRepo.findOne({ where: { id } });
        if (!constPromo) throw new Error('404 Promocion not found.');
      if (datos.tipoClienteId) {
     const constTipoCliente = await this.tipoClienteService.validarTipoCliente(datos.tipoClienteId);
      if (!constTipoCliente) {
        throw new BadRequestException(`Tipo de cliente con id ${datos.tipoClienteId} no válido`);
      }
   }
        if (datos.diaId) {
            const constDia = await this.diaRepo.findOne({ where: { id: datos.diaId } });
            if (!constDia) throw new Error('404 Dia not found.');
            constPromo.dia = constDia;
        }
        
        if (datos.nombre) constPromo.nombre = datos.nombre;
        if (datos.porcentajeDescuento) constPromo.porcentajeDescuento = datos.porcentajeDescuento;
        if (datos.tipoClienteId) constPromo.tipoClienteId = datos.tipoClienteId;

        await this.promocionRepo.save(constPromo);
        const updatedPromo = await this.promocionRepo.findOne({ where: { id }, relations: { dia: true } });
        if (!updatedPromo) throw new Error('404 Promocion not found after update.');

        const response: PromocionOutput = {
            id: updatedPromo.id,
            nombre: updatedPromo.nombre,
            porcentajeDescuento: updatedPromo.porcentajeDescuento,
            tipoClienteId: updatedPromo.tipoClienteId,
            diaId: updatedPromo.dia.id,
        };
        return response;
    }
      async deletePromocionById(id: number): Promise<{ message: string }> {
        const constPromo = await this.promocionRepo.findOne({
            where: { id },
        });
        if (!constPromo) throw new Error("404 Promocion  not found.");
        await this.promocionRepo.remove(constPromo);
        return { message: "Deleted" };
    }
    }

   



