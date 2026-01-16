import {NextResponse} from "next/server"
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const filters = await prisma.game.findMany({})

        return NextResponse.json(filters)
    } catch (error) {
        console.error("Error fetching news:", error)
        return NextResponse.json([], {status: 500})
    }
}
