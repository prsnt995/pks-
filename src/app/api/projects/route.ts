import { NextResponse } from 'next/server';
import { deleteProject, getProjects, saveProject } from '@/lib/db';
import { verifyAdminHeader } from '@/lib/auth';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to retrieve projects';
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
    const { title, company_id } = body;

    if (!title || !company_id) {
      return NextResponse.json({ error: 'Title and Company are required.' }, { status: 400 });
    }

    const saved = await saveProject(body);
    return NextResponse.json({ success: true, project: saved });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to save project';
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
      return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
    }

    await deleteProject(id);
    return NextResponse.json({ success: true, message: 'Project removed' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Delete failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
