import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromocionModule } from './promocion/promocion.module';
import { DiaModule } from './dia/dia.module';
import { Promocion } from './entities/promocion.entity';
import { Dia } from './entities/dia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            port: +process.env.PUERTO_BD!,
            database: process.env.PG_DATABASE_MS_USUARIOS,
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
