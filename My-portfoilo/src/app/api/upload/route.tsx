import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import prisma from "@/utils/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const type = formData.get("type"); // "user" or "project"

    if (type === "user") {
      const userId = parseInt(formData.get("userId") as string);
      const file = formData.get("file") as File;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      await fs.writeFile(`./public/uploads/${file.name}`, buffer);

      // تحديث المستخدم
      await prisma.user.update({
        where: { id: userId },
        data: { avatar: file.name },
      });

      return NextResponse.json({ status: "user-avatar-uploaded" });
    }

    if (type === "project") {
      const projectId = parseInt(formData.get("projectId") as string);
      const files = formData.getAll("files") as File[];

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        await fs.writeFile(`./public/uploads/${file.name}`, buffer);

        await prisma.image.create({
          data: {
            url: file.name,
            projectId,
          },
        });
      }

      return NextResponse.json({ status: "project-images-uploaded" });
    }

    return NextResponse.json({ status: "unknown-type" }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "fail", error }, { status: 500 });
  }
}
