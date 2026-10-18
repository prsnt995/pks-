import { NextResponse } from 'next/server';
import { getCompanies, saveCompany } from '@/lib/db';
import { verifyAdminHeader } from '@/lib/auth';

function isValidUrl(urlString?: string): boolean {
  if (!urlString || urlString.trim() === '') return true;
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const companies = await getCompanies();
    return NextResponse.json(companies);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to retrieve companies';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAuth = await verifyAdminHeader(req.headers.get('authorization'));
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized. Admin credentials required.' }, { status: 401 });
    }

    const body = await req.json();

    if (!body.name || body.name.trim().length === 0) {
      return NextResponse.json({ error: 'Company name is required.' }, { status: 400 });
    }

    if (body.official_url && !isValidUrl(body.official_url)) {
      return NextResponse.json(
        { error: 'Invalid official website URL format. Must include http:// or https://' },
        { status: 400 }
      );
    }

    // Auto-verify rule: Only verified if explicitly marked and has valid URL
    const websiteVerified = Boolean(body.website_verified && body.official_url?.trim()?.length > 0);

    const saved = await saveCompany({
      ...body,
      website_verified: websiteVerified
    });

    return NextResponse.json({ success: true, company: saved });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to save company profile';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
