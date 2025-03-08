import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearCitaDto } from './dto/crear-cita.dto';
import { EstadoCita, Cita } from '@prisma/client';

@Injectable()
export class CitaService {
  constructor(private prisma: PrismaService) {}

  async crearCita(data: CrearCitaDto): Promise<Cita> {
    const fechaHoraISO = new Date(`${data.fecha}T${data.hora}`);
  
    if (isNaN(fechaHoraISO.getTime())) {
      throw new BadRequestException('Fecha u hora inválida.');
    }
  
    const servicioExistente = await this.prisma.servicio.findUnique({
      where: { id: data.servicioId },
    });
  
    if (!servicioExistente) {
      throw new BadRequestException(`El servicio con ID ${data.servicioId} no existe.`);
    }
  
    const citaExistente = await this.prisma.cita.findFirst({
      where: {
        barberoId: data.barberoId,
        fechaHora: fechaHoraISO,
      },
    });
  
    if (citaExistente) {
      throw new BadRequestException('El barbero ya tiene una cita en ese horario.');
    }
  
    return this.prisma.cita.create({
      data: {
        clienteId: data.clienteId,
        barberoId: data.barberoId,
        servicioId: data.servicioId,
        fechaHora: fechaHoraISO,
        estado: 'CONFIRMADA',
      },
    });
  }
  

  async obtenerCitas() {
    return this.prisma.cita.findMany({
      include: { cliente: true, barbero: true, servicio: true },
    });
  }

  async obtenerCitaPorId(id: number) {
    const cita = await this.prisma.cita.findUnique({
      where: { id },
      include: { cliente: true, barbero: true, servicio: true },
    });

    if (!cita) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada.`);
    }
    return cita;
  }

  async obtenerCitasPorFecha(fecha: string) {
    return this.prisma.cita.findMany({
      where: {
        fechaHora: {
          gte: new Date(`${fecha}T00:00:00.000Z`),
          lt: new Date(`${fecha}T23:59:59.999Z`),
        },
      },
      include: { cliente: true, barbero: true, servicio: true },
    });
  }

  async obtenerCitasPorBarbero(barberoId: number) {
    return this.prisma.cita.findMany({
      where: { barberoId },
      include: { cliente: true, servicio: true },
    });
  }

  async actualizarEstadoCita(id: number, estado: EstadoCita) {
    const cita = await this.prisma.cita.findUnique({ where: { id } });

    if (!cita) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada.`);
    }

    return this.prisma.cita.update({
      where: { id },
      data: { estado },
    });
  }

  async eliminarCita(id: number) {
    const cita = await this.prisma.cita.findUnique({ where: { id } });

    if (!cita) {
      throw new NotFoundException(`Cita con ID ${id} no encontrada.`);
    }

    return this.prisma.cita.delete({ where: { id } });
  }
}
