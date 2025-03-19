import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException } from '@nestjs/common';
import { VentaService } from './venta.service';
import { CrearVentaDto } from './dto/crear-venta.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { DetalleVenta } from '@prisma/client';
import { CrearVentaConDetallesDto } from './dto/crear-venta-con-detalles.dto';

@ApiTags('Ventas')
@Controller('ventas')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}


  @ApiOperation({ summary: 'Crear una nueva venta con detalles' })
  @ApiBody({ type: CrearVentaConDetallesDto })
  @Post()
  crear(@Body() data: CrearVentaConDetallesDto) {
    if (!data || !data.venta || !data.detalles) {
      throw new BadRequestException('El cuerpo de la solicitud debe contener `venta` y `detalles`.');
    }

    return this.ventaService.crearVenta(data.venta, data.detalles);
  }

  @ApiOperation({ summary: 'Obtener todas las ventas' })
  @Get()
  obtenerTodas() {
    return this.ventaService.obtenerVentas();
  }

  @ApiOperation({ summary: 'Obtener una venta por ID' })
  @Get(':id')
  obtenerPorId(@Param('id') id: number) {
    return this.ventaService.obtenerVentaPorId(Number(id));
  }

  @ApiOperation({ summary: 'Actualizar una venta' })
  @Put(':id')
  actualizarVenta(@Param('id') id: number, @Body() data: Partial<CrearVentaDto>) {
    return this.ventaService.actualizarVenta(Number(id), data);
  }

  @ApiOperation({ summary: 'Eliminar una venta' })
  @Delete(':id')
  eliminarVenta(@Param('id') id: number) {
    return this.ventaService.eliminarVenta(Number(id));
  }
}
