import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearCajaDto } from './dto/crear-caja.dto';
import { Caja, TipoMovimiento } from '@prisma/client';

@Injectable()
export class CajaService {
  constructor(private prisma: PrismaService) {}

  // Registrar un Movimiento en Caja
  async registrarMovimiento(data: CrearCajaDto): Promise<Caja> {
    // Verificar si el usuario existe
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { id: data.usuarioId },
    });

    if (!usuarioExistente) {
      throw new NotFoundException(`El usuario con ID ${data.usuarioId} no existe.`);
    }

    // Validar que el monto sea positivo
    if (data.monto <= 0) {
      throw new BadRequestException('El monto debe ser mayor a 0.');
    }

    // Registrar el movimiento en caja
    return this.prisma.caja.create({
      data: {
        usuarioId: data.usuarioId,
        tipo: data.tipo,
        monto: data.monto,
        descripcion: data.descripcion,
      },
    });
  }

  // Todos los Movimientos en Caja
  async obtenerMovimientos(): Promise<Caja[]> {
    return this.prisma.caja.findMany({
      include: {
        usuario: true,
      },
      orderBy: {
        creadoEn: 'desc',
      },
    });
  }

  // Movimiento en Caja por ID
  async obtenerMovimientoPorId(id: number): Promise<Caja> {
    const movimiento = await this.prisma.caja.findUnique({
      where: { id },
      include: {
        usuario: true,
      },
    });

    if (!movimiento) {
      throw new NotFoundException(`Movimiento con ID ${id} no encontrado.`);
    }

    return movimiento;
  }

  // Total en Caja

  async obtenerTotalEnCaja(): Promise<number> {
    const ingresos = await this.prisma.caja.aggregate({
      _sum: { monto: true },
      where: { tipo: "INGRESO" },
    });
  
    const egresos = await this.prisma.caja.aggregate({
      _sum: { monto: true },
      where: { tipo: "EGRESO" },
    });
  
    // ✅ Convertir Decimal a Number antes de hacer la resta
    const totalIngresos = ingresos._sum.monto ? Number(ingresos._sum.monto) : 0;
    const totalEgresos = egresos._sum.monto ? Number(egresos._sum.monto) : 0;
  
    return totalIngresos - totalEgresos;
  }
}
