import { pantryIngredients } from "@/config/mockUserData";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { CustomSession } from "@/lib/types";
// some routes using getServerSession, some using params to look up users/items

export async function GET(request: NextRequest) {
  // const email = request.nextUrl.searchParams.get("email");
  // if (email) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (session) {
    console.log(session);
    try {
      const pantryItems = await prisma.pantryItem.findMany({
        where: {
          userId: parseInt(session.user.id),
        },
      });
      return NextResponse.json(pantryItems);
    } catch (error) {
      return NextResponse.error();
    } finally {
      await prisma.$disconnect();
      console.log("Disconnected from Prisma.");
    }
  } else {
    console.error("No email provided");
    // Handle the case when there is no email provided
  }

  return NextResponse.json(pantryIngredients);
}
