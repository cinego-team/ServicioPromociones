import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromocionModule } from './promocion/promocion.module';
import { DiaModule } from './dia/dia.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promocion } from './entities/promocion.entity';
import { Dia } from './entities/dia.entity';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        database: 'mspromociones',
        username: 'postgres',
        password: 'grupou',
        entities: [Promocion, Dia],
        synchronize: true,
    }),
        PromocionModule, DiaModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
