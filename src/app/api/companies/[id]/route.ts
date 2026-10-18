import { NextResponse } from 'next/server';
import { deleteCompany, getCompanyById, saveCompany } from '@/lib/db';
import { verifyAdminHeader } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const company = await getCompanyById(id);
  if (!company) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }
  return NextResponse.json(company);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAuth = await verifyAdminHeader(req.headers.get('authorization'));
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const existing = await getCompanyById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    const updated = await saveCompany({
      ...existing,
      ...body,
      id
    });

    return NextResponse.json({ success: true, company: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update company';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAuth = await verifyAdminHeader(req.headers.get('authorization'));
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    await deleteCompany(id);
    return NextResponse.json({ success: true, message: 'Company deleted' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete company';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
