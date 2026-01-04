import {NextResponse} from "next/server"
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const news = await prisma.news.findMany({take: 3})

        return NextResponse.json(news)
    } catch (error) {
        console.error("Error fetching news:", error)
        return NextResponse.json([], {status: 500})
    }
}
