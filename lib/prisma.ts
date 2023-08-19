import { PrismaClient } from "@prisma/client";
import { RecipeCategory } from "@prisma/client";

export const prisma = new PrismaClient();

export async function getUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUsersByEmail(email: string) {
  return prisma.user.findMany({ where: { email } });
}

export async function getRecipeById(id: number) {
  return prisma.recipe.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getRecipesByUserId(id: number) {
  return prisma.recipe.findMany({
    where: {
      addedBy: { id: id },
    },
  });
}

export async function postNewRecipe(recipe: RecipeDB) {
  return prisma.recipe.create({
    data: {
      addedBy: { connect: { id: recipe.addedById } }, // adds User, connecting by email in param
      title: recipe.title,
      summary: recipe.summary,
      category: recipe.category as RecipeCategory,
      ingredients: { set: recipe.ingredients },
      instructions: { set: recipe.instructions },
      preptime: recipe.preptime,
      cooktime: recipe.cooktime,
      rating: recipe.rating || null,
      image: recipe.image,
    },
  });
}

export async function getPantryItemsByUserId(id: number) {
  return prisma.pantryItem.findMany({
    where: {
      userId: id,
    },
  });
}

export async function postNewPantryItem(
  brand: string,
  category: string,
  categoryLabel: string,
  label: string,
  knownAs: string,
  image: string,
  nutrients: {
    ENERC_KCAL: number;
    PROCNT: number;
    FAT: number;
    CHOCDF: number;
  },
  id: number
) {
  return prisma.pantryItem.create({
    data: {
      brand: brand ? brand : undefined,
      label: label,
      userId: id,
      knownAs: knownAs,
      category: category,
      categoryLabel: categoryLabel,
      image: image,
      nutrients: {
        create: {
          enerc_kcal: nutrients.ENERC_KCAL,
          procnt: nutrients.PROCNT,
          fat: nutrients.FAT,
          chocdf: nutrients.CHOCDF,
        },
      },
    },
  });
}

export async function deletePantryItem(id: number) {
  return prisma.pantryItem.delete({
    where: {
      id: id,
    },
  });
}
