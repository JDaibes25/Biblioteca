import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateCategoriaDto {

    @IsString()
    nombre: string

    @IsBoolean()
    @IsOptional()
    activo: boolean
}
