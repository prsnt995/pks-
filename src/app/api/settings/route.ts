import { NextResponse } from 'next/server';
import { getSiteSettings, saveSiteSettings } from '@/lib/db';
import { verifyAdminHeader } from '@/lib/auth';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to retrieve settings';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAuth = await verifyAdminHeader(req.headers.get('authorization'));
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const body = await req.json();
    const updated = await saveSiteSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update settings';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
