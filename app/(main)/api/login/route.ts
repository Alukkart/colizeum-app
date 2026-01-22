import { NextResponse } from 'next/server'
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const { login, password } = await req.json()

    const dbUser = await prisma.admins.findUnique({ where: {username: login} })

    if (dbUser && dbUser.password === password) {
        const response = NextResponse.json({ success: true })

        response.cookies.set('admin_auth', 'true', {
            httpOnly: true,
            path: '/',
        })

        return response
    }

    return NextResponse.json(
        { success: false },
        { status: 401 }
    )
}
