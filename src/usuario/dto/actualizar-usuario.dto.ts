import { PartialType } from "@nestjs/mapped-types";
import { CrearUsuarioDto } from "./crear-usuario.dto";

export class ActualizarUsuarioDto extends PartialType(CrearUsuarioDto) {
    //Usando el PartialType convierte todos los campos a opcionales sin necesidad de repetir código :o
}
