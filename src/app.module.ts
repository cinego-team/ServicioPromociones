import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromocionModule } from './promocion/promocion.module';
import { DiaModule } from './dia/dia.module';
import { Promocion } from './entities/promocion.entity';
import { Dia } from './entities/dia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: Number(process.env.PUERTO_BD),
            database: process.env.PG_DATABASE_MS_PROMOCIONES,
            username: process.env.PG_USERNAME,
            password: process.env.PG_PASSWORD,
            synchronize: true,
            entities: [Promocion, Dia],
        }),
        PromocionModule,
        DiaModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
