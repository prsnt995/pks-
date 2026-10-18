'use client';

import { useState, useEffect } from 'react';
import { Company, Video, VideoGenerationJob, AspectRatio, VideoPurpose } from '@/types';
import {
  Sparkles,
  Download,
  Film,
  AlertCircle,
  Loader2,
  Upload
} from 'lucide-react';

interface StudioClientProps {
  companies: Company[];
  initialVideos: Video[];
}

export default function StudioClient({ companies, initialVideos }: StudioClientProps) {
  // Generation Form State
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(companies[0]?.id || '');
  const [purpose, setPurpose] = useState<VideoPurpose>('brand_campaign');
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [duration, setDuration] = useState<number>(5);
  const [referenceImageUrl, setReferenceImageUrl] = useState<string>('');

  // Active Job & Generation State
  const [activeJob, setActiveJob] = useState<VideoGenerationJob | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Video Library State
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [libraryFilterCompany, setLibraryFilterCompany] = useState<string>('all');
  const [libraryFilterPurpose, setLibraryFilterPurpose] = useState<string>('all');

  // Manual Upload Modal State
  const [showManualModal, setShowManualModal] = useState<boolean>(false);
  const [manualTitle, setManualTitle] = useState<string>('');
  const [manualUrl, setManualUrl] = useState<string>('');
  const [manualDescription, setManualDescription] = useState<string>('');

  // Provider Status
  const [providerStatus, setProviderStatus] = useState<{
    activeProvider: string;
    isRealProviderConfigured: boolean;
  }>({ activeProvider: 'mock', isRealProviderConfigured: false });

  // Fetch provider status
  useEffect(() => {
    fetch('/api/video/provider-status')
      .then((res) => res.json())
      .then((data) => setProviderStatus(data))
      .catch((err) => console.warn('Could not fetch provider status:', err));
  }, []);

  // Poll active generation job
  useEffect(() => {
    if (!activeJob || activeJob.status === 'completed' || activeJob.status === 'failed') {
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/video/jobs/${activeJob.id}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.job) {
          setActiveJob(data.job);
          if (data.job.status === 'completed') {
            setIsGenerating(false);
            // Refresh video library
            fetch('/api/video/library')
              .then((r) => r.json())
              .then((vList) => setVideos(vList));
          } else if (data.job.status === 'failed') {
            setIsGenerating(false);
            setErrorMessage(data.job.error_message || 'Video generation failed.');
          }
        }
      } catch (err) {
        console.error('Job polling error:', err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeJob]);

  // Handle Video Generation Submit
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || prompt.trim().length < 5) {
      setErrorMessage('Please enter a descriptive prompt with at least 5 characters.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/video/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_id: selectedCompanyId,
          prompt,
          purpose,
          aspect_ratio: aspectRatio,
          duration_seconds: duration,
          image_url: referenceImageUrl || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit generation request.');
      }

      setActiveJob(data.job);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Generation failed';
      setErrorMessage(msg);
      setIsGenerating(false);
    }
  };

  // Handle Manual Video Registration
  const handleManualUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle || !manualUrl) return;

    try {
      const res = await fetch('/api/video/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_id: selectedCompanyId,
          title: manualTitle,
          video_url: manualUrl,
          description: manualDescription,
          aspect_ratio: aspectRatio,
          duration_seconds: duration,
          purpose
        })
      });

      if (!res.ok) throw new Error('Failed to register video');

      const data = await res.json();
      setVideos((prev) => [data.video, ...prev]);
      setShowManualModal(false);
      setManualTitle('');
      setManualUrl('');
      setManualDescription('');
    } catch (err) {
      alert('Error registering video: ' + err);
    }
  };

  // Handle Video Delete
  const handleDeleteVideo = async (id: string) => {
    if (!confirm('Are you sure you want to remove this video from the library?')) return;
    try {
      const res = await fetch(`/api/video/library/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setVideos((prev) => prev.filter((v) => v.id !== id));
      }
    } catch (err) {
      alert('Failed to delete video: ' + err);
    }
  };

  // Sample prompt helper presets
  const samplePrompts = [
    'Cinematic tracking shot of automated robotic assembly line, dark metallic surfaces, futuristic precision lighting, 4K 60fps',
    'Minimalist 3D kinetic typography floating in sleek obsidian space, silver refractive glass reflections, smooth ambient rotation',
    'High fashion model presenting modern tailored monochrome collection, subtle slow motion wind, premium editorial studio atmosphere'
  ];

  const filteredVideos = videos.filter((v) => {
    const matchCompany = libraryFilterCompany === 'all' || v.company_id === libraryFilterCompany;
    const matchPurpose = libraryFilterPurpose === 'all' || v.purpose === libraryFilterPurpose;
    return matchCompany && matchPurpose;
  });

  return (
    <div className="space-y-16">
      {/* Provider Connectivity Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0E1117] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0">
            <Film className="w-5 h-5 text-zinc-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                AI Video Engine:
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-200">
                {providerStatus.activeProvider.toUpperCase()}
              </span>
              {providerStatus.isRealProviderConfigured ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live API Connected
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Sandbox Simulation Mode
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              {providerStatus.isRealProviderConfigured
                ? 'Production server-side provider adapter active. Generations dispatch directly to official API.'
                : 'Configure LUMA_API_KEY, FAL_KEY, or REPLICATE_API_TOKEN in .env.local to activate external cloud generation.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowManualModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors inline-flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Manual Video Upload</span>
          </button>
        </div>
      </div>

      {/* Main Studio Generation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Generation Controls Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0E1117] border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Generation Pipeline</span>
          </div>

          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Company Selection */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                1. Target Venture / Company
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {companies.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCompanyId(c.id)}
                    className={`p-3 rounded-xl text-left border transition-all text-xs ${
                      selectedCompanyId === c.id
                        ? 'bg-white text-black font-semibold border-white shadow-md'
                        : 'bg-black/40 text-zinc-400 hover:text-white border-white/10'
                    }`}
                  >
                    <span className="block truncate">{c.name}</span>
                    <span className="text-[10px] opacity-70 block truncate">{c.category}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Video Purpose */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                2. Video Purpose & Format
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value as VideoPurpose)}
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-white/40"
              >
                <option value="company_intro">Company Introduction & Overview</option>
                <option value="product_ad">Product Advertisement & Showcase</option>
                <option value="social_reel">Social Media Reel (Mobile Vertical)</option>
                <option value="brand_campaign">Brand Campaign & Cinematic Narrative</option>
                <option value="hero_bg">Website Hero Seamless Background Loop</option>
                <option value="promotional">Promotional Event & Announcement</option>
              </select>
            </div>

            {/* Prompt Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  3. Creative Prompt
                </label>
                <span className="text-[11px] text-zinc-500 font-mono">
                  {prompt.length} chars
                </span>
              </div>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the desired visual sequence, camera movement, environment, textures, and lighting..."
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-white/40 resize-none"
              ></textarea>

              {/* Sample Prompt Helpers */}
              <div className="mt-2 space-y-1.5">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Sample Presets:</span>
                <div className="flex flex-col gap-1">
                  {samplePrompts.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPrompt(p)}
                      className="text-left text-[11px] text-zinc-400 hover:text-white truncate hover:underline"
                    >
                      &bull; {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Aspect Ratio & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['16:9', '9:16', '1:1'] as AspectRatio[]).map((ar) => (
                    <button
                      key={ar}
                      type="button"
                      onClick={() => setAspectRatio(ar)}
                      className={`py-2.5 rounded-xl text-xs font-mono font-medium border text-center transition-all ${
                        aspectRatio === ar
                          ? 'bg-white text-black border-white'
                          : 'bg-black/40 text-zinc-400 hover:text-white border-white/10'
                      }`}
                    >
                      {ar}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                  Duration (Seconds)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[5, 10].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setDuration(dur)}
                      className={`py-2.5 rounded-xl text-xs font-mono font-medium border text-center transition-all ${
                        duration === dur
                          ? 'bg-white text-black border-white'
                          : 'bg-black/40 text-zinc-400 hover:text-white border-white/10'
                      }`}
                    >
                      {dur}s
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reference Image URL (Optional) */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                Reference Image URL (Optional Image-to-Video)
              </label>
              <input
                type="url"
                value={referenceImageUrl}
                onChange={(e) => setReferenceImageUrl(e.target.value)}
                placeholder="https://example.com/concept-frame.jpg"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-white/40"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs text-red-300">{errorMessage}</p>
              </div>
            )}

            {/* Generate Action Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-white/5"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Processing Video Job ({activeJob?.progress_percent || 10}%)...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Generate Promotional Video</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Active Live Monitor & Video Player */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0E1117] border border-white/10 shadow-2xl">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
              Real-Time Generation Monitor
            </h3>

            {activeJob ? (
              <div className="space-y-4">
                {/* Status Bar */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-zinc-400">Job: {activeJob.id}</span>
                    <span
                      className={`font-mono uppercase px-2 py-0.5 rounded text-[10px] ${
                        activeJob.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : activeJob.status === 'failed'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-amber-500/20 text-amber-400 animate-pulse'
                      }`}
                    >
                      {activeJob.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${activeJob.progress_percent || 10}%` }}
                    />
                  </div>

                  <p className="text-xs text-zinc-400">
                    {activeJob.status === 'queued' && 'Queued for model compute cluster...'}
                    {activeJob.status === 'processing' && 'Synthesizing frames & temporal coherence...'}
                    {activeJob.status === 'completed' && 'Render finalized! Video ready for review.'}
                    {activeJob.status === 'failed' && `Error: ${activeJob.error_message}`}
                  </p>
                </div>

                {/* Completed Video Player */}
                {activeJob.status === 'completed' && activeJob.result_video_url && (
                  <div className="rounded-xl overflow-hidden bg-black border border-white/20 aspect-video flex items-center justify-center">
                    <video
                      src={activeJob.result_video_url}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center rounded-xl bg-black/30 border border-white/5 space-y-3">
                <Film className="w-8 h-8 text-zinc-600 mx-auto" />
                <p className="text-xs text-zinc-400">
                  No generation job currently running. Configure your prompt and initiate video generation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Library Section */}
      <div className="pt-12 border-t border-white/10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Company Video Library
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Search, review, and manage promotional media generated across all Nexora ventures.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={libraryFilterCompany}
              onChange={(e) => setLibraryFilterCompany(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#0E1117] border border-white/10 text-white text-xs focus:outline-none"
            >
              <option value="all">All Companies</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={libraryFilterPurpose}
              onChange={(e) => setLibraryFilterPurpose(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#0E1117] border border-white/10 text-white text-xs focus:outline-none"
            >
              <option value="all">All Purposes</option>
              <option value="brand_campaign">Brand Campaign</option>
              <option value="hero_bg">Hero Background</option>
              <option value="product_ad">Product Ad</option>
              <option value="social_reel">Social Reel</option>
              <option value="company_intro">Company Intro</option>
            </select>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="rounded-2xl overflow-hidden bg-[#0E1117] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                <video
                  src={video.video_url}
                  controls
                  playsInline
                  poster={video.thumbnail_url}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 text-[9px] font-mono px-2 py-0.5 rounded bg-black/80 text-zinc-300 border border-white/10">
                  {video.aspect_ratio} &bull; {video.duration_seconds}s
                </span>
                <span className="absolute top-2 right-2 text-[9px] font-mono px-2 py-0.5 rounded bg-black/80 text-zinc-300 border border-white/10">
                  {video.provider.toUpperCase()}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase text-zinc-500">
                      {video.company_name}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600">
                      {video.purpose.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-2">{video.title}</h4>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {video.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <a
                    href={video.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="text-zinc-400 hover:text-white inline-flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleDeleteVideo(video.id)}
                    className="text-red-400/70 hover:text-red-400 text-[11px]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Upload Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#0E1117] border border-white/20 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Register / Upload Video</h3>
            <p className="text-xs text-zinc-400">
              Add an existing high-resolution video URL or self-hosted video asset to the library.
            </p>

            <form onSubmit={handleManualUpload} className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-300 mb-1">Company</label>
                <select
                  value={selectedCompanyId}
                  onChange={(e) => setSelectedCompanyId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white text-xs"
                >
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-zinc-300 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="e.g. Industrial Automation Demo"
                  className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-300 mb-1">Playable Video MP4 URL</label>
                <input
                  type="url"
                  required
                  value={manualUrl}
                  onChange={(e) => setManualUrl(e.target.value)}
                  placeholder="https://assets.example.com/clip.mp4"
                  className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={manualDescription}
                  onChange={(e) => setManualDescription(e.target.value)}
                  placeholder="Short description..."
                  className="w-full px-3 py-2 rounded-lg bg-black border border-white/10 text-white text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="px-4 py-2 rounded-lg text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-black bg-white hover:bg-zinc-200"
                >
                  Save to Library
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
