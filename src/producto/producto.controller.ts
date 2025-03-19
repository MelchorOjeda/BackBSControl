import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @Post()
  crear(@Body() data: CrearProductoDto) {
    return this.productoService.crearProducto(data);
  }

  @ApiOperation({ summary: 'Obtener todos los productos' })
  @Get()
  obtenerTodos() {
    return this.productoService.obtenerProductos();
  }

  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @Get(':id')
  obtenerPorId(@Param('id') id: number) {
    return this.productoService.obtenerProductoPorId(Number(id));
  }

  @ApiOperation({ summary: 'Obtener productos por cantidad' })
  @Get('cantidad/:cantidad')
  obtenerPorCantidad(@Param('cantidad') cantidad: number) {
    return this.productoService.obtenerProductosPorCantidad(Number(cantidad));
  }

  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @Put(':id')
  actualizar(@Param('id') id: number, @Body() data: ActualizarProductoDto) {
    return this.productoService.actualizarProducto(Number(id), data);
  }

  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.productoService.eliminarProducto(Number(id));
  }
}
