import { AspectRatio, JobStatus, VideoPurpose } from '@/types';

export interface ProviderGenerationParams {
  prompt: string;
  purpose: VideoPurpose;
  aspect_ratio: AspectRatio;
  duration_seconds: number;
  image_url?: string;
  company_name?: string;
}

export interface ProviderJobSubmissionResult {
  jobId: string;
  provider: 'luma' | 'fal' | 'replicate' | 'mock';
  status: JobStatus;
  initialMessage?: string;
}

export interface ProviderJobStatusResult {
  jobId: string;
  provider: 'luma' | 'fal' | 'replicate' | 'mock';
  status: JobStatus;
  progressPercent: number;
  videoUrl?: string;
  thumbnailUrl?: string;
  errorMessage?: string;
}

export interface IVideoProvider {
  readonly name: 'luma' | 'fal' | 'replicate' | 'mock';
  isConfigured(): boolean;
  getPricingInfo(): {
    model: string;
    estimatedCostPerSec: string;
    supportedAspectRatios: AspectRatio[];
    supportedDurations: number[];
  };
  createGenerationJob(params: ProviderGenerationParams): Promise<ProviderJobSubmissionResult>;
  checkJobStatus(jobId: string): Promise<ProviderJobStatusResult>;
}
