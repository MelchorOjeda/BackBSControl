import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CajaService } from './caja.service';
import { CrearCajaDto } from './dto/crear-caja.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Caja')
@Controller('caja')
export class CajaController {
  constructor(private readonly cajaService: CajaService) {}

  @ApiOperation({ summary: 'Registrar un movimiento en caja' })
  @Post()
  registrarMovimiento(@Body() data: CrearCajaDto) {
    return this.cajaService.registrarMovimiento(data);
  }

  @ApiOperation({ summary: 'Obtener todos los movimientos en caja' })
  @Get()
  obtenerTodos() {
    return this.cajaService.obtenerMovimientos();
  }

  @ApiOperation({ summary: 'Obtener un movimiento en caja por ID' })
  @Get(':id')
  obtenerPorId(@Param('id') id: number) {
    return this.cajaService.obtenerMovimientoPorId(Number(id));
  }

  @ApiOperation({ summary: 'Obtener el total disponible en caja' })
  @Get('/total')
  obtenerTotalEnCaja() {
    return this.cajaService.obtenerTotalEnCaja();
  }
}
