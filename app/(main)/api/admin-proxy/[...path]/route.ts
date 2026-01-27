import {NextRequest, NextResponse} from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
    const { path } = await params;

    if(!path){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const cookieStore = await cookies()
    const isAuth = cookieStore.get('admin_auth')?.value === 'true'

    if (!isAuth) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // проксируем дальше в реальную админку
    const url = new URL(`/admin/${path.join('/')}`, request.url)

    return NextResponse.rewrite(url)
}
