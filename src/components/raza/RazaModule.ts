//RazaModule.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RazaService } from './RazaService';
import { RazaController } from './RazaController';
import { RazaEntity } from 'src/entities/Raza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RazaEntity]),],
  controllers: [RazaController],
  providers: [RazaService],
  exports: [RazaService],
})
export class RazaModule {}
