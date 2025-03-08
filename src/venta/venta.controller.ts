import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { VentaService } from './venta.service';
import { Prisma } from '@prisma/client';

@Controller('ventas')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  @Post()
  crear(@Body() data: Prisma.VentaCreateInput) {
    return this.ventaService.crearVenta(data);
  }

  @Get()
  obtenerTodas() {
    return this.ventaService.obtenerVentas();
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: number) {
    return this.ventaService.obtenerVentaPorId(id);
  }

  @Put(':id')
  actualizar(@Param('id') id: number, @Body() data: Prisma.VentaUpdateInput) {
    return this.ventaService.actualizarVenta(id, data);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.ventaService.eliminarVenta(id);
  }
}
    