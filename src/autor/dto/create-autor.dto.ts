import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateAutorDto {

    @IsString()
    nombre: string

    @IsBoolean()
    @IsOptional()
    activo: boolean
}
