'use server'

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ nickname: string }> }) {
    const { nickname } = await params

    console.log("Fetching player with nickname:", nickname)

    if (!nickname) {
        return NextResponse.json(
            { message: "nickname parameter is required" },
            { status: 400 }
        )
    }

    try {
        const player = await prisma.player.findUnique({
            where: {
                nickname: nickname,
            },
            include: {
                teamPlayers: {
                    include: {
                        team: {
                            include: {
                                tournaments: {
                                    include: {
                                        team: true,
                                        tournament: true
                                    }
                                }
                            }
                        }
                    }
                },
                achievements: true
            }
        })

        console.log(player)

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
