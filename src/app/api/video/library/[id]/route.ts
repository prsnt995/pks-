import { NextResponse } from 'next/server';
import { deleteVideo, getVideoById, saveVideo } from '@/lib/db';
import { verifyAdminHeader } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = await getVideoById(id);
  if (!video) {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 });
  }
  return NextResponse.json(video);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAuth = await verifyAdminHeader(req.headers.get('authorization'));
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const existing = await getVideoById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const body = await req.json();
    const updated = await saveVideo({
      ...existing,
      ...body,
      id
    });

    return NextResponse.json({ success: true, video: updated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to update video';
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
    await deleteVideo(id);
    return NextResponse.json({ success: true, message: 'Video deleted from library' });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to delete video';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
