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
  @Post()
  create(@Body() dato: DiaInput) {
    return this.diaService.create(dato);
  }
  @Get()
  findAllDia() {
    return this.diaService.findAll();
  }
  @Get(':id')
  getDiaById(@Param('id') id: number) {
    return this.diaService.getDiaById(id);
  }
  @Put('edit/:id')
  updateDia(@Param('id') id: number, @Body() dia: DiaInput) {
    return this.diaService.updateDia(id, dia);
  }
  //patch por ver porque solo es un campo
  @Delete(':id')
  deleteDia(@Param('id') id: number) {
    return this.diaService.deleteDiaById(id);
  }
  @Get('admmin/find')
  findDiaById(@Param('id') id: number) {
    return this.diaService.findDiaById(id);
  }
}
