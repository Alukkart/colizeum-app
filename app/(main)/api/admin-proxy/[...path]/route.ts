import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(
    req: Request,
    { params }: { params: { path: string[] } }
) {
    const cookieStore = await cookies()
    const isAuth = cookieStore.get('admin_auth')?.value === 'true'

    if (!isAuth) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // проксируем дальше в реальную админку
    const url = new URL(`/admin/${params.path.join('/')}`, req.url)

    return NextResponse.rewrite(url)
}
