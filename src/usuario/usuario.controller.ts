import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @Post()
  crear(@Body() data: CrearUsuarioDto) {
    return this.usuarioService.crearUsuario(data);
  }

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @Get()
  obtenerTodos() {
    return this.usuarioService.obtenerUsuarios();
  }

  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @Get(':id')
  obtenerPorId(@Param('id') id: number) {
    return this.usuarioService.obtenerUsuarioPorId(Number(id));
  }

  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @Put(':id')
  actualizar(@Param('id') id: number, @Body() data: ActualizarUsuarioDto) {
    return this.usuarioService.actualizarUsuario(Number(id), data);
  }

  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.usuarioService.eliminarUsuario(Number(id));
  }
}
