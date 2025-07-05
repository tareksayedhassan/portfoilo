import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

interface Serv {
  num?: string;
  title?: string;
  description?: string;
  link?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);

  try {
    const serv = await prisma.services.findUnique({
      where: { id },
    });

    if (!serv) {
      return NextResponse.json({ message: "serv not found" }, { status: 404 });
    }

    return NextResponse.json({ data: serv }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "500 Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  try {
    await prisma.services.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting serv:", error);
    return NextResponse.json(
      { message: "500 Internal Server Error", error: error },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const body = (await request.json()) as Serv;

  try {
    const updatedServ = await prisma.user.update({
      where: { id },
      data: {
        ...(body.num && { num: body.num }),
        ...(body.title && { title: body.title }),
        ...(body.description && { description: body.description }),
        ...(body.link && { link: body.link }),
      },
    });

    return NextResponse.json({ data: updatedServ }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "500 Internal Server Error" },
      { status: 500 }
    );
  }
}
