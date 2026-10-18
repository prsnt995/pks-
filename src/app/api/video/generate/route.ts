import { NextResponse } from 'next/server';
import { getCompanyById, saveVideoJob } from '@/lib/db';
import { getProvider } from '@/lib/video-providers';
import { AspectRatio, VideoPurpose } from '@/types';
import { verifyAdminHeader } from '@/lib/auth';

// In-memory rate limiting and duplicate request prevention
const recentRequests = new Map<string, number>();

export async function POST(req: Request) {
  try {
    // Authenticate request (Admin or Studio session)
    const isAuth = await verifyAdminHeader(req.headers.get('authorization'));
    if (!isAuth) {
      return NextResponse.json(
        { error: 'Unauthorized. Studio administration authentication required.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { company_id, prompt, purpose, aspect_ratio, duration_seconds, image_url, provider: requestedProvider } = body;

    // Validate prompt
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please enter a descriptive prompt (at least 5 characters).' },
        { status: 400 }
      );
    }

    // Validate company
    if (!company_id) {
      return NextResponse.json({ error: 'Please select a company.' }, { status: 400 });
    }
    const company = await getCompanyById(company_id);
    if (!company) {
      return NextResponse.json({ error: 'Selected company does not exist.' }, { status: 404 });
    }

    // Validate aspect ratio
    const validAspectRatios: AspectRatio[] = ['16:9', '9:16', '1:1'];
    const chosenAspectRatio: AspectRatio = validAspectRatios.includes(aspect_ratio) ? aspect_ratio : '16:9';

    // Validate purpose
    const validPurposes: VideoPurpose[] = [
      'company_intro',
      'product_ad',
      'social_reel',
      'brand_campaign',
      'hero_bg',
      'promotional'
    ];
    const chosenPurpose: VideoPurpose = validPurposes.includes(purpose) ? purpose : 'brand_campaign';

    // Prevent identical rapid submissions (within 3 seconds)
    const submissionKey = `${company_id}_${prompt.trim().toLowerCase()}`;
    const lastTime = recentRequests.get(submissionKey);
    if (lastTime && Date.now() - lastTime < 3000) {
      return NextResponse.json(
        { error: 'Duplicate request detected. Please wait before submitting identical prompts.' },
        { status: 429 }
      );
    }
    recentRequests.set(submissionKey, Date.now());

    // Select provider adapter
    const providerAdapter = getProvider(requestedProvider);

    // Submit generation job to provider
    const submissionResult = await providerAdapter.createGenerationJob({
      prompt: prompt.trim(),
      purpose: chosenPurpose,
      aspect_ratio: chosenAspectRatio,
      duration_seconds: Number(duration_seconds) || 5,
      image_url: image_url?.trim() || undefined,
      company_name: company.name
    });

    const jobId = 'job_' + Math.random().toString(36).substring(2, 10);

    // Save job tracking record
    const jobRecord = await saveVideoJob({
      id: jobId,
      company_id,
      company_name: company.name,
      provider: submissionResult.provider,
      provider_job_id: submissionResult.jobId,
      prompt: prompt.trim(),
      purpose: chosenPurpose,
      aspect_ratio: chosenAspectRatio,
      duration_seconds: Number(duration_seconds) || 5,
      status: submissionResult.status,
      progress_percent: 10,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      job: jobRecord,
      message: submissionResult.initialMessage || 'Video generation job initialized.'
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Video generation failed';
    console.error('Video generation API error:', err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
