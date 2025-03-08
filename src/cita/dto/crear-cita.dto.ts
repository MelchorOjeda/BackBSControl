import { ApiProperty } from "@nestjs/swagger";
import { EstadoCita } from "@prisma/client";
import { IsDateString, IsEnum, IsInt, IsString } from "class-validator";

export class CrearCitaDto{
    @ApiProperty({example: 1, required: true})
    @IsInt()
    clienteId: number;

    @ApiProperty({example: 1, required: true})
    @IsInt()
    barberoId: number;

    @ApiProperty({example: 1, required: true})
    @IsInt()
    servicioId: number;

    @ApiProperty({ example: "2025-03-12", required: true }) 
    @IsDateString()
    fecha: string;

    @ApiProperty({ example: "12:00:00", required: true }) 
    @IsString()
    hora: string;

    @ApiProperty({ example: 'PENDIENTE', enum: EstadoCita, required: true })
    @IsEnum(EstadoCita, { message: "Estado inválido. Usa: PENDIENTE, CONFIRMADA, CANCELADA o FINALIZADA" })
    estado: EstadoCita;
}
