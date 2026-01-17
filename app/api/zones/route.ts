import {NextResponse} from "next/server"
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const zones = await prisma.zone.findMany({
            orderBy: {
                price: 'asc',
            }
        })

        console.log("Fetched zones:", zones)
        return NextResponse.json({zones})
    } catch (error) {
        console.error("Error fetching zones:", error)
        return NextResponse.json([], {status: 500})
    }
}
