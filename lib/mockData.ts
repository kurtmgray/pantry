const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { hash } from "bcrypt";

type User = {
  name: string;
  email: string;
  password: string;
  role: string;
};
type Ingredient = {
  name: string;
  quantity: number;
  units: string;
};

// enum Ingredientunits {
//   GRAMS,
//   MILLILITERS,
//   TEASPOONS,
//   TABLESPOONS,
//   CUPS,
//   PINTS,
//   QUARTS,
//   GALLONS,
//   POUNDS,
//   PIECES,
//   SLICES,
//   PACKAGE,
// }
type Recipe = {
  addedBy: User;
  title: string;
  summary: string;
  category: string;
  ingredients: Ingredient[];
  instructions: string[];
  preptime: string;
  cooktime: string;
  rating: number | null;
  tags: string[];
};
export async function addUsersToDB(users: User[]) {
  try {
    for (let user of users) {
      const hashed = await hash(user.password, 12);
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashed, // assuming you want the password to match the username
          pantry: { create: [] },
          recipes: { create: [] },
          role: user.role,
          favoriteRecipes: { create: [] },
        },
      });
    }
    console.log("Users added to database!");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function addRecipesToDB(recipes: Recipe[]) {
  try {
    for (const recipe of recipes) {
      const newRecipe = await prisma.recipe.create({
        data: {
          addedBy: { connect: { email: recipe.addedBy.email } },
          title: recipe.title,
          summary: recipe.summary,
          category: recipe.category,
          ingredients: {
            create: recipe.ingredients.map((ingredient: Ingredient) => ({
              ...ingredient,
              units: { connect: { name: ingredient.units } },
            })),
          },
          instructions: { set: recipe.instructions },
          preptime: recipe.preptime,
          cooktime: recipe.cooktime,
          rating: recipe.rating,
          tags: {
            connectOrCreate: recipe.tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        },
      });

      console.log(`Created recipe with ID: ${newRecipe.id}`);
    }
  } catch (error) {
    console.error(error);
  }
}

export const users = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    password: "John",
    role: "USER",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    password: "Sarah",
    role: "USER",
  },
  {
    name: "Michael Williams",
    email: "michael.williams@example.com",
    password: "Michael",
    role: "USER",
  },
  {
    name: "Emily Brown",
    email: "emily.brown@example.com",
    password: "Emily",
    role: "USER",
  },
  {
    name: "William Jones",
    email: "william.jones@example.com",
    password: "William",
    role: "USER",
  },
  {
    name: "Samantha Davis",
    email: "samantha.davis@example.com",
    password: "Samantha",
    role: "USER",
  },
  {
    name: "Christopher Garcia",
    email: "christopher.garcia@example.com",
    password: "Christopher",
    role: "USER",
  },
  {
    name: "Ashley Rodriguez",
    email: "ashley.rodriguez@example.com",
    password: "Ashley",
    role: "USER",
  },
  {
    name: "Jessica Martinez",
    email: "jessica.martinez@example.com",
    password: "Jessica",
    role: "USER",
  },
  {
    name: "David Hernandez",
    email: "david.hernandez@example.com",
    password: "David",
    role: "USER",
  },
  {
    name: "Amanda Smith",
    email: "amanda.smith@example.com",
    password: "Amanda",
    role: "USER",
  },
  {
    name: "James Johnson",
    email: "james.johnson@example.com",
    password: "James",
    role: "USER",
  },
  {
    name: "Jennifer Williams",
    email: "jennifer.williams@example.com",
    password: "Jennifer",
    role: "USER",
  },
  {
    name: "Daniel Brown",
    email: "daniel.brown@example.com",
    password: "Daniel",
    role: "USER",
  },
  {
    name: "Melissa Jones",
    email: "melissa.jones@example.com",
    password: "Melissa",
    role: "USER",
  },
  {
    name: "Joshua Davis",
    email: "joshua.davis@example.com",
    password: "Joshua",
    role: "USER",
  },
  {
    name: "Kimberly Garcia",
    email: "kimberly.garcia@example.com",
    password: "Kimberly",
    role: "USER",
  },
  {
    name: "Andrew Rodriguez",
    email: "andrew.rodriguez@example.com",
    password: "Andrew",
    role: "USER",
  },
  {
    name: "Elizabeth Martinez",
    email: "elizabeth.martinez@example.com",
    password: "Elizabeth",
    role: "USER",
  },
  {
    name: "Jose Hernandez",
    email: "jose.hernandez@example.com",
    password: "Jose",
    role: "USER",
  },
];

