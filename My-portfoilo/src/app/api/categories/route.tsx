import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "5");
    const searchQuery = searchParams.get("search") || "";

    const titleFilter: Prisma.CategoryWhereInput = {};

    if (searchQuery.trim() !== "") {
      titleFilter.title = {
        contains: searchQuery,
      };
    }

    const total = await prisma.category.count({ where: titleFilter });

    const categories = await prisma.category.findMany({
      where: titleFilter,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        projects: true,
      },
    });

    return NextResponse.json(
      {
        data: categories,
        total,
        totalPages: Math.ceil(total / pageSize),
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, title, image, projects } = body;

    if (!userId || !title) {
      return NextResponse.json(
        { message: "userId and title are required" },
        { status: 400 }
      );
    }

    const existingCategory = await prisma.category.findFirst({
      where: {
        userId,
        title,
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: "Category already exists for this user" },
        { status: 400 }
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        userId,
        title,
      },
      include: {
        projects: true,
      },
    });

    return NextResponse.json({ data: newCategory }, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
