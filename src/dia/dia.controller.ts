import {
  Controller,
  Put,
  Post,
  Body,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { DiaService } from './dia.service';
import { DiaInput } from './dto';

@Controller('dia')
export class DiaController {
  DiaService: DiaService;
  constructor(private readonly diaService: DiaService) {
    this.diaService = diaService;
  }
  @Post('admin/new')
  create(@Body() dato: DiaInput) {
    return this.diaService.create(dato);
  }
  @Get('admin/all')
  findAllDia() {
    return this.diaService.findAll();
  }
  @Get('admin/:id')
  getDiaById(@Param('id') id: number) {
    return this.diaService.getDiaById(id);
  }
  @Put('edit/:id')
  updateDia(@Param('id') id: number, @Body() dia: DiaInput) {
    return this.diaService.updateDia(id, dia);
  }
  @Delete('admin/:id')
  deleteDia(@Param('id') id: number) {
    return this.diaService.deleteDiaById(id);
  }
  @Get('admin/find/:id')
  findDiaById(@Param('id') id: number) {
    return this.diaService.findDiaById(id);
  }
}
