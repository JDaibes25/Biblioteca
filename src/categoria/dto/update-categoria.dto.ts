import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsSemVer, IsString } from 'class-validator';
import { CreateCategoriaDto } from './create-categoria.dto';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {

    @IsString()
    @IsOptional()
    nombre: string

    @IsBoolean()
    @IsOptional()
    activo: boolean
}
