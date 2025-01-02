import { NextRequest,  NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request: NextRequest) {
    try {
        const userId = request.nextUrl.searchParams.get("userId")

        console.log(userId)

        if (!userId) {
            return NextResponse.json({
                message: "User id not found"
            });
        }

        const incomes = await prisma.income.findMany(
            {
                where: {
                    userId: userId
                }
            }
        )

        if (!incomes) {
            return NextResponse.json({
                message: "Incomes not found"
            });
        }

        return NextResponse.json(
            {
                "incomes": incomes,
                "total": incomes.length
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