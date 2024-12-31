import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(
    _request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params
    console.log(id)

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    return NextResponse.json({
        id: user?.id,
        username: user?.username,
        email: user?.email,
    });
}