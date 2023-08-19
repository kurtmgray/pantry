import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserById } from "@/lib/prisma";
//TODO: finish this to get user -> for use on /profile
//TODO: standardize return on all api routes, use http status codes

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get("id");
    if (userId) {    
      try {
          const recipes = await getUserById(parseInt(userId));
          return NextResponse.json(recipes);
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
  