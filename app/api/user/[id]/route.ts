import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(_request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            return NextResponse.json({
                message: "User not found"
            });
        }
        
        return NextResponse.json({
            id: user?.id,
            username: user?.username,
            email: user?.email,
        });
    } catch (error) {
        return {
            status: 500,
            message: "Something went wrong",
            error: error
        }
    }
}

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params

    try {
        await prisma.user.delete({
            where: {
                id: id
            }
        })

    } catch (error) {
        return {
            status: 500,
            message: "Something went wrong",
            error: error
        }
    }
}
