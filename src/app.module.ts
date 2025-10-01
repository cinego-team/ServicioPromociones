import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromocionModule } from './promocion/promocion.module';
import { DiaModule } from './dia/dia.module';

@Module({
  imports: [PromocionModule, DiaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
