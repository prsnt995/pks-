import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export function NexoraLogoMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Geometric Hexagonal Nexus */}
      <path
        d="M20 3L35 11.66V28.34L20 37L5 28.34V11.66L20 3Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        className="text-white/80"
      />
      {/* Core Converging Venture Prisms */}
      <path
        d="M20 3V20M35 28.34L20 20M5 28.34L20 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="text-white/40"
      />
      {/* Center Nexus Diamond Point */}
      <polygon
        points="20,16 23.5,20 20,24 16.5,20"
        fill="currentColor"
        className="text-white"
      />
    </svg>
  );
}

export default function Logo({ className = '', size = 'md', showTagline = false }: LogoProps) {
  const sizeClasses = {
    sm: { mark: 'w-6 h-6', text: 'text-base', sub: 'text-[9px]' },
    md: { mark: 'w-7 h-7', text: 'text-lg', sub: 'text-[10px]' },
    lg: { mark: 'w-9 h-9', text: 'text-2xl', sub: 'text-xs' }
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm ${className}`}
      aria-label="NEXORA GROUP Homepage"
    >
      <div className="relative flex items-center justify-center p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/25 transition-colors">
        <NexoraLogoMark className={`${sizeClasses.mark} text-white group-hover:scale-105 transition-transform duration-300`} />
      </div>
      <div className="flex flex-col">
        <span className={`font-semibold tracking-[0.22em] text-white uppercase ${sizeClasses.text} leading-none`}>
          NEXORA
        </span>
        <span className={`tracking-[0.38em] text-zinc-400 font-light uppercase ${sizeClasses.sub} mt-1`}>
          GROUP
        </span>
        {showTagline && (
          <span className="text-[10px] tracking-wider text-zinc-500 font-normal mt-0.5">
            One Vision. Multiple Ventures.
          </span>
        )}
      </div>
    </Link>
  );
}
