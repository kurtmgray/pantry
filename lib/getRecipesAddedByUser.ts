import { prisma } from "./prisma";

export async function getRecipesAddedByUser(userId: string) {
  const recipes = await prisma.recipe.findMany({
    where: {
      addedById: Number(userId),
    },
  });
  return recipes;
}
