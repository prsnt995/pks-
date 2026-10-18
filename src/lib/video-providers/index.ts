import { IVideoProvider } from './types';
import { LumaVideoProvider } from './luma';
import { FalVideoProvider } from './fal';
import { ReplicateVideoProvider } from './replicate';
import { MockVideoProvider } from './mock';

const lumaProvider = new LumaVideoProvider();
const falProvider = new FalVideoProvider();
const replicateProvider = new ReplicateVideoProvider();
const mockProvider = new MockVideoProvider();

export function getProvider(name?: string): IVideoProvider {
  const chosen = (name || process.env.VIDEO_PROVIDER || '').toLowerCase();

  if (chosen) {
    const providers: Record<string, IVideoProvider> = {
      luma: lumaProvider, fal: falProvider, replicate: replicateProvider, mock: mockProvider
    };
    const provider = providers[chosen];
    if (!provider) throw new Error(`Unknown video provider: ${chosen}`);
    if (!provider.isConfigured()) throw new Error(`Video provider ${chosen} is not configured.`);
    return provider;
  }

  // Auto-detect if provider not explicitly matching configured keys
  if (lumaProvider.isConfigured()) return lumaProvider;
  if (falProvider.isConfigured()) return falProvider;
  if (replicateProvider.isConfigured()) return replicateProvider;

  // Fallback to local sandbox provider
  return mockProvider;
}

export function getProviderStatusSummary() {
  return {
    activeProvider: getProvider().name,
    isRealProviderConfigured:
      lumaProvider.isConfigured() ||
      falProvider.isConfigured() ||
      replicateProvider.isConfigured(),
    providers: {
      luma: {
        configured: lumaProvider.isConfigured(),
        info: lumaProvider.getPricingInfo()
      },
      fal: {
        configured: falProvider.isConfigured(),
        info: falProvider.getPricingInfo()
      },
      replicate: {
        configured: replicateProvider.isConfigured(),
        info: replicateProvider.getPricingInfo()
      },
      mock: {
        configured: true,
        info: mockProvider.getPricingInfo()
      }
    }
  };
}

export * from './types';
