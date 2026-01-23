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
    Req,
    Headers,
} from '@nestjs/common';
import { PromocionService } from './promocion.service';
import { PromocionInput } from './dto';
import type { RequestWithUser } from './dto';

@Controller('promocion')
export class PromocionController {
    constructor(private readonly promocionService: PromocionService) {
        this.promocionService = promocionService;
    }

    @Post('admin/new')
    create(
        @Body() dato: PromocionInput,
        @Headers('authorization') token: string  // Agregar
    ) {
        return this.promocionService.nuevaPromocion(dato, token);  // Pasar token
    }

    @Get('admin/all')
    getAllPromociones(
        @Query('page') page: number = 1,
        @Query('quantity') quantity: number = 10,
        @Headers('authorization') token: string
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
    @Headers('authorization') token: string,  // Extraer el token del header
    ) {
    return this.promocionService.updatePromocion(id, datos, token);
    }

    @Delete('admin/:id')
    deletePromocionById(@Param('id') id: number) {
        return this.promocionService.deletePromocionById(id);
    }

    @Get('verificar-promocion')
        verificarPromocion(@Query('clienteId') clienteId: string) {
            // Validamos que el ID llegue para evitar nuevos errores
            if (!clienteId) {
                throw new Error('El clienteId es requerido para verificar promociones');
            }
            return this.promocionService.verificarPromocionById(+clienteId);
    }

}
