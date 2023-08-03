import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  if (id) { 
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: Number(id),
      },
    });
    console.log(recipe);
    return NextResponse.json(recipe);
  } else {
    console.error("No recipe ID provided.");
  }
}
