import {NextResponse} from "next/server"
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const players = await prisma.player.findMany({
            take: 8,
            include: {
                tournaments: true,
                achievements: true,
            }
        })
        return NextResponse.json(players)
    } catch (error) {
        console.error("Error fetching players:", error)
        return NextResponse.json([], {status: 500})
    }
}
