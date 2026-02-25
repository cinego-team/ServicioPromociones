import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Query,
  Headers,
} from '@nestjs/common';
import { PromocionService } from './promocion.service';
import { PromocionInput } from './dto';

@Controller('promocion')
export class PromocionController {
  constructor(private readonly promocionService: PromocionService) {
    this.promocionService = promocionService;
  }
  //funciones CRUD
  @Post('admin/new')
  create(
    @Body() dato: PromocionInput,
    @Headers('authorization') token: string,
  ) {
    return this.promocionService.nuevaPromocion(dato, token);
  }

  @Get('admin/all')
  getAllPromociones(
    @Query('page') page: number = 1,
    @Query('quantity') quantity: number = 10,
    @Headers('authorization') token: string,
  ) {
    return this.promocionService.getPromociones(+page, +quantity, token);
  }

  @Get('admin/:id')
  getPromocionById(@Param('id') id: number) {
    return this.promocionService.getPromocionById(id);
  }

  @Put('admin/:id')
  async update(
    @Param('id') id: number,
    @Body() datos: PromocionInput,
    @Headers('authorization') token: string, // Extraer el token del header
  ) {
    return this.promocionService.updatePromocion(id, datos, token);
  }

  @Delete('admin/:id')
  deletePromocionById(@Param('id') id: number) {
    return this.promocionService.deletePromocionById(id);
  }
  //verificar promocion por id del cliente
  @Get('verificar-promocion/:id')
  verificarPromocion(@Param('id') id: number) {
    return this.promocionService.verificarPromocionById(id);
  }
}
