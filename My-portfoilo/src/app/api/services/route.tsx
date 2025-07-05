import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
export async function GET(req: NextRequest) {
  try {
    const services = await prisma.services.findMany();

    return NextResponse.json(
      {
        data: services,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { num, title, description, link } = body;
    const AddServ = await prisma.services.create({
      data: {
        num,
        title,
        description,
        link,
      },
    });
    return (
      NextResponse.json({
        message: "Service added successfully",
        data: AddServ,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
