-- AlterTable
ALTER TABLE `SkillLevel` ADD COLUMN `levelperleft` INTEGER NOT NULL DEFAULT 0,
    ALTER COLUMN `levelper` DROP DEFAULT;
