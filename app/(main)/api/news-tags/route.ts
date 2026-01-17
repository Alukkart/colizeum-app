import {NextResponse} from "next/server"
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const newsTags = await prisma.newsTag.findMany({})

        return NextResponse.json({
            newsTags
        })
    } catch (error) {
        console.error("Error fetching players:", error)
        return NextResponse.json({ data: [], meta: null }, { status: 500 })
    }
}
