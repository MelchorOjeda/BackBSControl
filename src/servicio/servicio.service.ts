import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearServicioDto } from './dto/crear-servicio.dto';
import { ActualizarServicioDto } from './dto/actualizar-servicio.dto';

@Injectable()
export class ServicioService {
  constructor(private prisma: PrismaService) {}

  async crearServicio(data: CrearServicioDto) {
    return this.prisma.servicio.create({ data });
  }

  async obtenerServicios() {
    return this.prisma.servicio.findMany();
  }

  async obtenerServicioPorId(id: number) {
    const servicio = await this.prisma.servicio.findUnique({ where: { id } });

    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado.`);
    }

    return servicio;
  }

  async actualizarServicio(id: number, data: ActualizarServicioDto) {
    const servicioExistente = await this.prisma.servicio.findUnique({ where: { id } });

    if (!servicioExistente) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado.`);
    }

    return this.prisma.servicio.update({ where: { id }, data });
  }

  async eliminarServicio(id: number) {
    const servicioExistente = await this.prisma.servicio.findUnique({ where: { id } });

    if (!servicioExistente) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado.`);
    }

    return this.prisma.servicio.delete({ where: { id } });
  }
}
