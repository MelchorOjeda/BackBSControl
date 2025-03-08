import { ApiProperty } from "@nestjs/swagger";
import { Rol } from "@prisma/client";
import { IsEmail, IsEnum, IsOptional, IsString, IsUrl, MaxLength, MinLength} from "class-validator";

export class CrearUsuarioDto{
    @ApiProperty({example: 'Victor Gabriel', required: true})
    @IsString()
    nombres: string;
    
    @ApiProperty({example: 'Alvarado Chay', required: true})
    @IsString()
    apellido: string;
    
    @ApiProperty({example: 'VictorChay@gmail.com', required: true, format: 'email'})
    @IsEmail()
    correo: string;
    
    @ApiProperty({example: 'ContraVictor', required: true})
    @IsString()
    @MinLength(8, {message: 'La contraseña debe contener al menos 8 carácteres'})
    @MaxLength(20, {message: 'La contraseña puede tener un máximo de 20 carácteres'})
    contra: string;

    @ApiProperty({example: 'ADMIN', enum: Rol, required: true})
    @IsEnum(Rol)
    rol: Rol;
    
    @ApiProperty({example: '999-999-9999', required: false})
    @IsOptional()
    @IsString()
    telefono?: string;

    @ApiProperty({example: 'foto', required: false})
    @IsOptional()
    @IsString()
    foto?: string;
}