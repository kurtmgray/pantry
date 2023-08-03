import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { CustomSession } from "@/lib/types";

export async function GET(request: NextRequest) {
  const session: CustomSession | null = await getServerSession(authOptions);
  if (session) {
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
    return new Response(null, { status: 401, statusText: "Unauthorized" });
  }
}
