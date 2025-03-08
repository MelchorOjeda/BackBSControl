import { PartialType } from "@nestjs/mapped-types";
import { CrearServicioDto } from "./crear-servicio.dto";

export class ActualizarServicioDto extends PartialType(CrearServicioDto) {
    //Usando el PartialType convierte todos los campos a opcionales sin necesidad de repetir código :o
}