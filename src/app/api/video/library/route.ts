import { NextResponse } from 'next/server';
import { getVideos, saveVideo } from '@/lib/db';
import { verifyAdminHeader } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get('company_id');
    const purpose = searchParams.get('purpose');
    const featured = searchParams.get('featured');

    let videos = await getVideos();

    if (companyId) {
      videos = videos.filter((v) => v.company_id === companyId);
    }
    if (purpose) {
      videos = videos.filter((v) => v.purpose === purpose);
    }
    if (featured === 'true') {
      videos = videos.filter((v) => v.is_featured);
    }

    return NextResponse.json(videos);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to retrieve videos';
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
    const { company_id, title, video_url, description, aspect_ratio, duration_seconds, purpose } = body;

    if (!company_id || !title || !video_url) {
      return NextResponse.json(
        { error: 'Company, title, and playable video URL are required.' },
        { status: 400 }
      );
    }

    const saved = await saveVideo({
      company_id,
      title: title.trim(),
      description: description || 'Manually uploaded/registered video',
      video_url: video_url.trim(),
      aspect_ratio: aspect_ratio || '16:9',
      duration_seconds: Number(duration_seconds) || 5,
      purpose: purpose || 'promotional',
      provider: 'manual',
      status: 'completed',
      is_public: true
    });

    return NextResponse.json({ success: true, video: saved });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to save video';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
