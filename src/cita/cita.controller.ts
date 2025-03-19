import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException } from '@nestjs/common';
import { CitaService } from './cita.service';
import { CrearCitaDto } from './dto/crear-cita.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Cita, EstadoCita } from '@prisma/client';
import { ActualizarCitaDto } from './dto/actualizar-cita.dto';

@ApiTags('Citas')
@Controller('citas')
export class CitaController {
  constructor(private readonly citaService: CitaService) {}

  @ApiOperation({ summary: 'Crear una nueva cita' })
  @Post()
  crear(@Body() data: CrearCitaDto) {
    return this.citaService.crearCita(data);
  }

  @ApiOperation({ summary: 'Obtener todas las citas' })
  @Get()
  obtenerTodas() {
    return this.citaService.obtenerCitas();
  }

  @ApiOperation({ summary: 'Obtener una cita por ID' })
  @Get(':id')
  obtenerPorId(@Param('id') id: number) {
    return this.citaService.obtenerCitaPorId(Number(id));
  }

  @ApiOperation({ summary: 'Obtener citas por fecha' })
  @Get('fecha/:fecha')
  obtenerPorFecha(@Param('fecha') fecha: string) {
    return this.citaService.obtenerCitasPorFecha(fecha);
  }

  @ApiOperation({ summary: 'Obtener citas por barbero' })
  @Get('barbero/:barberoId')
  obtenerPorBarbero(@Param('barberoId') barberoId: number) {
    return this.citaService.obtenerCitasPorBarbero(Number(barberoId));
  }

  @ApiOperation ({ summary: 'Obtener citas por estado'})
  @Get('estado/:estado')
  obtenerPorEstado(@Param('estado') estado: EstadoCita){
    return this.citaService.obtenerCitasPorEstado(estado);
  }

  @ApiOperation({ summary: 'Actualizar de una cita' })
  @Put(':id')
  actualizar(@Param('id') id: number, @Body() data: ActualizarCitaDto) {
    return this.citaService.actualizarCita(Number(id), data);
  }

  @ApiOperation({ summary: 'Eliminar una cita' })
  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.citaService.eliminarCita(Number(id));
  }
}
