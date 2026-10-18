import { AspectRatio, JobStatus } from '@/types';
import {
  IVideoProvider,
  ProviderGenerationParams,
  ProviderJobStatusResult,
  ProviderJobSubmissionResult
} from './types';

export class ReplicateVideoProvider implements IVideoProvider {
  readonly name = 'replicate' as const;
  private readonly defaultVersion = 'minimax/video-01';

  private getApiKey(): string | undefined {
    return process.env.REPLICATE_API_TOKEN;
  }

  isConfigured(): boolean {
    const key = this.getApiKey();
    return Boolean(key && key.trim().length > 10 && !key.includes('your-key'));
  }

  getPricingInfo() {
    return {
      model: 'Replicate (MiniMax Video-01)',
      estimatedCostPerSec: '~$0.04 / generation',
      supportedAspectRatios: ['16:9', '9:16', '1:1'] as AspectRatio[],
      supportedDurations: [6]
    };
  }

  async createGenerationJob(params: ProviderGenerationParams): Promise<ProviderJobSubmissionResult> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('REPLICATE_API_TOKEN environment variable is not configured.');
    }

    const res = await fetch('https://api.replicate.com/v1/models/minimax/video-01/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: {
          prompt: params.prompt,
          prompt_optimizer: true
        }
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Replicate API Error (${res.status}): ${err}`);
    }

    const data = await res.json();
    return {
      jobId: data.id,
      provider: 'replicate',
      status: 'queued',
      initialMessage: 'Generation submitted to Replicate.'
    };
  }

  async checkJobStatus(jobId: string): Promise<ProviderJobStatusResult> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('REPLICATE_API_TOKEN environment variable is not configured.');
    }

    const res = await fetch(`https://api.replicate.com/v1/predictions/${jobId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    if (!res.ok) {
      throw new Error(`Replicate status check failed: HTTP ${res.status}`);
    }

    const data = await res.json();
    const repStatus = data.status;

    let status: JobStatus = 'processing';
    let progressPercent = 50;
    let videoUrl: string | undefined = undefined;

    if (repStatus === 'starting') {
      status = 'queued';
      progressPercent = 15;
    } else if (repStatus === 'processing') {
      status = 'processing';
      progressPercent = 60;
    } else if (repStatus === 'succeeded') {
      status = 'completed';
      progressPercent = 100;
      videoUrl = typeof data.output === 'string' ? data.output : data.output?.[0];
    } else if (repStatus === 'failed' || repStatus === 'canceled') {
      status = 'failed';
      progressPercent = 0;
    }

    return {
      jobId,
      provider: 'replicate',
      status,
      progressPercent,
      videoUrl,
      errorMessage: data.error || (status === 'failed' ? 'Replicate generation failed' : undefined)
    };
  }
}
