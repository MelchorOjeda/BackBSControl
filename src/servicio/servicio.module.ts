import { Module } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { CitaModule } from 'src/cita/cita.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[CitaModule, UsuarioModule, ServicioModule, PrismaModule],
  controllers: [ServicioController],
  providers: [ServicioService],
})
export class ServicioModule {}
