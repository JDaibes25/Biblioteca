import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateAutorDto } from './create-autor.dto';

export class UpdateAutorDto extends PartialType(CreateAutorDto) {

    @IsString()
    @IsOptional()
    nombre: string

    @IsBoolean()
    @IsOptional()
    activo: boolean
}
