import { prisma } from "./prisma";

export async function getRecipesAddedByUser(email: string) {
  // extra step... lookup recipe by email?
  // const user = await prisma.user.findUnique({
  //   where: {
  //     email,
  //   },
  // });
  // const id = user?.id;
  const recipes = await prisma.recipe.findMany({
    where: {
      addedBy: { email: email },
    },
  });
  return recipes;
}
