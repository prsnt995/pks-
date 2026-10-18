import { AspectRatio, JobStatus } from '@/types';
import {
  IVideoProvider,
  ProviderGenerationParams,
  ProviderJobStatusResult,
  ProviderJobSubmissionResult
} from './types';

export class LumaVideoProvider implements IVideoProvider {
  readonly name = 'luma' as const;
  private readonly baseUrl = 'https://api.lumalabs.ai/dream-machine/v1';

  private getApiKey(): string | undefined {
    return process.env.LUMA_API_KEY;
  }

  isConfigured(): boolean {
    const key = this.getApiKey();
    return Boolean(key && key.trim().length > 10 && !key.includes('your-key'));
  }

  getPricingInfo() {
    return {
      model: 'Luma Dream Machine Ray-2',
      estimatedCostPerSec: '~$0.04 - $0.06 / generation',
      supportedAspectRatios: ['16:9', '9:16', '1:1'] as AspectRatio[],
      supportedDurations: [5, 9]
    };
  }

  async createGenerationJob(params: ProviderGenerationParams): Promise<ProviderJobSubmissionResult> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('LUMA_API_KEY environment variable is not configured.');
    }

    const payload: Record<string, unknown> = {
      prompt: params.prompt,
      aspect_ratio: params.aspect_ratio,
      loop: params.purpose === 'hero_bg'
    };

    if (params.image_url) {
      payload.keyframes = {
        frame0: {
          type: 'image',
          url: params.image_url
        }
      };
    }

    const res = await fetch(`${this.baseUrl}/generations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      let parsedErr = errText;
      try {
        const json = JSON.parse(errText);
        parsedErr = json.detail || json.message || errText;
      } catch {
        // Fallback to raw text
      }
      throw new Error(`Luma API Error (${res.status}): ${parsedErr}`);
    }

    const data = await res.json();
    return {
      jobId: data.id,
      provider: 'luma',
      status: 'queued',
      initialMessage: 'Generation submitted to Luma Dream Machine.'
    };
  }

  async checkJobStatus(jobId: string): Promise<ProviderJobStatusResult> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('LUMA_API_KEY environment variable is not configured.');
    }

    const res = await fetch(`${this.baseUrl}/generations/${jobId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to check Luma generation status: HTTP ${res.status}`);
    }

    const data = await res.json();
    const lumaState: string = data.state || 'queued';

    let status: JobStatus = 'processing';
    let progressPercent = 50;

    if (lumaState === 'queued') {
      status = 'queued';
      progressPercent = 15;
    } else if (lumaState === 'dreaming') {
      status = 'processing';
      progressPercent = 65;
    } else if (lumaState === 'completed') {
      status = 'completed';
      progressPercent = 100;
    } else if (lumaState === 'failed') {
      status = 'failed';
      progressPercent = 0;
    }

    return {
      jobId,
      provider: 'luma',
      status,
      progressPercent,
      videoUrl: data.assets?.video || undefined,
      thumbnailUrl: data.assets?.thumbnail || undefined,
      errorMessage: data.failure_reason || (status === 'failed' ? 'Generation failed on Luma cluster' : undefined)
    };
  }
}
