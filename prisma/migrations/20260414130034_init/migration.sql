-- CreateTable
CREATE TABLE `Vaga` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `departamento` VARCHAR(191) NOT NULL,
    `modalidade` VARCHAR(191) NOT NULL DEFAULT 'Híbrido',
    `descricaoAtividades` VARCHAR(191) NOT NULL,
    `habilidadesDesejaveis` VARCHAR(191) NULL,
    `curso` VARCHAR(191) NOT NULL,
    `semestreMinimo` INTEGER NOT NULL,
    `totalSemestres` INTEGER NOT NULL,
    `cargaHoraria` INTEGER NOT NULL,
    `bolsaAuxilio` DECIMAL(65, 30) NOT NULL,
    `valeTransporte` DECIMAL(65, 30) NOT NULL,
    `prazoInscricoes` DATETIME(3) NOT NULL,
    `numeroVagas` INTEGER NOT NULL,
    `responsavel` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'ativa',
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EtapaProcesso` (
    `id` VARCHAR(191) NOT NULL,
    `ordem` INTEGER NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `vagaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EtapaProcesso` ADD CONSTRAINT `EtapaProcesso_vagaId_fkey` FOREIGN KEY (`vagaId`) REFERENCES `Vaga`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
