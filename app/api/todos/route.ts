import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/connect";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const { title, description, completed } = await request.json();

    if (!session) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const userId = session.user.id;
    await prisma.todos.create({
      data: {
        title,
        description,
        completed,
        userId,
      },
    });

    return NextResponse.json({ message: "Todo created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating todo" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const todos = await prisma.todos.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching todos" }, { status: 500 });
  }
}
