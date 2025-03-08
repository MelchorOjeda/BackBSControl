import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { CrearServicioDto } from './dto/crear-servicio.dto';
import { ActualizarServicioDto } from './dto/actualizar-servicio.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Servicios')
@Controller('servicios')
export class ServicioController {
  constructor(private readonly servicioService: ServicioService) {}

  @ApiOperation({ summary: 'Crear un nuevo servicio' })
  @Post()
  crear(@Body() data: CrearServicioDto) {
    return this.servicioService.crearServicio(data);
  }

  @ApiOperation({ summary: 'Obtener todos los servicios' })
  @Get()
  obtenerTodos() {
    return this.servicioService.obtenerServicios();
  }

  @ApiOperation({ summary: 'Obtener un servicio por ID' })
  @Get(':id')
  obtenerPorId(@Param('id') id: number) {
    return this.servicioService.obtenerServicioPorId(Number(id));
  }

  @ApiOperation({ summary: 'Actualizar un servicio por ID' })
  @Put(':id')
  actualizar(@Param('id') id: number, @Body() data: ActualizarServicioDto) {
    return this.servicioService.actualizarServicio(Number(id), data);
  }

  @ApiOperation({ summary: 'Eliminar un servicio por ID' })
  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.servicioService.eliminarServicio(Number(id));
  }
}
