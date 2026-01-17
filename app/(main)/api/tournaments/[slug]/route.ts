'use server'

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    console.log("Fetching tournament with slug:", slug)

    if (!slug) {
        return NextResponse.json(
            { message: "slug parameter is required" },
            { status: 400 }
        )
    }

    try {
        const tournament = await prisma.tournament.findUnique({
            where: { slug },
            include:{
                participants: {
                    include: {
                        player: true
                    }
                },
                matches: true
            }
        })

        if (!tournament) {
            return NextResponse.error()
        }

        return NextResponse.json(tournament)
    } catch (error) {
        console.error("Error fetching tournament:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}
