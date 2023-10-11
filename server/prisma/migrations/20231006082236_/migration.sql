/*
  Warnings:

  - You are about to drop the column `finishmonth` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `finishyear` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `startmonth` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `startyear` on the `Experience` table. All the data in the column will be lost.
  - Added the required column `finishmonthID` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finishyearID` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startmonthID` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startyearID` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Experience` DROP FOREIGN KEY `Experience_finishmonth_fkey`;

-- DropForeignKey
ALTER TABLE `Experience` DROP FOREIGN KEY `Experience_finishyear_fkey`;

-- DropForeignKey
ALTER TABLE `Experience` DROP FOREIGN KEY `Experience_startmonth_fkey`;

-- DropForeignKey
ALTER TABLE `Experience` DROP FOREIGN KEY `Experience_startyear_fkey`;

-- DropIndex
DROP INDEX `Experience_finishyear_finishmonth_fkey` ON `Experience`;

-- DropIndex
DROP INDEX `Experience_startyear_startmonth_fkey` ON `Experience`;

-- AlterTable
ALTER TABLE `Experience` DROP COLUMN `finishmonth`,
    DROP COLUMN `finishyear`,
    DROP COLUMN `startmonth`,
    DROP COLUMN `startyear`,
    ADD COLUMN `finishmonthID` INTEGER NOT NULL,
    ADD COLUMN `finishyearID` INTEGER NOT NULL,
    ADD COLUMN `startmonthID` INTEGER NOT NULL,
    ADD COLUMN `startyearID` INTEGER NOT NULL,
    ALTER COLUMN `experiencecategoryID` DROP DEFAULT;

-- AlterTable
ALTER TABLE `ExperienceCategory` ALTER COLUMN `name` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Month` MODIFY `month` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Year` MODIFY `year` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_startyearID_fkey` FOREIGN KEY (`startyearID`) REFERENCES `Year`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_finishyearID_fkey` FOREIGN KEY (`finishyearID`) REFERENCES `Year`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_startmonthID_fkey` FOREIGN KEY (`startmonthID`) REFERENCES `Month`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_finishmonthID_fkey` FOREIGN KEY (`finishmonthID`) REFERENCES `Month`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
