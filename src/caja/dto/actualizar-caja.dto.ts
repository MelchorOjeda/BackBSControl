import { PartialType } from "@nestjs/mapped-types";
import { CrearCajaDto } from "./crear-caja.dto";

export class ActualizarCajaDto extends PartialType(CrearCajaDto) {
    //Usando el PartialType convierte todos los campos a opcionales sin necesidad de repetir código :o
}
