import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductoService {
  constructor(private prisma: PrismaService) {}

  async crearProducto(data: Prisma.ProductoCreateInput) {
    return this.prisma.producto.create({ data });
  }

  async obtenerProductos() {
    return this.prisma.producto.findMany();
  }

  async obtenerProductoPorId(id: number) {
    return this.prisma.producto.findUnique({ where: { id } });
  }

  async eliminarProducto(id: number) {
    return this.prisma.producto.delete({ where: { id } });
  }
}
