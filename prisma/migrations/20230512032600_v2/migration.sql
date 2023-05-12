/*
  Warnings:

  - Changed the type of `units` on the `Ingredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "units",
ADD COLUMN     "units" TEXT NOT NULL;
