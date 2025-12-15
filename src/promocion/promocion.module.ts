import { Module } from '@nestjs/common';
import { PromocionService } from './promocion.service';
import { PromocionController } from './promocion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocion } from 'src/entities/promocion.entity';
import { DiaService } from 'src/dia/dia.service';
import { DiaModule } from 'src/dia/dia.module';

@Module({
    imports: [TypeOrmModule.forFeature([Promocion]),
        DiaModule],
    controllers: [PromocionController],
    providers: [PromocionService],
    exports: [PromocionService],
})
export class PromocionModule { }
