import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { DetalleVentaService } from './detalle-venta.service';
import { CrearDetalleVentaDto } from './dto/crear-detalle-venta.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Detalles de Venta')
@Controller('detalle-ventas')
export class DetalleVentaController {
  constructor(private readonly detalleVentaService: DetalleVentaService) {}

  @ApiOperation({ summary: 'Crear un nuevo detalle de venta' })
  @Post()
  crear(@Body() data: CrearDetalleVentaDto) {
    return this.detalleVentaService.crearDetalleVenta(data);
  }

  @ApiOperation({ summary: 'Obtener todos los detalles de venta' })
  @Get()
  obtenerTodos() {
    return this.detalleVentaService.obtenerDetallesVenta();
  }

  @ApiOperation({ summary: 'Obtener un detalle de venta por ID' })
  @Get(':id')
  obtenerPorId(@Param('id') id: number) {
    return this.detalleVentaService.obtenerDetalleVentaPorId(Number(id));
  }

  @ApiOperation({ summary: 'Obtener detalles de venta por Venta ID' })
  @Get('venta/:ventaId')
  obtenerPorVenta(@Param('ventaId') ventaId: number) {
    return this.detalleVentaService.obtenerDetallesPorVenta(Number(ventaId));
  }
}
