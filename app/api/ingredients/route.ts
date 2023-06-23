import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { CustomSession } from "@/lib/types";

//GET request to search for an ingredient to add
//POST request to add the ingredient to Postgres

export async function GET(request: NextRequest) {
  const ingredient = request.nextUrl.searchParams.get("ingr");
  console.log("ingr: ", ingredient);
  if (ingredient) {
    try {
      const queryString = `?app_id=${process.env.NEXT_PUBLIC_EDAMAM_APP_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_API_KEY}&ingr=${ingredient}`;
      const data = await fetch(
        `https://api.edamam.com/api/food-database/v2/parser${queryString}`
      );
      const json = await data.json();
      return NextResponse.json(json);
    } catch (error) {
      console.log("err:", error);
      return NextResponse.error();
    } finally {
      await prisma.$disconnect();
      console.log("Disconnected from Prisma.");
    }
  }
}

export async function POST(request: NextRequest) {
  const data: EdamamIngredient[] = await request.json();
  const session: CustomSession | null = await getServerSession(authOptions);
  if (data.length > 0) {
    const {
      food: {
        category,
        categoryLabel,
        label,
        knownAs,
        image,
        nutrients: { ENERC_KCAL, PROCNT, FAT, CHOCDF },
      },
    } = data[0];
    if (session) {
      try {
        const pantryItem = await prisma.pantryItem.create({
          data: {
            label: label,
            userId: parseInt(session.user.id),
            knownAs: knownAs,
            category: category,
            categoryLabel: categoryLabel,
            image: image,
            nutrients: {
              create: {
                enerc_kcal: ENERC_KCAL,
                procnt: PROCNT,
                fat: FAT,
                chocdf: CHOCDF,
              },
            },
          },
        });
        console.log("Created PantryItem:", pantryItem);
        return NextResponse.json(pantryItem);
      } catch (error) {
        console.error("Error creating PantryItem:", error);
        // Handle the error when creating the pantry item
      } finally {
        await prisma.$disconnect();
      }
    } else {
      console.error("No session available");
      // Handle the case when there is no session available
    }
  }
}
