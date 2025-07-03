import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "5");
    const searchQuery = searchParams.get("search") || "";

    const nameFilter =
      searchQuery.trim() !== ""
        ? {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          }
        : {};

    const total = await prisma.user.count({ where: nameFilter });

    const users = await prisma.user.findMany({
      where: nameFilter,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        data: users,
        total,
        totalPages: Math.ceil(total / pageSize),
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
