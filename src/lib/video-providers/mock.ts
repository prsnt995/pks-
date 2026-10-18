import { AspectRatio, JobStatus } from '@/types';
import {
  IVideoProvider,
  ProviderGenerationParams,
  ProviderJobStatusResult,
  ProviderJobSubmissionResult
} from './types';

// In-memory mock job state tracking for realistic demo lifecycle
const mockJobStore = new Map<
  string,
  {
    startTime: number;
    aspectRatio: AspectRatio;
    purpose: string;
    prompt: string;
  }
>();

const SAMPLE_VIDEOS: Record<AspectRatio, string[]> = {
  '16:9': [
    'https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-moving-fast-in-a-factory-42998-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-code-31911-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-42861-large.mp4'
  ],
  '9:16': [
    'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-futuristic-silver-outfit-39871-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-41138-large.mp4'
  ],
  '1:1': [
    'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-code-31911-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-moving-fast-in-a-factory-42998-large.mp4'
  ]
};

export class MockVideoProvider implements IVideoProvider {
  readonly name = 'mock' as const;

  isConfigured(): boolean {
    return true;
  }

  getPricingInfo() {
    return {
      model: 'Nexora Local Sandbox Engine (Simulated)',
      estimatedCostPerSec: '$0.00 (Development Simulation)',
      supportedAspectRatios: ['16:9', '9:16', '1:1'] as AspectRatio[],
      supportedDurations: [5, 10]
    };
  }

  async createGenerationJob(params: ProviderGenerationParams): Promise<ProviderJobSubmissionResult> {
    const jobId = 'mock_job_' + Math.random().toString(36).substring(2, 10);
    mockJobStore.set(jobId, {
      startTime: Date.now(),
      aspectRatio: params.aspect_ratio,
      purpose: params.purpose,
      prompt: params.prompt
    });

    return {
      jobId,
      provider: 'mock',
      status: 'queued',
      initialMessage: 'Development simulation job queued. Transitions to completion in ~6 seconds.'
    };
  }

  async checkJobStatus(jobId: string): Promise<ProviderJobStatusResult> {
    const job = mockJobStore.get(jobId);
    if (!job) {
      // If not in memory (e.g. server restart), mark as completed
      return {
        jobId,
        provider: 'mock',
        status: 'completed',
        progressPercent: 100,
        videoUrl: SAMPLE_VIDEOS['16:9'][0]
      };
    }

    const elapsedMs = Date.now() - job.startTime;
    let status: JobStatus = 'queued';
    let progressPercent = 10;
    let videoUrl: string | undefined = undefined;

    if (elapsedMs < 2000) {
      status = 'queued';
      progressPercent = Math.min(25, Math.floor((elapsedMs / 2000) * 25));
    } else if (elapsedMs < 5500) {
      status = 'processing';
      const progressNorm = (elapsedMs - 2000) / 3500;
      progressPercent = Math.min(95, 25 + Math.floor(progressNorm * 70));
    } else {
      status = 'completed';
      progressPercent = 100;
      const videos = SAMPLE_VIDEOS[job.aspectRatio] || SAMPLE_VIDEOS['16:9'];
      videoUrl = videos[Math.floor(Math.random() * videos.length)];
    }

    return {
      jobId,
      provider: 'mock',
      status,
      progressPercent,
      videoUrl
    };
  }
}
