import { PartialType } from "@nestjs/mapped-types";
import { CrearCitaDto } from "./crear-cita.dto";

export class ActualizarCitaDto extends PartialType(CrearCitaDto) {
    //Usando el PartialType convierte todos los campos a opcionales sin necesidad de repetir código :o
}
