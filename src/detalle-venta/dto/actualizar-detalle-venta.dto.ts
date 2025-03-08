import { PartialType } from '@nestjs/swagger';
import { CrearDetalleVentaDto } from './crear-detalle-venta.dto';

export class ActualizarDetalleVentaDto extends PartialType(CrearDetalleVentaDto) {
    //Usando el PartialType convierte todos los campos a opcionales sin necesidad de repetir código :o
}
