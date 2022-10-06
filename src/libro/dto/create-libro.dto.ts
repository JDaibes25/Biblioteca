import { IsBoolean, IsDate, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator"
import { Autor } from '../../autor/entities/autor.entity';
import { Categoria } from '../../categoria/entities/categoria.entity';

export class CreateLibroDto {

    @IsString()
    @MinLength(1)
    nombre: string

    @IsNumber()
    @IsPositive()
    precio: number

    @IsBoolean()
    activo: boolean

    @IsNumber()
    autor: Autor

    @IsNumber()
    categoria: Categoria

}
