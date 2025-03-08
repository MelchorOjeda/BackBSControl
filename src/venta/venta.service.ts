import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VentaService {
  constructor(private prisma: PrismaService) {}

  async crearVenta(data: Prisma.VentaCreateInput) {
    return this.prisma.venta.create({ data });
  }

  async obtenerVentas() {
    return this.prisma.venta.findMany({ include: { usuario: true, detalles: true } });
  }

  async obtenerVentaPorId(id: number) {
    return this.prisma.venta.findUnique({ where: { id }, include: { usuario: true, detalles: true } });
  }

  async actualizarVenta(id: number, data: Prisma.VentaUpdateInput) {
    return this.prisma.venta.update({ where: { id }, data });
  }

  async eliminarVenta(id: number) {
    return this.prisma.venta.delete({ where: { id } });
  }
}
