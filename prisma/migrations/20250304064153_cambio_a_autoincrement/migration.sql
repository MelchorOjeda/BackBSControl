/*
  Warnings:

  - The primary key for the `Caja` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Caja` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `usuarioId` on the `Caja` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Cita` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Cita` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `clienteId` on the `Cita` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `barberoId` on the `Cita` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `servicioId` on the `Cita` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `DetalleVenta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `DetalleVenta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `ventaId` on the `DetalleVenta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `productoId` on the `DetalleVenta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `servicioId` on the `DetalleVenta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Producto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Producto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Servicio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Servicio` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `barberoId` on the `Servicio` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `contraseña` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Usuario` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Venta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Venta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `usuarioId` on the `Venta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[correo]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apellido` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contra` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correo` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombres` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Caja` DROP FOREIGN KEY `Caja_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `Cita` DROP FOREIGN KEY `Cita_barberoId_fkey`;

-- DropForeignKey
ALTER TABLE `Cita` DROP FOREIGN KEY `Cita_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `Cita` DROP FOREIGN KEY `Cita_servicioId_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleVenta` DROP FOREIGN KEY `DetalleVenta_productoId_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleVenta` DROP FOREIGN KEY `DetalleVenta_servicioId_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleVenta` DROP FOREIGN KEY `DetalleVenta_ventaId_fkey`;

-- DropForeignKey
ALTER TABLE `Servicio` DROP FOREIGN KEY `Servicio_barberoId_fkey`;

-- DropForeignKey
ALTER TABLE `Venta` DROP FOREIGN KEY `Venta_usuarioId_fkey`;

-- DropIndex
DROP INDEX `Caja_usuarioId_fkey` ON `Caja`;

-- DropIndex
DROP INDEX `Cita_barberoId_fkey` ON `Cita`;

-- DropIndex
DROP INDEX `Cita_clienteId_fkey` ON `Cita`;

-- DropIndex
DROP INDEX `Cita_servicioId_fkey` ON `Cita`;

-- DropIndex
DROP INDEX `DetalleVenta_productoId_fkey` ON `DetalleVenta`;

-- DropIndex
DROP INDEX `DetalleVenta_servicioId_fkey` ON `DetalleVenta`;

-- DropIndex
DROP INDEX `DetalleVenta_ventaId_fkey` ON `DetalleVenta`;

-- DropIndex
DROP INDEX `Servicio_barberoId_fkey` ON `Servicio`;

-- DropIndex
DROP INDEX `Usuario_email_key` ON `Usuario`;

-- DropIndex
DROP INDEX `Venta_usuarioId_fkey` ON `Venta`;

-- AlterTable
ALTER TABLE `Caja` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `usuarioId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Cita` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `clienteId` INTEGER NOT NULL,
    MODIFY `barberoId` INTEGER NOT NULL,
    MODIFY `servicioId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `DetalleVenta` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `ventaId` INTEGER NOT NULL,
    MODIFY `productoId` INTEGER NULL,
    MODIFY `servicioId` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Producto` DROP PRIMARY KEY,
    ADD COLUMN `descripcion` VARCHAR(191) NULL,
    ADD COLUMN `icono` VARCHAR(191) NULL,
    ADD COLUMN `marca` VARCHAR(191) NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Servicio` DROP PRIMARY KEY,
    ADD COLUMN `descripcion` VARCHAR(191) NULL,
    ADD COLUMN `icono` VARCHAR(191) NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `duracion` INTEGER NULL,
    MODIFY `barberoId` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Usuario` DROP PRIMARY KEY,
    DROP COLUMN `contraseña`,
    DROP COLUMN `email`,
    DROP COLUMN `nombre`,
    ADD COLUMN `apellido` VARCHAR(191) NOT NULL,
    ADD COLUMN `contra` VARCHAR(191) NOT NULL,
    ADD COLUMN `correo` VARCHAR(191) NOT NULL,
    ADD COLUMN `foto` VARCHAR(191) NULL,
    ADD COLUMN `nombres` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Venta` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `usuarioId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_correo_key` ON `Usuario`(`correo`);

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_barberoId_fkey` FOREIGN KEY (`barberoId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Servicio` ADD CONSTRAINT `Servicio_barberoId_fkey` FOREIGN KEY (`barberoId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleVenta` ADD CONSTRAINT `DetalleVenta_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `Venta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleVenta` ADD CONSTRAINT `DetalleVenta_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Producto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleVenta` ADD CONSTRAINT `DetalleVenta_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Caja` ADD CONSTRAINT `Caja_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
