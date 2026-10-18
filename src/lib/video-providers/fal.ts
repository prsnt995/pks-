import { AspectRatio, JobStatus } from '@/types';
import {
  IVideoProvider,
  ProviderGenerationParams,
  ProviderJobStatusResult,
  ProviderJobSubmissionResult
} from './types';

export class FalVideoProvider implements IVideoProvider {
  readonly name = 'fal' as const;
  private readonly defaultModel = 'fal-ai/kling-video/v1/standard/text-to-video';

  private getApiKey(): string | undefined {
    return process.env.FAL_KEY;
  }

  isConfigured(): boolean {
    const key = this.getApiKey();
    return Boolean(key && key.trim().length > 10 && !key.includes('your-key'));
  }

  getPricingInfo() {
    return {
      model: 'Fal.ai (Kling 1.5 / Hunyuan)',
      estimatedCostPerSec: '~$0.05 / 5s generation',
      supportedAspectRatios: ['16:9', '9:16', '1:1'] as AspectRatio[],
      supportedDurations: [5, 10]
    };
  }

  async createGenerationJob(params: ProviderGenerationParams): Promise<ProviderJobSubmissionResult> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('FAL_KEY environment variable is not configured.');
    }

    const res = await fetch(`https://queue.fal.run/${this.defaultModel}`, {
      method: 'POST',
      headers: {
        Authorization: `Key ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: params.prompt,
        aspect_ratio: params.aspect_ratio,
        duration: `${params.duration_seconds || 5}`
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Fal.ai API Error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    return {
      jobId: data.request_id,
      provider: 'fal',
      status: 'queued',
      initialMessage: 'Generation submitted to Fal.ai queue.'
    };
  }

  async checkJobStatus(jobId: string): Promise<ProviderJobStatusResult> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('FAL_KEY environment variable is not configured.');
    }

    // Check status
    const statusRes = await fetch(`https://queue.fal.run/${this.defaultModel}/requests/${jobId}/status`, {
      headers: {
        Authorization: `Key ${apiKey}`
      }
    });

    if (!statusRes.ok) {
      throw new Error(`Fal.ai status check failed: HTTP ${statusRes.status}`);
    }

    const statusData = await statusRes.json();
    const falStatus: string = statusData.status;

    let status: JobStatus = 'processing';
    let progressPercent = 50;
    let videoUrl: string | undefined = undefined;

    if (falStatus === 'IN_QUEUE') {
      status = 'queued';
      progressPercent = 20;
    } else if (falStatus === 'IN_PROGRESS') {
      status = 'processing';
      progressPercent = 70;
    } else if (falStatus === 'COMPLETED') {
      status = 'completed';
      progressPercent = 100;
      // Fetch result
      const resultRes = await fetch(`https://queue.fal.run/${this.defaultModel}/requests/${jobId}`, {
        headers: {
          Authorization: `Key ${apiKey}`
        }
      });
      if (resultRes.ok) {
        const resultData = await resultRes.json();
        videoUrl = resultData.video?.url;
      }
    } else {
      status = 'failed';
      progressPercent = 0;
    }

    return {
      jobId,
      provider: 'fal',
      status,
      progressPercent,
      videoUrl,
      errorMessage: status === 'failed' ? 'Job encountered an error on Fal.ai' : undefined
    };
  }
}
