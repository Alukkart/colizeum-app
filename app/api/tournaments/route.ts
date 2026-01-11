import {NextResponse} from "next/server"
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const tournaments = await prisma.tournament.findMany({})

        return NextResponse.json(tournaments)
    } catch (error) {
        console.error("Error fetching tournaments:", error)
        return NextResponse.json([], {status: 500})
    }
}
