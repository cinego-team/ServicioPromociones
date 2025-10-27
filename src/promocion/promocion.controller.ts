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

  @Post()
  create(@Body() dato: PromocionInput) {
    return this.promocionService.nuevaPromocion(dato);
  }

  @Get()
  getAllPromociones(
    @Query('page') page: number = 1,
    @Query('quantity') quantity: number = 10,
  ) {
    return this.promocionService.getAllPromociones(+page, +quantity);
  }
  /*
    @Get(':id')
     getPromocionById(@Param("id") id: number) {
          return this.promocionService.getPromocionById(id);
      }
    @Put("edit/:id")
      updatePromocion(
          @Param("id") id: number, @Body() promocion: PromocionInput ) {
          return this.promocionService.updatePromocion(id, promocion);
      }
    @Patch("edit/:id")
      updateParcialPromocion(
          @Param("id") id: number, @Body() promocion: Partial<PromocionInput> ) {
          return this.promocionService.updateParcialPromocion(id, promocion);
      }
     @Delete(":id")
      deletePromocionById(@Param("id") id: number) {
          return this.promocionService.deletePromocionById(id);
      }
  */
  @Get('verificar-promocion/:id')
  verificarPromocion(@Param('id') id: number) {
    return this.promocionService.verificarPromocionById(user.id);
  }
}
