import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsOptional, Min } from "class-validator";

export class CrearDetalleVentaDto {
    @ApiProperty({ example: 1, required: true })
    @IsInt()
    ventaId: number;

    @ApiProperty({ example: 2, required: false })
    @IsOptional()
    @IsInt()
    productoId?: number;

    @ApiProperty({ example: 3, required: false })
    @IsOptional()
    @IsInt()
    servicioId?: number;

    @ApiProperty({ example: 2, required: true })
    @IsInt()
    @Min(0, {message:'La cantidad no puede ser menor a 0'})
    cantidad: number;

    @ApiProperty({ example: 100.00, required: true })
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0, {message: 'La cantidad no puede ser menor a 0'})
    precio: number;
}
