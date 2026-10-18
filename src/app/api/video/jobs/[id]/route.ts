import { NextResponse } from 'next/server';
import { getVideoJobById, saveVideo, saveVideoJob } from '@/lib/db';
import { getProvider } from '@/lib/video-providers';
import { verifyAdminHeader } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAuth = await verifyAdminHeader(req.headers.get('authorization'));
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const job = await getVideoJobById(id);

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // If job is already finalized (completed or failed), return current state
    if (job.status === 'completed' && job.result_video_url) {
      return NextResponse.json({ job });
    }

    // Poll the provider adapter for live status
    const providerAdapter = getProvider(job.provider);
    const statusResult = await providerAdapter.checkJobStatus(job.provider_job_id);

    job.status = statusResult.status;
    job.progress_percent = statusResult.progressPercent;
    if (statusResult.errorMessage) {
      job.error_message = statusResult.errorMessage;
    }

    // If completed and video url is ready, save to Video Library
    if (statusResult.status === 'completed' && statusResult.videoUrl) {
      job.result_video_url = statusResult.videoUrl;

      if (!job.video_id) {
        const savedVideo = await saveVideo({
          company_id: job.company_id,
          company_name: job.company_name,
          title: `${job.company_name} — ${job.purpose.replace(/_/g, ' ').toUpperCase()}`,
          description: `AI-generated video via ${job.provider.toUpperCase()}. Prompt: "${job.prompt}"`,
          provider: job.provider,
          provider_job_id: job.provider_job_id,
          video_url: statusResult.videoUrl,
          thumbnail_url: statusResult.thumbnailUrl || '',
          aspect_ratio: job.aspect_ratio,
          duration_seconds: job.duration_seconds,
          status: 'completed',
          purpose: job.purpose,
          prompt: job.prompt,
          is_featured: false,
          is_public: true
        });
        job.video_id = savedVideo.id;
      }
    }

    await saveVideoJob(job);

    return NextResponse.json({ job });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to query job status';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// Retry failed job
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const isAuth = await verifyAdminHeader(req.headers.get('authorization'));
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    const job = await getVideoJobById(id);

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    if (job.status !== 'failed') {
      return NextResponse.json({ error: 'Only failed jobs can be retried.' }, { status: 400 });
    }

    const providerAdapter = getProvider(job.provider);
    const retrySubmission = await providerAdapter.createGenerationJob({
      prompt: job.prompt,
      purpose: job.purpose,
      aspect_ratio: job.aspect_ratio,
      duration_seconds: job.duration_seconds,
      company_name: job.company_name
    });

    job.provider_job_id = retrySubmission.jobId;
    job.status = 'queued';
    job.progress_percent = 10;
    job.error_message = undefined;

    await saveVideoJob(job);

    return NextResponse.json({ success: true, job });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Retry failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
