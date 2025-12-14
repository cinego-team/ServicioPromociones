import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { PromocionService } from './promocion.service';
import { PromocionInput } from './dto';

@Controller('promocion')
export class PromocionController {
  constructor(private readonly promocionService: PromocionService) {
    this.promocionService = promocionService;
  }

  @Post('new')
  create(@Body() dato: PromocionInput) {
    return this.promocionService.nuevaPromocion(dato);
  }

  @Get('admin/all')
  getAllPromociones(
    @Query('page') page: number = 1,
    @Query('quantity') quantity: number = 10,
  ) {
    return this.promocionService.getPromociones(+page, +quantity);
  }

  @Get(':id')
  getPromocionById(@Param('id') id: number) {
    return this.promocionService.getPromocionById(id);
  }

  @Put('edit/:id/admin')
  updatePromocion(@Param('id') id: number, @Body() promocion: PromocionInput) {
    return this.promocionService.updatePromocion(id, promocion);
  }

  @Delete(':id/admin')
  deletePromocionById(@Param('id') id: number) {
    return this.promocionService.deletePromocionById(id);
  }

  @Get('verificar-promocion/:id')
  verificarPromocion(@Param('id') id: number) {
    return this.promocionService.verificarPromocionById(user.id);
  }
}
