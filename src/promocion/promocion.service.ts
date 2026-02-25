import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Promocion } from '../entities/promocion.entity';

import {
  PromocionInput,
  PromocionOutput,
  PromocionMayorDTO,
  PromocionOutputAdmin,
} from './dto';
import { axiosAPIUsuarios } from '../axios_service/axios.client';
import { config } from '../axios_service/env';
import { Dia } from 'src/entities/dia.entity';
import { DiaService } from 'src/dia/dia.service';

@Injectable()
export class PromocionService {
  constructor(
    @InjectRepository(Promocion)
    private readonly promocionRepo: Repository<Promocion>,
    private readonly diaService: DiaService,
  ) {}
  /* Se crea una nueva promoción, validando que el tipo de cliente exista y que el día exista.
  Luego se guarda la promoción en la base de datos y se retorna la información de la promoción creada. */
  async nuevaPromocion(
    dato: PromocionInput,
    token: string,
  ): Promise<PromocionOutput> {
    const { data: constTipoCliente } = await axiosAPIUsuarios.get(
      config.APIUsuariosUrls.validarTipoCliente(dato.tipoClienteId),
      { headers: { Authorization: token } },
    );
    if (!constTipoCliente) {
      throw new BadRequestException(
        `Tipo de cliente con id ${dato.tipoClienteId} no válido`,
      );
    }
    const constDia = await this.diaService.getDiaById(dato.diaId);
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
      diaId: nuevaPromocion.dia.id,
    };
    return response;
  }
  /* Se obtienen las promociones paginadas, validando el token de autorización.
  Luego se mapean las promociones para incluir la información del tipo de cliente y del día
   y se retorna la lista de promociones. */
  async getPromociones(
    page: number,
    quantity: number,
    token: string,
  ): Promise<PromocionOutputAdmin[]> {
    const skip = (page - 1) * quantity;
    const promociones = await this.promocionRepo.find({
      relations: {
        dia: true,
      },
      skip,
      take: quantity,
    });
    return Promise.all(
      promociones.map(async (promocion) => {
        const datosCliente = (
          await axiosAPIUsuarios.get(
            config.APIUsuariosUrls.getTipoClienteById(promocion.tipoClienteId),
            { headers: { Authorization: token } },
          )
        ).data;

        return {
          id: promocion.id,
          nombre: promocion.nombre,
          porcentajeDescuento: promocion.porcentajeDescuento,
          tipoCliente: {
            id: datosCliente.id,
            denominacion: datosCliente.denominacion,
          },
          dia: {
            id: promocion.dia.id,
            nombre: promocion.dia.nombre,
          },
        };
      }),
    );
  }
  // Se obtiene una promoción por su ID, validando que exista.
  //  Luego se retorna la información de la promoción encontrada.
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
      diaId: constPromocion.dia.id,
    };
  }
  async updatePromocion(
    id: number,
    datos: PromocionInput,
    token: string,
  ): Promise<PromocionOutput> {
    const promo = await this.promocionRepo.findOne({
      where: { id },
      relations: { dia: true },
    });

    if (!promo) {
      throw new NotFoundException('Promoción no encontrada');
    }
    const diaExiste = await this.diaService.getDiaById(datos.diaId);
    if (!diaExiste) {
      throw new BadRequestException('Día no encontrado');
    }
    const { data: tipoClienteValido } = await axiosAPIUsuarios.get<boolean>(
      config.APIUsuariosUrls.validarTipoCliente(datos.tipoClienteId),
      {
        headers: {
          Authorization: token, // Pasar el token
        },
      },
    );
    if (!tipoClienteValido) {
      throw new BadRequestException(
        `Tipo de cliente con id ${datos.tipoClienteId} no válido`,
      );
    }
    promo.dia = { id: datos.diaId } as Dia;

    promo.nombre = datos.nombre;
    promo.porcentajeDescuento = datos.porcentajeDescuento;
    promo.tipoClienteId = datos.tipoClienteId;

    await this.promocionRepo.save(promo);

    return {
      id: promo.id,
      nombre: promo.nombre,
      porcentajeDescuento: promo.porcentajeDescuento,
      tipoClienteId: promo.tipoClienteId,
      diaId: promo.dia.id,
    };
  }

  async deletePromocionById(id: number): Promise<void> {
    const constPromo = await this.promocionRepo.findOne({
      where: { id },
    });
    if (!constPromo) throw new Error('404 Promocion  not found.');
    await this.promocionRepo.remove(constPromo);
  }
  /* Se verifica si un cliente tiene una promoción válida para el día actual, 
obteniendo su información a través del ID de usuario. Se retorna el ID de la promocion y el porcentaje
en el caso de haber más de una promoción para el día actual se tomará la del mayor porcentaje*/
  async verificarPromocionById(
    userId: number,
  ): Promise<PromocionMayorDTO | null> {
    const user = await axiosAPIUsuarios.get(
      config.APIUsuariosUrls.getUserById(userId),
    );

    const diasSemana = [
      'DOMINGO',
      'LUNES',
      'MARTES',
      'MIERCOLES',
      'JUEVES',
      'VIERNES',
      'SABADO',
    ];
    const nombreDiaActual = diasSemana[new Date().getDay()];

    const promociones = await this.promocionRepo.find({
      where: {
        tipoClienteId: user.data.role.tipoCliente.id,
        dia: { nombre: nombreDiaActual },
      },
      relations: ['dia'],
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
