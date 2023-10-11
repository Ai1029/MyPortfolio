-- AlterTable
ALTER TABLE `Experience` ADD COLUMN `company` VARCHAR(191) NULL,
    ADD COLUMN `experiencecategoryID` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `finishmonth` INTEGER NOT NULL DEFAULT 11,
    ADD COLUMN `finishyear` INTEGER NOT NULL DEFAULT 2001,
    ADD COLUMN `startmonth` INTEGER NOT NULL DEFAULT 10,
    ADD COLUMN `startyear` INTEGER NOT NULL DEFAULT 2000;

-- AlterTable
ALTER TABLE `SkillLevel` ALTER COLUMN `levelperleft` DROP DEFAULT;

-- AlterTable
ALTER TABLE `User` MODIFY `password` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `ExperienceCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `ExperienceCategory_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YearMonth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,

    UNIQUE INDEX `YearMonth_id_key`(`id`),
    UNIQUE INDEX `YearMonth_year_month_key`(`year`, `month`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_experiencecategoryID_fkey` FOREIGN KEY (`experiencecategoryID`) REFERENCES `ExperienceCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_startyear_startmonth_fkey` FOREIGN KEY (`startyear`, `startmonth`) REFERENCES `YearMonth`(`year`, `month`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Experience` ADD CONSTRAINT `Experience_finishyear_finishmonth_fkey` FOREIGN KEY (`finishyear`, `finishmonth`) REFERENCES `YearMonth`(`year`, `month`) ON DELETE RESTRICT ON UPDATE CASCADE;
