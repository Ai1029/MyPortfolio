/*
  Warnings:

  - You are about to drop the `YearMonth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Experience` DROP FOREIGN KEY `Experience_finishyear_finishmonth_fkey`;

-- DropForeignKey
ALTER TABLE `Experience` DROP FOREIGN KEY `Experience_startyear_startmonth_fkey`;

-- AlterTable
ALTER TABLE `Experience` MODIFY `finishmonth` INTEGER NOT NULL DEFAULT 2001,
    MODIFY `startmonth` INTEGER NOT NULL DEFAULT 2000;

-- DropTable
DROP TABLE `YearMonth`;

-- CreateTable
CREATE TABLE `Year` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,

    UNIQUE INDEX `Year_id_key`(`id`),
    UNIQUE INDEX `Year_year_key`(`year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Month` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `month` INTEGER NOT NULL,

    UNIQUE INDEX `Month_id_key`(`id`),
    UNIQUE INDEX `Month_month_key`(`month`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_startyear_fkey` FOREIGN KEY (`startyear`) REFERENCES `Year`(`year`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_finishyear_fkey` FOREIGN KEY (`finishyear`) REFERENCES `Year`(`year`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_startmonth_fkey` FOREIGN KEY (`startmonth`) REFERENCES `Month`(`month`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_finishmonth_fkey` FOREIGN KEY (`finishmonth`) REFERENCES `Month`(`month`) ON DELETE RESTRICT ON UPDATE CASCADE;
