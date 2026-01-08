'use server'

import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    console.log("Fetching zone with slug:", slug)

    if (!slug) {
        return NextResponse.json(
            { message: "slug parameter is required" },
            { status: 400 }
        )
    }

    try {
        const zone = await prisma.zone.findUnique({
            where: { slug },
            include: {
                components: true,
                devices: true,
                photos: { orderBy: { order: "asc" } },
            }
        })

        if (!zone) {
            return NextResponse.error()
        }

        return NextResponse.json(zone)
    } catch (error) {
        console.error("Error fetching zone:", error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}
