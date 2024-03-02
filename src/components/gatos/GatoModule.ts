//GatoModule.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatoService } from './GatoService';
import { GatoController } from './GatoController';
import { GatoEntity } from 'src/entities/Gato.entity';
import { RazaEntity } from 'src/entities/Raza.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GatoEntity, RazaEntity])],
  controllers: [GatoController],
  providers: [GatoService],
  exports: [GatoService],
})
export class GatoModule {}
