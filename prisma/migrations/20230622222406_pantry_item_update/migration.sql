/*
  Warnings:

  - You are about to drop the column `quantity` on the `PantryItem` table. All the data in the column will be lost.
  - You are about to drop the column `units` on the `PantryItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PantryItem" DROP COLUMN "quantity",
DROP COLUMN "units";
