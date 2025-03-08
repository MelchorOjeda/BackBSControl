import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CrearServicioDto{
    @ApiProperty({example: 'Low Fade', required: true})
    @IsString()
    nombre: string;

    @ApiProperty({example: 200.00, required: true})
    @IsNumber({maxDecimalPlaces: 2})
    @Min(0, {message: 'El valor no puede ser menor que 0'})
    precio: number;

    @ApiProperty({example: 40, required: false})
    @IsOptional()
    @IsInt()
    @Min(1, {message: 'La duración debe ser de al menos 1 minuto'})
    duracion?: number;

    @ApiProperty({example: 'Corte bajo de caballero', required: false})
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiProperty({example: 'icono', required: false})
    @IsOptional()
    @IsString()
    icono?: string;

    @ApiProperty({example: 1, required: false})
    @IsOptional()
    @IsInt()
    barberoId?: number;

}
