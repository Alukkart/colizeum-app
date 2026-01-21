import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { login, password } = await req.json()

    // ⚠️ Простейшая проверка (для примера)
    if (login === 'admin' && password === '1234') {
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
