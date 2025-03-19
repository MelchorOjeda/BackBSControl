import { Module } from '@nestjs/common';
import { DetalleVentaService } from './detalle-venta.service';
import { DetalleVentaController } from './detalle-venta.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [DetalleVentaController],
  providers: [DetalleVentaService],
})
export class DetalleVentaModule {}
