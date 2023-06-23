/*
  Warnings:

  - You are about to drop the column `name` on the `PantryItem` table. All the data in the column will be lost.
  - Added the required column `category` to the `PantryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryLabel` to the `PantryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `PantryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `knownAs` to the `PantryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `PantryItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PantryItem" DROP COLUMN "name",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "categoryLabel" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "knownAs" TEXT NOT NULL,
ADD COLUMN     "label" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Nutrient" (
    "id" SERIAL NOT NULL,
    "enerc_kcal" DOUBLE PRECISION NOT NULL,
    "procnt" DOUBLE PRECISION NOT NULL,
    "fat" DOUBLE PRECISION NOT NULL,
    "chocdf" DOUBLE PRECISION NOT NULL,
    "fibtg" DOUBLE PRECISION NOT NULL,
    "pantryItemId" INTEGER NOT NULL,

    CONSTRAINT "Nutrient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Nutrient" ADD CONSTRAINT "Nutrient_pantryItemId_fkey" FOREIGN KEY ("pantryItemId") REFERENCES "PantryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
