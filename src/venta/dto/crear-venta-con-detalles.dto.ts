import { ApiProperty } from "@nestjs/swagger";
import { CrearVentaDto } from "./crear-venta.dto";
import { CrearDetalleVentaInputDto } from "../../detalle-venta/dto/crear-detalle-venta-input.dto";

export class CrearVentaConDetallesDto {
  @ApiProperty({ type: () => CrearVentaDto, description: 'Datos de la venta' })
  venta: CrearVentaDto;

  @ApiProperty({
    type: () => [CrearDetalleVentaInputDto],
    description: 'Lista de detalles de la venta',
    example: [
      {
        "productoId": null,
        "servicioId": 3,
        "cantidad": 1,
        "precio": 250.00
      },
      {
        "productoId": 2,
        "servicioId": null,
        "cantidad": 1,
        "precio": 100.00
      }
    ]
  })
  detalles: CrearDetalleVentaInputDto[];
}
