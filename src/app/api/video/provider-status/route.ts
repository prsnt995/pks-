import { NextResponse } from 'next/server';
import { getProviderStatusSummary } from '@/lib/video-providers';

export async function GET() {
  try {
    const summary = getProviderStatusSummary();
    return NextResponse.json(summary);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to retrieve provider status';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
