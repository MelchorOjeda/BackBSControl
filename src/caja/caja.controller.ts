import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CajaService } from './caja.service';
import { Prisma } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Caja')
@Controller('caja')
export class CajaController {
  constructor(private readonly cajaService: CajaService) {}

  @ApiOperation({description:'Crear una caja'})
  @Post()
  crear(@Body() data: Prisma.CajaCreateInput) {
    return this.cajaService.crearMovimiento(data);
  }

  @Get()
  obtenerTodas() {
    return this.cajaService.obtenerMovimientos();
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: number) {
    return this.cajaService.obtenerMovimientoPorId(id);
  }

  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.cajaService.eliminarMovimiento(id);
  }
}
