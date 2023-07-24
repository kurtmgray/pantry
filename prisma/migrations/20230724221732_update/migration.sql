-- DropForeignKey
ALTER TABLE "Nutrient" DROP CONSTRAINT "Nutrient_pantryItemId_fkey";

-- AddForeignKey
ALTER TABLE "Nutrient" ADD CONSTRAINT "Nutrient_pantryItemId_fkey" FOREIGN KEY ("pantryItemId") REFERENCES "PantryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
