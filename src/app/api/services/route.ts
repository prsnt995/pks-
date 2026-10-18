import { NextResponse } from 'next/server';
import { deleteService, getServices, saveService } from '@/lib/db';
import { verifyAdminHeader } from '@/lib/auth';

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json(services);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to retrieve services';
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
    if (!body.title) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
    }

    const saved = await saveService(body);
    return NextResponse.json({ success: true, service: saved });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to save service';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const isAuth = await verifyAdminHeader(req.headers.get('authorization'));
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    await deleteService(id);
    return NextResponse.json({ success: true, message: 'Service removed' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Delete failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
