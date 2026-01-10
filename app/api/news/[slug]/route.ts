'use server'

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    if (!slug) {
        return NextResponse.json(
            { message: "slug parameter is required" },
            { status: 400 }
        )
    }

    try {
        const news = await prisma.news.findUnique({
            where: {
                slug: slug,
            },
            include: {
                tags: true
            }
        })

        if (!news) {
            return NextResponse.error()
        }

        return NextResponse.json(news)
    } catch (error) {
        console.error("Error fetching news:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}