export const recipes = [
  {
    addedBy: {
      name: "James Johnson",
      email: "james.johnson@example.com",
      password: "James",
      role: "USER",
    },
    title: "Spaghetti Carbonara",
    summary:
      "A classic Italian pasta dish made with bacon, eggs, and Parmesan cheese.",
    category: "DINNER",
    ingredients: [
      { name: "spaghetti", quantity: 1, units: "pound" },
      { name: "bacon", quantity: 6, units: "slices" },
      { name: "garlic", quantity: 3, units: "cloves, minced" },
      { name: "eggs", quantity: 3, units: "large" },
      { name: "Parmesan cheese", quantity: 1, units: "cup, grated" },
      { name: "salt and black pepper", quantity: 1, units: "to taste" },
    ],
    instructions: [
      "Cook the spaghetti according to the package instructions.",
      "Meanwhile, cook the bacon in a large skillet over medium heat until crispy. Remove the bacon from the pan and chop into small pieces.",
      "In the same skillet, add the minced garlic and cook for 1-2 minutes until fragrant.",
      "In a bowl, whisk together the eggs and Parmesan cheese.",
      "When the spaghetti is done cooking, reserve 1 cup of the pasta water and drain the rest.",
      "Add the cooked spaghetti to the skillet with the garlic and toss to combine.",
      "Remove the skillet from the heat and pour in the egg mixture, tossing quickly to coat the spaghetti and create a creamy sauce. The residual heat from the spaghetti will cook the eggs.",
      "If the pasta seems dry, add some of the reserved pasta water to the skillet and toss to combine.",
      "Add the chopped bacon to the skillet and toss to combine.",
      "Season with salt and black pepper to taste and serve immediately.",
    ],
    preptime: "10 minutes",
    cooktime: "20 minutes",
    rating: null,
    tags: ["Italian", "Pasta", "Bacon"],
    usersWhoFavorited: [],
  },
  {
    addedBy: {
      name: "Daniel Brown",
      email: "daniel.brown@example.com",
      password: "Daniel",
      role: "USER",
    },
    title: "Teriyaki Chicken Bowls",
    summary: "A delicious and healthy Asian-inspired dish.",
    category: "DINNER",
    ingredients: [
      { name: "Chicken Breast", quantity: 2, units: "pieces" },
      { name: "Soy Sauce", quantity: 0.25, units: "cup" },
      { name: "Honey", quantity: 0.25, units: "cup" },
      { name: "Rice Vinegar", quantity: 2, units: "tbsp" },
      { name: "Garlic", quantity: 2, units: "cloves, minced" },
      { name: "Ginger", quantity: 1, units: "inch, grated" },
      { name: "Sesame Oil", quantity: 1, units: "tsp" },
      { name: "Cooked Brown Rice", quantity: 2, units: "cups" },
      { name: "Broccoli", quantity: 1, units: "head, chopped" },
      { name: "Carrots", quantity: 2, units: "sliced" },
      { name: "Green Onions", quantity: 2, units: "sliced" },
      { name: "Sesame Seeds", quantity: 1, units: "tbsp" },
    ],
    instructions: [
      "In a small bowl, whisk together soy sauce, honey, rice vinegar, garlic, ginger, and sesame oil.",
      "Cut chicken into bite-sized pieces and add to a large bowl. Pour half of the sauce over the chicken and stir to coat. Reserve the other half of the sauce.",
      "Heat a large skillet over medium-high heat. Add the chicken and cook until browned and cooked through, about 5-7 minutes.",
      "Meanwhile, steam the broccoli and carrots until tender.",
      "Divide the rice into bowls. Top with the chicken, broccoli, carrots, and green onions.",
      "Drizzle the reserved sauce over each bowl and sprinkle with sesame seeds.",
    ],
    preptime: "15 minutes",
    cooktime: "20 minutes",
    rating: null,
    tags: ["Asian", "Healthy", "Meal Prep"],
    usersWhoFavorited: [],
  },
  {
    addedBy: {
      name: "Amanda Smith",
      email: "amanda.smith@example.com",
      password: "Amanda",
      role: "USER",
    },
    title: "Garlic Butter Steak Bites",
    summary: "Tender and juicy steak bites in a garlic butter sauce.",
    category: "DINNER",
    ingredients: [
      { name: "Sirloin Steak", quantity: 1, units: "lb" },
      { name: "Garlic", quantity: 4, units: "cloves, minced" },
      { name: "Butter", quantity: 0.25, units: "cup" },
      { name: "Olive Oil", quantity: 2, units: "tbsp" },
      { name: "Salt", quantity: 1, units: "tsp" },
      { name: "Pepper", quantity: 0.5, units: "tsp" },
      { name: "Parsley", quantity: 2, units: "tbsp, chopped" },
    ],
    instructions: [
      "Cut steak into bite-sized pieces and season with salt and pepper.",
      "Heat olive oil in a large skillet over high heat. Add steak and cook for 2-3 minutes, until browned on all sides.",
      "Reduce heat to medium and add garlic, butter, and parsley to the skillet. Stir until the butter has melted and the garlic is fragrant.",
      "Cook for an additional 1-2 minutes, stirring frequently, until the steak is cooked to your liking.",
      "Serve hot with your favorite side dishes.",
    ],
    preptime: "10 minutes",
    cooktime: "10 minutes",
    rating: null,
    tags: ["Steak"],
  },
];
