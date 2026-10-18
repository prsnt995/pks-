import { Company, Project, ServiceItem, SiteSettings, Video } from '@/types';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp_pks_eng',
    name: 'PKS.ENG',
    slug: 'pks-eng',
    category: 'Engineering & Industrial Technology',
    description:
      'Precision engineering systems, industrial infrastructure, and technical architecture designed for resilience and performance.',
    logo_url: '',
    official_url: '',
    website_verified: false,
    display_order: 1,
    is_active: true,
    brand_color: '#3B82F6',
    hero_image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Advanced Industrial Engineering & Automation',
      'Structural Infrastructure & Diagnostics',
      'Precision Hardware Systems Integration'
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'comp_nextepstudio',
    name: 'Nextepstudio',
    slug: 'nextepstudio',
    category: 'Studio & Digital Services',
    description:
      'Modern digital design studio engineering cutting-edge digital experiences, bespoke web applications, and interactive platforms.',
    logo_url: '',
    official_url: '',
    website_verified: false,
    display_order: 2,
    is_active: true,
    brand_color: '#8B5CF6',
    hero_image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Bespoke Web & Mobile Product Engineering',
      'High-Impact Interactive UI/UX Architecture',
      'Brand Identity Systems & Visual Strategy'
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'comp_rozena',
    name: 'Rozena',
    slug: 'rozena',
    category: 'Brand & Business Ventures',
    description:
      'Contemporary lifestyle brand, commercial product curation, and high-growth retail venture operations.',
    logo_url: '',
    official_url: '',
    website_verified: false,
    display_order: 3,
    is_active: true,
    brand_color: '#EC4899',
    hero_image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Consumer Lifestyle Products & Apparel',
      'Commerce Operations & Supply Chain',
      'Emerging Retail Venture Acceleration'
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'comp_tba',
    name: 'To Be Announced',
    slug: 'to-be-announced',
    category: 'Emerging Technologies & Ventures',
    description:
      'Next-generation venture currently in stealth development within the Nexora Group portfolio.',
    logo_url: '',
    official_url: '',
    website_verified: false,
    display_order: 4,
    is_active: true,
    brand_color: '#10B981',
    hero_image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    highlights: [
      'Stealth Stage Research & Incubation',
      'Cross-Domain Technology Synthesis',
      'Official Launch Details Pending'
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj_pks_1',
    company_id: 'comp_pks_eng',
    company_name: 'PKS.ENG',
    title: 'Autonomous Plant Monitoring System',
    category: 'Industrial IoT',
    description:
      'High-throughput telemetry and predictive sensor infrastructure engineered for continuous manufacturing facilities.',
    image_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
    tags: ['IoT', 'Precision Hardware', 'Telemetry'],
    is_demo: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'proj_nextep_1',
    company_id: 'comp_nextepstudio',
    company_name: 'Nextepstudio',
    title: 'Kinetic Web Experience & Interactive 3D',
    category: 'Digital Experience',
    description:
      'Immersive WebGL design showcase delivering interactive motion graphics and fluid responsive layouts.',
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
    tags: ['WebGL', 'Next.js', 'Creative Design'],
    is_demo: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'proj_rozena_1',
    company_id: 'comp_rozena',
    company_name: 'Rozena',
    title: 'Minimalist Apparel & Modern Lifestyle Line',
    category: 'Brand Campaign',
    description:
      'Seasonal collection launch featuring sustainable materials, modern tailoring, and streamlined global fulfillment.',
    image_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
    tags: ['Lifestyle', 'E-Commerce', 'Brand'],
    is_demo: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'proj_tba_1',
    company_id: 'comp_tba',
    company_name: 'To Be Announced',
    title: 'Project Horizon: Next Frontier Venture',
    category: 'Exploratory Research',
    description:
      'Stealth prototyping evaluating intelligent software agents and automated digital enterprise workflows.',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
    tags: ['Stealth', 'AI Agents', 'Automation'],
    is_demo: true,
    created_at: new Date().toISOString()
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'serv_eng',
    title: 'Engineering & Technical Services',
    category: 'Infrastructure & Hardware',
    description:
      'End-to-end technical system design, equipment engineering, diagnostics, and industrial computing solutions.',
    icon: 'Cpu',
    deliverables: [
      'Embedded hardware & sensor integration',
      'Industrial automation architectures',
      'Performance testing & physical stress analysis'
    ],
    is_active: true,
    display_order: 1
  },
  {
    id: 'serv_web',
    title: 'Website & Application Development',
    category: 'Software Engineering',
    description:
      'High-performance full-stack web applications, cloud-native backend systems, and responsive web platforms.',
    icon: 'Code',
    deliverables: [
      'Next.js & React enterprise web platforms',
      'High-speed API & database architectures',
      'Mobile-first responsive corporate interfaces'
    ],
    is_active: true,
    display_order: 2
  },
  {
    id: 'serv_products',
    title: 'Digital Products & E-Commerce',
    category: 'Commerce & Ventures',
    description:
      'Custom online storefronts, catalog distribution networks, inventory synchronizations, and payment checkout flows.',
    icon: 'ShoppingBag',
    deliverables: [
      'Custom transaction and checkout workflows',
      'Omnichannel inventory synchronization',
      'Customer portal and account systems'
    ],
    is_active: true,
    display_order: 3
  },
  {
    id: 'serv_branding',
    title: 'Branding & Creative Services',
    category: 'Brand Strategy',
    description:
      'Cohesive brand positioning, typographic design systems, visual asset libraries, and marketing collateral.',
    icon: 'Palette',
    deliverables: [
      'Brand identity guideline creation',
      'Modern typography & corporate design systems',
      'Creative visual direction & digital kits'
    ],
    is_active: true,
    display_order: 4
  },
  {
    id: 'serv_ai',
    title: 'AI-Powered Content & Video Production',
    category: 'Generative Media',
    description:
      'Automated high-definition promotional videos, visual advertising loops, and brand storytelling powered by advanced AI models.',
    icon: 'Video',
    deliverables: [
      'Generative video ad campaigns for brands',
      'Atmospheric corporate hero background videos',
      'Multiformat social media aspect ratio exports'
    ],
    is_active: true,
    display_order: 5
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  hero_headline: 'One Vision. Multiple Ventures.',
  hero_subheadline: "Building What's Next.",
  hero_description:
    'Discover the companies, ideas, and digital experiences shaping our next chapter.',
  about_story:
    'NEXORA GROUP is a forward-thinking business portfolio uniting specialized ventures in engineering, digital design, brand development, and emerging technology. By bringing diverse capabilities together under one unified umbrella, we accelerate ideas from concept into market reality.',
  about_mission:
    'To foster high-impact enterprises by combining rigorous technical expertise with modern digital execution and creative brand building.',
  about_vision:
    'To be an agile, internationally recognized multi-venture group that turns ambitious visions into sustainable, world-class products and services.',
  contact_email: 'contact@nexoragroup.com',
  contact_location: 'Global Digital Presence & Regional Operations',
  updated_at: new Date().toISOString()
};

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 'vid_hero_showcase',
    company_id: 'comp_pks_eng',
    company_name: 'PKS.ENG',
    title: 'Industrial Precision & Robotics',
    description: 'High-speed robotic arm assembly line demonstrating structural precision and automated telemetry.',
    provider: 'mock',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-moving-fast-in-a-factory-42998-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    aspect_ratio: '16:9',
    duration_seconds: 5,
    status: 'completed',
    purpose: 'hero_bg',
    prompt: 'Cinematic corporate shot of advanced automated robotic machinery, crisp metallic reflections, dark atmospheric lighting, 4k 60fps',
    is_featured: true,
    is_public: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'vid_nextep_showcase',
    company_id: 'comp_nextepstudio',
    company_name: 'Nextepstudio',
    title: 'Digital Horizons & Creative Interaction',
    description: 'Kinetic 3D typography and abstract geometric flow for digital product studio branding.',
    provider: 'mock',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-code-31911-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    aspect_ratio: '16:9',
    duration_seconds: 5,
    status: 'completed',
    purpose: 'brand_campaign',
    prompt: 'Abstract holographic data visualizer, glowing sleek lines, minimalist dark cyber environment, cinematic slow tracking shot',
    is_featured: true,
    is_public: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'vid_rozena_showcase',
    company_id: 'comp_rozena',
    company_name: 'Rozena',
    title: 'Contemporary Silhouette Campaign',
    description: 'Minimalist luxury lifestyle studio showcase highlighting modern textiles and movement.',
    provider: 'mock',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-futuristic-silver-outfit-39871-large.mp4',
    thumbnail_url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    aspect_ratio: '9:16',
    duration_seconds: 5,
    status: 'completed',
    purpose: 'social_reel',
    prompt: 'High fashion editorial model in modern monochrome setting, soft cinematic lighting, premium studio slow motion',
    is_featured: true,
    is_public: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];
