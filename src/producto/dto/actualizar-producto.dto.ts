import { CrearProductoDto } from './crear-producto.dto';
import { PartialType } from '@nestjs/mapped-types';

export class ActualizarProductoDto extends PartialType(CrearProductoDto) {
//Usando el PartialType convierte todos los campos a opcionales sin necesidad de repetir código :o
}