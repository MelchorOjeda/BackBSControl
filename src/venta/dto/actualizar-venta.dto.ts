import { PartialType } from "@nestjs/mapped-types";
import { CrearVentaDto } from "./crear-venta.dto";

export class ActualizarVentaDto extends PartialType(CrearVentaDto) {
    //Usando el PartialType convierte todos los campos a opcionales sin necesidad de repetir código :o
}