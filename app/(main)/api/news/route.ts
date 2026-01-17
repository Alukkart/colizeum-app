import {NextResponse} from "next/server"
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)

        const page = Number(searchParams.get("page") ?? 1)
        const limit = Number(searchParams.get("limit") ?? 6)
        const tag = searchParams.get('tag') ?? undefined
        const skip = (page - 1) * limit

        const where = tag
            ? {
                tags: {
                    some: {
                        name: tag,
                    },
                },
            }
            : undefined

        const [news, total] = await Promise.all([
            prisma.news.findMany({
                where,
                skip,
                take: limit,
                orderBy: { publishedAt: 'desc' },
                include: {
                    tags: true,
                },
            }),
            prisma.news.count({ where }),
        ])


        return NextResponse.json({
            news,
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
