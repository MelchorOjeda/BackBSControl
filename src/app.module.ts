import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CitaModule } from './cita/cita.module';                              
import { VentaModule } from './venta/venta.module';
import { CajaModule } from './caja/caja.module';
import { ProductoModule } from './producto/producto.module';
import { AuthModule } from './auth/auth.module';
import { DetalleVentaModule } from './detalle-venta/detalle-venta.module';
import { ServicioModule } from './servicio/servicio.module';

@Module({
  imports: [PrismaModule, UsuarioModule, CitaModule, VentaModule, CajaModule, ProductoModule, AuthModule, DetalleVentaModule, ServicioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
