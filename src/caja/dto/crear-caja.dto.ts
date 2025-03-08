import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, IsInt } from 'class-validator';
import { TipoMovimiento } from '@prisma/client';

export class CrearCajaDto {
    @ApiProperty({ example: '1', required: true})
    @IsInt()
    usuarioId: number;

    @ApiProperty({ example: 'INGRESO', enum: TipoMovimiento, required: true })
    @IsEnum(TipoMovimiento)
    tipo: TipoMovimiento;

    @ApiProperty({ example: 200.00, required: true })
    @IsNumber({ maxDecimalPlaces: 2 })
    monto: number;

    @ApiProperty({ example: 'Pago de cliente', required: false })
    @IsOptional()
    @IsString()
    descripcion?: string;
}
