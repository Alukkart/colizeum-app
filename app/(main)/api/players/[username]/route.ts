'use server'

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ username: string }> }) {
    const { username } = await params

    console.log("Fetching player with username:", username)

    if (!username) {
        return NextResponse.json(
            { message: "Username parameter is required" },
            { status: 400 }
        )
    }

    try {
        const player = await prisma.player.findUnique({
            where: {
                username: username,
            },
            include: {
                tournaments: {
                    include: {
                        tournament: true,
                    }
                },
            },
        })

        if (!player) {
            return NextResponse.error()
        }

        return NextResponse.json(player)
    } catch (error) {
        console.error("Error fetching player:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}
