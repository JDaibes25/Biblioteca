import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { CreateLibroDto } from './create-libro.dto';

export class UpdateLibroDto extends PartialType(CreateLibroDto) {

    @IsNumber()
    @IsOptional()
    precio?: number

    @IsBoolean()
    @IsOptional()
    activo?: boolean
}
