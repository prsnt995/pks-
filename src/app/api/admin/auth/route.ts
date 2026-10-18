import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, isAdminAuthenticated } from '@/lib/auth';

export async function GET() {
  const isAuth = await isAdminAuthenticated();
  return NextResponse.json({ authenticated: isAuth });
}

export async function POST(req: Request) {
  try {
    const { key } = await req.json();
    const serverKey = process.env.ADMIN_SECRET_KEY?.trim();

    if (!serverKey) {
      return NextResponse.json({ error: 'Admin authentication is not configured.' }, { status: 503 });
    }

    if (typeof key !== 'string' || key.trim() !== serverKey) {
      return NextResponse.json({ error: 'Invalid administrator credentials.' }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, serverKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return NextResponse.json({ success: true, message: 'Authentication successful.' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Authentication failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return NextResponse.json({ success: true, message: 'Logged out.' });
}
