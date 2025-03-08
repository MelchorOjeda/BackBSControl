import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async crearUsuario(data: CrearUsuarioDto) {
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { correo: data.correo },
    });

    if (usuarioExistente) {
      throw new BadRequestException('El correo ya está registrado.');
    }

    const hashedPassword = await bcrypt.hash(data.contra, 10);

    return this.prisma.usuario.create({
      data: {
        nombres: data.nombres,
        apellido: data.apellido,
        correo: data.correo,
        contra: hashedPassword,
        rol: data.rol,
        telefono: data.telefono,
        foto: data.foto || 'https://mi-servidor.com/default-avatar.png', // Foto por defecto
      },
    });
  }

  async obtenerUsuarios() {
    return this.prisma.usuario.findMany();
  }

  async obtenerUsuarioPorId(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    return usuario;
  }

  async actualizarUsuario(id: number, data: ActualizarUsuarioDto) {
    const usuarioExistente = await this.prisma.usuario.findUnique({ where: { id } });

    if (!usuarioExistente) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    if (data.contra) {
      data.contra = await bcrypt.hash(data.contra, 10);
    }

    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async eliminarUsuario(id: number) {
    const usuarioExistente = await this.prisma.usuario.findUnique({ where: { id } });

    if (!usuarioExistente) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }

    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}
