import { Module } from '@nestjs/common';
import { PromocionService } from './promocion.service';
import { PromocionController } from './promocion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocion } from 'src/entities/promocion.entity';
import { TipoClienteService } from 'src/servicios/tipoCliente.service';

@Module({
    imports: [TypeOrmModule.forFeature([Promocion])],
    controllers: [PromocionController],
    providers: [PromocionService, TipoClienteService],
    exports: [PromocionService],
})
export class PromocionModule { }
