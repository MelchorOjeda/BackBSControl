import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsOptional, Min } from "class-validator";
import { OmitType } from "@nestjs/mapped-types";
import { CrearDetalleVentaDto } from "./crear-detalle-venta.dto";

export class CrearDetalleVentaInputDto extends OmitType(CrearDetalleVentaDto, ['id', 'ventaId'] as const) {
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
  @Min(1, { message: 'La cantidad no puede ser menor a 1' })
  cantidad: number;

  @ApiProperty({ example: 100.00, required: true })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0, { message: 'El precio no puede ser menor a 0' })
  precio: number;
}
