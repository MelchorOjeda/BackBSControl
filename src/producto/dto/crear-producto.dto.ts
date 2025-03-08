import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsNumber } from 'class-validator';

export class CrearProductoDto {

    @ApiProperty({example: 'cera', required: true})
    @IsString()
    nombre: string;

    @ApiProperty({example: 'Ego', required: false})
    @IsOptional()
    @IsString()
    marca?: string;

    @ApiProperty({example: 'Cera extra suave y ligera', required: false})
    @IsOptional()
    @IsString()
    descripcion?: string;

    @ApiProperty({example: 3, required: true})
    @IsInt()
    cantidad: number;

    @ApiProperty({example: 43.00, required: true})
    @IsNumber({maxDecimalPlaces: 2})
    precio: number;

    @ApiProperty({example: 'icono', required: false})
    @IsOptional()
    @IsString()
    icono?: string;
}

