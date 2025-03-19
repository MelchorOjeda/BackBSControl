import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Producto } from '@prisma/client';
import { CrearProductoDto } from './dto/crear-producto.dto';
import { ActualizarProductoDto } from './dto/actualizar-producto.dto';

@Injectable()
export class ProductoService {
  constructor(private prisma: PrismaService) {}

  // Crear Producto
  async crearProducto(data: CrearProductoDto): Promise<Producto> {
    return this.prisma.producto.create({
      data: {
        nombre: data.nombre,
        marca: data.marca,
        descripcion: data.descripcion,
        cantidad: data.cantidad,
        precio: data.precio,
        icono: data.icono , 
      },
    });
  }

  // Todos 
  async obtenerProductos(): Promise<Producto[]> {
    return this.prisma.producto.findMany();
  }

  // Por ID
  async obtenerProductoPorId(id: number): Promise<Producto> {
    const producto = await this.prisma.producto.findUnique({ where: { id } });

    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }

    return producto;
  }

  // Por cantidad
  async obtenerProductosPorCantidad(cantidad: number): Promise<Producto[]> {
    return this.prisma.producto.findMany({
      where: { cantidad },
    });
  }

  // Actualizar 
  async actualizarProducto(id: number, data: ActualizarProductoDto): Promise<Producto> {
    const productoExistente = await this.prisma.producto.findUnique({ where: { id } });

    if (!productoExistente) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }

    return this.prisma.producto.update({
      where: { id },
      data,
    });
  }

  // Eliminar 
  async eliminarProducto(id: number): Promise<Producto> {
    const productoExistente = await this.prisma.producto.findUnique({ where: { id } });

    if (!productoExistente) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }

    return this.prisma.producto.delete({ where: { id } });
  }
}
