import { Module } from '@nestjs/common';
import { AutorService } from './autor.service';
import { AutorController } from './autor.controller';
import {  Autor } from './entities/autor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AutorController],
  providers: [AutorService],
  imports: [
    TypeOrmModule.forFeature([
      Autor
    ])
  ]
})
export class AutorModule {}
