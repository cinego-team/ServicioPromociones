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

    @Get('admin/:id')
    getPromocionById(@Param('id') id: number) {
        return this.promocionService.getPromocionById(id);
    }

    @Put('admin/:id')
    updatePromocion(@Param('id') id: number, @Body() promocion: PromocionInput) {
        return this.promocionService.updatePromocion(id, promocion);
    }

    @Delete('admin/:id')
    deletePromocionById(@Param('id') id: number) {
        return this.promocionService.deletePromocionById(id);
    }

    @Get('verificar-promocion')
    verificarPromocion(@Req() req: RequestWithUser) {
        return this.promocionService.verificarPromocionById(req.user.id);
    }
}
