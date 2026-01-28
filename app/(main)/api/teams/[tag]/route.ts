'use server'

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params

    if (!tag) {
        return NextResponse.json(
            { message: "tag parameter is required" },
            { status: 400 }
        )
    }

    try {
        const team = await prisma.team.findUnique({
            where: { tag },
            include: {
                players: {
                    include: {
                        user: true
                    }
                },
                matchesAsA: {
                    include: {
                        teamB: true,
                        winner: true,
                        tournament: {
                            include: {
                                game: true
                            }
                        }
                    }
                },
                matchesAsB: {
                    include: {
                        teamA: true,
                        winner: true,
                        tournament: {
                            include: {
                                game: true
                            }
                        }
                    }
                },
                tournaments: {
                    include: {
                        tournament: {
                            include: {
                                game: true
                            }
                        }
                    }
                }
            },
        })


        if (!team) {
            return NextResponse.error()
        }

        return NextResponse.json(team)
    } catch (error) {
        console.error("Error fetching team:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}
