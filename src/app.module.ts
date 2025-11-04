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
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'promocion_db',
      username: 'postgres',
      password: 'mipassword',
      synchronize: true,
      entities: [Promocion, Dia],
    }),
    PromocionModule,
    DiaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
