import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearVentaDto } from './dto/crear-venta.dto';
import { Prisma, Venta, DetalleVenta, Caja, MetodoPago } from '@prisma/client';
import { CrearDetalleVentaInputDto } from 'src/detalle-venta/dto/crear-detalle-venta-input.dto';

@Injectable()
export class VentaService {
  constructor(private prisma: PrismaService) {}

  // ✅ CREAR VENTA

  async crearVenta(data: CrearVentaDto, detalles: CrearDetalleVentaInputDto[]): Promise<Venta> {
    const usuarioExistente = await this.prisma.usuario.findUnique({ where: { id: data.usuarioId } });
    if (!usuarioExistente) {
      throw new NotFoundException(`El usuario con ID ${data.usuarioId} no existe.`);
    }

    if (detalles.length === 0) {
      throw new BadRequestException('Debe haber al menos un producto o servicio en la venta.');
    }

    for (const detalle of detalles) {
      if (detalle.productoId) {
        const producto = await this.prisma.producto.findUnique({ where: { id: detalle.productoId } });
        if (!producto) throw new NotFoundException(`Producto con ID ${detalle.productoId} no encontrado.`);
        if (producto.cantidad < detalle.cantidad) throw new BadRequestException(`Stock insuficiente para el producto ID ${detalle.productoId}.`);
      }
    }

    return this.prisma.$transaction(async (prisma) => {
      const venta = await prisma.venta.create({
        data: {
          usuarioId: data.usuarioId,
          total: data.total,
          metodoPago: data.metodoPago,
          descripcion: data.descripcion,
        },
      });

      for (const detalle of detalles) {
        await prisma.detalleVenta.create({
          data: {
            ventaId: venta.id,
            productoId: detalle.productoId || null,
            servicioId: detalle.servicioId || null,
            cantidad: detalle.cantidad,
            precio: detalle.precio,
          },
        });

        if (detalle.productoId) {
          await prisma.producto.update({
            where: { id: detalle.productoId },
            data: { cantidad: { decrement: detalle.cantidad } },
          });
        }
      }

      await prisma.caja.create({
        data: {
          usuarioId: data.usuarioId,
          tipo: 'INGRESO',
          monto: data.total,
          descripcion: `Venta #${venta.id}`,
        },
      });

      return venta;
    });
  }

  // ✅ OBTENER TODAS LAS VENTAS
  async obtenerVentas(): Promise<Venta[]> {
    return this.prisma.venta.findMany({ include: { detalles: true } });
  }

  // ✅ OBTENER VENTA POR ID
  async obtenerVentaPorId(id: number): Promise<Venta> {
    const venta = await this.prisma.venta.findUnique({
      where: { id },
      include: { detalles: true },
    });

    if (!venta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada.`);
    }

    return venta;
  }

  // ✅ ACTUALIZAR UNA VENTA
  async actualizarVenta(id: number, data: Partial<CrearVentaDto>): Promise<Venta> {
    const ventaExistente = await this.prisma.venta.findUnique({ where: { id } });

    if (!ventaExistente) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada.`);
    }

    return this.prisma.venta.update({
      where: { id },
      data,
    });
  }

  // ✅ ELIMINAR UNA VENTA
  async eliminarVenta(id: number): Promise<Venta> {
    const ventaExistente = await this.prisma.venta.findUnique({ where: { id } });

    if (!ventaExistente) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada.`);
    }

    return this.prisma.venta.delete({ where: { id } });
  }
}
