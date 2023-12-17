import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/connect";
import { auth } from "@/auth";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    const { id } = params;
    const { title, description, completed } = await request.json();

    if (!session) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    await prisma.todos.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        completed,
      },
    });

    return NextResponse.json({ message: "Todo updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating todo" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    const { id } = params;

    if (!session) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    await prisma.todos.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Todo deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting todo" }, { status: 500 });
  }
}
