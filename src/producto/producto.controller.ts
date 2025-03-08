import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Prisma } from '@prisma/client';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @Post()
  crear(@Body() data: Prisma.ProductoCreateInput) {
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
    return this.productoService.obtenerProductoPorId(id);
  }

  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @Delete(':id')
  eliminar(@Param('id') id: number) {
    return this.productoService.eliminarProducto(id);
  }
}
