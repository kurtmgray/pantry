/*
  Warnings:

  - You are about to drop the column `measurementId` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the `Measurement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_measurementId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "measurementId";

-- DropTable
DROP TABLE "Measurement";
