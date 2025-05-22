import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    const { password } = await request.json()
    const cookieStore = await cookies()

    if (password === process.env.PROF_PASS) {
        cookieStore.set('prof_auth', 'ok', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600 //un'ora
        })
        return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false }, { status: 401 })
} 