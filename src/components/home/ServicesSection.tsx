'use client';

import { ServiceItem } from '@/types';
import { Cpu, Code, ShoppingBag, Palette, Video, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface ServicesSectionProps {
  services: ServiceItem[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  Code,
  ShoppingBag,
  Palette,
  Video
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 bg-[#08090A] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              <span>Capabilities & Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Venture Services
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            Our group operates across the full life cycle of modern enterprise—from physical engineering and high-performance digital platforms to automated AI content engines.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Cpu;

            return (
              <div
                key={service.id}
                className="group relative p-8 rounded-2xl bg-[#0E1117] border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-200 group-hover:scale-105 group-hover:text-white transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-zinc-600">
                      0{index + 1}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 mb-1 block">
                    {service.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-white/5">
                      {service.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                          <span className="text-zinc-600 mt-0.5">&bull;</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-colors group/link"
                  >
                    <span>Consult on Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-link-hover:translate-x-0.5 group-link-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
