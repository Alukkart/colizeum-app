import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)

        const page = Number(searchParams.get("page") ?? 1)
        const limit = Number(searchParams.get("limit") ?? 6)

        const skip = (page - 1) * limit

        const [tournaments, total] = await Promise.all([
            prisma.tournament.findMany({
                skip,
                take: limit,
                orderBy: {
                    date: "asc",
                },
                include: {
                    game: true,
                    _count: {
                        select: {
                            teams: true,
                        }
                    }
                },
            }),
            prisma.tournament.count(),
        ])

        return NextResponse.json({
            tournaments,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error("Error fetching tournaments:", error)
        return NextResponse.json({ data: [], meta: null }, { status: 500 })
    }
}
