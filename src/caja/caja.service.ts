import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CajaService {
  constructor(private prisma: PrismaService) {}

  async crearMovimiento(data: Prisma.CajaCreateInput) {
    return this.prisma.caja.create({ data });
  }

  async obtenerMovimientos() {
    return this.prisma.caja.findMany({ include: { usuario: true } });
  }

  async obtenerMovimientoPorId(id: number) {
    return this.prisma.caja.findUnique({ where: { id }, include: { usuario: true } });
  }

  async eliminarMovimiento(id: number) {
    return this.prisma.caja.delete({ where: { id } });
  }
}
