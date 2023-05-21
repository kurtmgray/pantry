import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: Number(id),
    },
  });
  console.log(recipe);
  return NextResponse.json(recipe);

  // return NextResponse.json({ message: "fuck you" });
  //   const email = request.nextUrl.searchParams.get("recipeId");
  //   if (typeof email === "string") {
  //     try {
  //       const recipes = await prisma.recipe.findMany({
  //         where: {
  //           addedBy: { email: email },
  //         },
  //       });
  //       return NextResponse.json(recipes);
  //     } catch (error) {
  //       return NextResponse.error();
  //     } finally {
  //       await prisma.$disconnect();
  //       console.log("Disconnected from Prisma.");
  //     }
}
