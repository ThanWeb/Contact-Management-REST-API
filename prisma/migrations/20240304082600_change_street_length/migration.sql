/*
  Warnings:

  - You are about to alter the column `city` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `addresses` MODIFY `street` VARCHAR(255) NULL,
    MODIFY `city` VARCHAR(100) NULL;
