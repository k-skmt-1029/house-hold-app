import { NextRequest,  NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request: NextRequest) {
    try {
        const userId = request.nextUrl.searchParams.get("userId")

        if (!userId) {
            return NextResponse.json({
                message: "User id not found"
            });
        }

        const expenses = await prisma.expense.findMany(
            {
                where: {
                    userId: userId
                }
            }
        )

        if (!expenses) {
            return NextResponse.json({
                message: "expenses not found"
            });
        }

        return NextResponse.json(
            {
                "expenses": expenses,
                "total": expenses.length
            }
        );
    } catch (error) {
        return {
            status: 500,
            message: "Something went wrong",
            error: error
        }
    }
}