import {NextResponse} from "next/server"
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)

        const page = Number(searchParams.get("page") ?? 1)
        const limit = Number(searchParams.get("limit") ?? 6)

        const skip = (page - 1) * limit

        const [players, total] = await Promise.all([
            prisma.player.findMany({
                skip,
                take: limit,
                orderBy: {
                    rating: "desc",
                },
            }),
            prisma.player.count(),
        ])

        return NextResponse.json({
            players,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error("Error fetching players:", error)
        return NextResponse.json({ data: [], meta: null }, { status: 500 })
    }
}
