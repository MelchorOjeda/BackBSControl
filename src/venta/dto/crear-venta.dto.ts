import { ApiProperty } from "@nestjs/swagger";
import { MetodoPago } from "@prisma/client";
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CrearVentaDto{
    @ApiProperty({example: 1, required: true})
    @IsInt()
    usuarioId: number;

    @ApiProperty({example: 290.00, required:true})
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2  })
    @Min(0,{message: 'El valor no puede ser negativo'})
    total: number;

    @ApiProperty({example: 'EFECTIVO', enum: MetodoPago, required: true})
    @IsEnum(MetodoPago)
    metodoPago: MetodoPago;

    @ApiProperty({example: 'Pago de servicio y producto', required: false})
    @IsOptional()
    @IsString()
    descripcion?: string;

}