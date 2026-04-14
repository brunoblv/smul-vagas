/*
  Warnings:

  - You are about to drop the column `semestreMinimo` on the `vaga` table. All the data in the column will be lost.
  - You are about to drop the column `totalSemestres` on the `vaga` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `vaga` DROP COLUMN `semestreMinimo`,
    DROP COLUMN `totalSemestres`,
    MODIFY `modalidade` VARCHAR(191) NOT NULL DEFAULT 'Presencial';
