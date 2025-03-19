import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearDetalleVentaDto } from './dto/crear-detalle-venta.dto';
import { DetalleVenta, Prisma } from '@prisma/client';

@Injectable()
export class DetalleVentaService {
  constructor(private prisma: PrismaService) {}

  // Crear un Detalle de Venta
  async crearDetalleVenta(data: CrearDetalleVentaDto): Promise<DetalleVenta> {
    // 🔹 Verificar si la venta existe
    const ventaExistente = await this.prisma.venta.findUnique({
      where: { id: data.ventaId },
    });

    if (!ventaExistente) {
      throw new NotFoundException(`La venta con ID ${data.ventaId} no existe.`);
    }

    // Validar que se incluya al menos un producto o servicio
    if (!data.productoId && !data.servicioId) {
      throw new BadRequestException('Debe especificar un producto o un servicio en el detalle de la venta.');
    }

    // Validar si el producto existe y tiene suficiente stock
    if (data.productoId) {
      const producto = await this.prisma.producto.findUnique({
        where: { id: data.productoId },
      });

      if (!producto) {
        throw new NotFoundException(`Producto con ID ${data.productoId} no encontrado.`);
      }

      if (producto.cantidad < data.cantidad) {
        throw new BadRequestException(`Stock insuficiente para el producto ID ${data.productoId}.`);
      }
    }

    // Crear el detalle de la venta en la base de datos
    const detalleVenta = await this.prisma.detalleVenta.create({
      data: {
        ventaId: data.ventaId,
        productoId: data.productoId || null,
        servicioId: data.servicioId || null,
        cantidad: data.cantidad,
        precio: data.precio,
      },
    });

    // Si es un producto, actualizar el stock
    if (data.productoId) {
      await this.prisma.producto.update({
        where: { id: data.productoId },
        data: { cantidad: { decrement: data.cantidad } },
      });
    }

    return detalleVenta;
  }

  // Todos los Detalles de Ventas
  async obtenerDetallesVenta(): Promise<DetalleVenta[]> {
    return this.prisma.detalleVenta.findMany({
      include: {
        venta: true,
        producto: true,
        servicio: true,
      },
    });
  }

  // Detalle de Venta por Id
  async obtenerDetalleVentaPorId(id: number): Promise<DetalleVenta> {
    const detalleVenta = await this.prisma.detalleVenta.findUnique({
      where: { id },
      include: {
        venta: true,
        producto: true,
        servicio: true,
      },
    });

    if (!detalleVenta) {
      throw new NotFoundException(`Detalle de Venta con ID ${id} no encontrado.`);
    }

    return detalleVenta;
  }

  // Detalles de Venta por VentaId
  async obtenerDetallesPorVenta(ventaId: number): Promise<DetalleVenta[]> {
    return this.prisma.detalleVenta.findMany({
      where: { ventaId },
      include: {
        producto: true,
        servicio: true,
      },
    });
  }
}
