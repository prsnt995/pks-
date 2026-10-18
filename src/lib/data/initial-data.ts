import { Company, Project, ServiceItem, SiteSettings, Video } from '@/types';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: "comp_rozena",
    name: "ROZENA",
    slug: "rozena",
    category: "AI Fashion & Creative Technology",
    description: "ROZENA is a pioneering fashion and creative technology enterprise engineering intuitive, AI-powered platforms. Creator of AIVALAPS® — an intelligent virtual clothing fitting and commercial content generation ecosystem — ROZENA bridges high-aesthetic soft grunge fashion curation with cutting-edge artificial intelligence.",
    vision: "Connecting fashion and technology to create innovative digital experiences.",
    tagline: "AI-Powered Virtual Fitting & Creative Fashion Technology",
    korean_tagline: "패션과 기술을 유기적으로 연결하여 혁신적인 디지털 경험을 창조합니다.",
    cta_text: "Visit Official Website",
    logo_url: "",
    official_url: "https://rozena.co.kr/",
    website_verified: true,
    display_order: 1,
    is_active: true,
    brand_color: "#9E9E9E",
    hero_image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "AIVALAPS® — AI Virtual Clothing Fitting & Content Generation",
      "Soft Grunge Fashion Curation & Dedicated E-Commerce",
      "Studio-Grade Campaign Photography & Video Production without Photoshoots",
      "Self-Contained Pipeline: Branding, Design, Manufacturing & AI Engineering"
    ],
    services_list: [
      {
        title: "AI-Powered Virtual Clothing Fitting",
        description: "Upload garment images and instantly fit them onto lifelike AI models with natural drape and texture rendering via AIVALAPS®.",
        badge: "Core Innovation"
      },
      {
        title: "Fashion Product Image & Video Creation",
        description: "Generate studio-grade campaign photography, video lookbooks, and promotional reels without costly physical shoots.",
        badge: "Generative Media"
      },
      {
        title: "Digital Fashion Content",
        description: "End-to-end digital lookbooks, social media assets, and interactive fashion media engineered for Gen Z and next-gen consumers.",
        badge: "Content Studio"
      },
      {
        title: "Fashion Branding & Visual Design",
        description: "In-house brand identity design, mood curation, and aesthetic styling tailored for contemporary soft-grunge fashion labels.",
        badge: "Brand Identity"
      },
      {
        title: "Creative Technology Solutions",
        description: "Custom AI pipeline integrations, cross-platform app deployment (iOS, Android, Web), and intuitive UX platforms for commerce.",
        badge: "Enterprise Tech"
      }
    ],
    expertise: [
      "AIVALAPS® Engine",
      "Generative Fashion Models",
      "Apparel E-Commerce",
      "Soft Grunge Curation",
      "Multi-Platform App Architecture"
    ],
    founded_year: "2024",
    created_at: "2026-10-10T17:28:23.791Z",
    updated_at: "2026-10-12T04:45:00.000Z"
  },
  {
    id: "comp_damgara",
    name: "DAMGARA",
    slug: "damgara",
    category: "Creative Design & Experiential Technology",
    description: "DAMGARA merges cutting-edge creative design with real-time experiential technology. Flagship creator of STORYSYNC Pro — an interactive AI facade system that captures visitor photos and memories, weaving them into live mythic storytelling projected across architectural surfaces.",
    vision: "Bringing creativity and technology together to develop meaningful digital experiences.",
    tagline: "Your Memories, Projected into Living Stories",
    korean_tagline: "당신의 기억을 살아있는 이야기로 투영하는 실시간 AI 미디어아트",
    cta_text: "Visit Official Website",
    logo_url: "",
    official_url: "https://damgara.co.kr/",
    website_verified: true,
    display_order: 2,
    is_active: true,
    brand_color: "#46B1E1",
    hero_image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "STORYSYNC Pro — Real-Time AI Architectural Facade System",
      "Zero-App, Zero-Setup Interactive Visitor Media Experience",
      "GPS-Tagged Social Photos Transformed into Mythic Storytelling",
      "Large-Scale Architectural Canvas & Public Cultural Installations"
    ],
    services_list: [
      {
        title: "STORYSYNC Pro Real-Time Facade System",
        description: "Architectural-scale media facade transforming crowd photos and GPS-tagged posts into living, mythic narratives in real time.",
        badge: "Flagship Product"
      },
      {
        title: "Creative Design & Visual Direction",
        description: "High-concept spatial visual design, exhibition scenography, and myth-inspired narrative canvases that captivate modern audiences.",
        badge: "Spatial Design"
      },
      {
        title: "Experiential Technology & Digital Solutions",
        description: "Zero-app, zero-interface interactive media art installations enabling audiences to participate frictionlessly via mobile devices.",
        badge: "Interactive Tech"
      },
      {
        title: "Cultural & Tourism Landmark Installations",
        description: "Transforming traditional heritage sites and tourism landmarks (e.g. Jeju Island Myth installations) into dynamic, visitor-generated living canvases.",
        badge: "Public Media Art"
      },
      {
        title: "Business Collaboration & Custom Systems",
        description: "Tailored commercial media systems, enterprise brand facade activations, and customized interactive storytelling hardware/software.",
        badge: "Enterprise Solutions"
      }
    ],
    expertise: [
      "STORYSYNC Pro",
      "Real-Time AI Facade",
      "Architectural Projections",
      "Interactive Media Art",
      "GPS Narrative Weaving"
    ],
    created_at: "2026-10-10T17:28:23.791Z",
    updated_at: "2026-10-12T04:45:00.000Z"
  },
  {
    id: "comp_nextep",
    name: "NEXTEP",
    slug: "nextep",
    category: "Digital Content & Immersive Technology",
    description: "Established in 2008, NEXTEP Studio ((주)넥스텝스튜디오) combines 3D engine technology with AI-assisted computer-generated imagery to redefine next-generation digital content. From real-time rendering and virtual production to theme park operations like Lumiverse ('빛의섬 루미버스'), NEXTEP turns imagination into memorable experiences.",
    vision: "Transforming ideas into memorable experiences through creativity and advanced technology.",
    tagline: "Beyond Technology, Creating Memorable Experiences",
    korean_tagline: "기술의 너머, 기억에 남는 경험을 만듭니다.",
    cta_text: "Visit Official Website",
    logo_url: "",
    official_url: "https://nextep.co.kr/",
    website_verified: true,
    display_order: 3,
    is_active: true,
    brand_color: "#FF3333",
    hero_image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "3D Engine Architecture & Real-Time Hyper-Realistic CGI",
      "VR, AR, & MR Experiential Hardware and Software Development",
      "Theme Park Operations — Creator of '빛의섬 루미버스' (Lumiverse)",
      "BIM-Based Civil, Architectural & Promotional Visualization Since 2008"
    ],
    services_list: [
      {
        title: "3D Graphics & Computer-Generated Imagery",
        description: "High-precision 3D modeling, BIM-based architectural visualization, civil engineering simulation, and hyper-realistic cinematic rendering.",
        badge: "CGI & 3D"
      },
      {
        title: "AI-Assisted Digital Content Production",
        description: "Integrating artificial intelligence into rendering and animation pipelines to accelerate production without compromising cinematic quality.",
        badge: "AI Production"
      },
      {
        title: "VR, AR, & MR Immersive Experiences",
        description: "Virtual, augmented, and mixed reality applications, sensory-integrated simulation hardware, and interactive digital worlds.",
        badge: "Immersive XR"
      },
      {
        title: "Architectural & Promotional Visualization",
        description: "Turnkey promotional videos, real estate pre-sale media, urban planning simulations, and corporate brand films.",
        badge: "Visualization"
      },
      {
        title: "Exhibition & Multimedia Content",
        description: "Multi-projection mapping, interactive museum displays, convention showpieces, and digital art pavilions.",
        badge: "Multimedia"
      },
      {
        title: "Immersive Entertainment & Theme Park Projects",
        description: "Operating major tourist multimedia destinations including Jeju Folk Village's '빛의섬 루미버스' (Lumiverse) night illumination theme park.",
        badge: "Theme Park Operations"
      }
    ],
    expertise: [
      "3D Engine Architecture",
      "Real-Time Rendering",
      "BIM & Civil Visualization",
      "VR/AR/MR Hardware Integration",
      "Theme Park Operations"
    ],
    founded_year: "2008",
    created_at: "2026-10-10T17:28:23.791Z",
    updated_at: "2026-10-12T04:45:00.000Z"
  },
  {
    id: "comp_noeul",
    name: "NOEUL",
    slug: "noeul",
    category: "Contemporary Korean Fashion",
    description: "NOEUL (노을) is a premium Seoul-based contemporary fashion label proposing sensuous silhouettes and understated minimalism. Inspired by the poetic serenity of Seoul's twilight, NOEUL bridges Korean aesthetic sensibility with modern global wardrobe essentials.",
    vision: "Complete Your Style — Inspiring confidence through understated elegance and modern Korean craftsmanship.",
    tagline: "Complete Your Style.",
    korean_tagline: "당신의 스타일을 완성하다.",
    cta_text: "Shop NOEUL",
    logo_url: "",
    official_url: "https://www.noeul.me/",
    website_verified: true,
    display_order: 4,
    is_active: true,
    brand_color: "#D4AF37",
    hero_image_url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Premium Seoul Contemporary Fashion Label",
      "Sensuous Silhouettes & Understated Architectural Minimalism",
      "Signature 2026 S/S 'Silhouette of Twilight' Collection",
      "Seamless Direct Digital E-Commerce Experience at noeul.me"
    ],
    services_list: [
      {
        title: "Men's Contemporary Collection",
        description: "Minimalist tailoring, architectural jackets, structured trousers, and effortless casual wear made from premium fabrics.",
        badge: "Men's Wardrobe"
      },
      {
        title: "Women's Sensuous Silhouettes",
        description: "Fluid tailoring, elegant drapes, versatile modern suits, and seasonal statement pieces with understated poise.",
        badge: "Women's Line"
      },
      {
        title: "Shirts, T-Shirts, Pants & Everyday Essentials",
        description: "Signature high-density cotton tees, fluid button-down shirts, and relaxed tailored slacks built for daily sophistication.",
        badge: "Daily Essentials"
      },
      {
        title: "Curated Fashion Accessories & Bags",
        description: "Complementary leather accessories, minimalist canvas bags, and refined accents that complete the signature silhouette.",
        badge: "Accessories"
      },
      {
        title: "Seamless Online Shopping Experience",
        description: "Full digital storefront at noeul.me with curated lookbooks, secure checkout, global logistics, and membership services.",
        badge: "E-Commerce"
      },
      {
        title: "Brand Identity & Seasonal Collections",
        description: "Signature 2026 S/S 'Silhouette of Twilight' collection and ongoing seasonal capsules crafted in Seoul.",
        badge: "Runway & Lookbook"
      }
    ],
    expertise: [
      "Contemporary Korean Tailoring",
      "Sensuous Silhouettes",
      "Premium Fabric Selection",
      "Seoul Design Aesthetic",
      "Direct-to-Consumer Platform"
    ],
    created_at: "2026-10-10T17:28:23.791Z",
    updated_at: "2026-10-12T04:45:00.000Z"
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj_rozena_1",
    company_id: "comp_rozena",
    company_name: "ROZENA",
    title: "AIVALAPS® — AI Virtual Clothing Fitting Ecosystem",
    category: "AI Platform & Fashion Tech",
    description: "Revolutionary AI platform that fits clothing onto virtual models in real time without complex prompt engineering, producing studio-grade imagery and video.",
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    project_url: "https://rozena.co.kr/",
    is_featured: true,
    tags: [
      "AIVALAPS®",
      "Virtual Fitting",
      "AI Fashion Model",
      "Gen Z Commerce"
    ],
    is_demo: false,
    created_at: "2026-10-10T17:28:23.791Z"
  },
  {
    id: "proj_rozena_2",
    company_id: "comp_rozena",
    company_name: "ROZENA",
    title: "Soft Grunge Contemporary Fashion & Curation",
    category: "Fashion Brand & E-Commerce",
    description: "Curated lifestyle shopping experience for women in their 10s and 20s, merging moody street styling with automated AI model fitting.",
    image_url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    project_url: "https://rozena.co.kr/",
    is_featured: true,
    tags: [
      "Soft Grunge",
      "Streetwear",
      "Lookbook",
      "In-House Design"
    ],
    is_demo: false,
    created_at: "2026-10-10T17:28:23.791Z"
  },
  {
    id: "proj_damgara_1",
    company_id: "comp_damgara",
    company_name: "DAMGARA",
    title: "STORYSYNC Pro — Real-Time AI Architectural Facade",
    category: "Experiential AI Media Art",
    description: "Large-scale public architectural facade system capturing audience memories and instantly weaving them into generative living mythic narratives.",
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    project_url: "https://damgara.co.kr/",
    is_featured: true,
    tags: [
      "STORYSYNC Pro",
      "Facade Projection",
      "Media Art",
      "Real-Time AI"
    ],
    is_demo: false,
    created_at: "2026-10-10T17:28:23.791Z"
  },
  {
    id: "proj_damgara_2",
    company_id: "comp_damgara",
    company_name: "DAMGARA",
    title: "Jeju Island Myth Interactive Living Canvas",
    category: "Cultural Heritage Media Installation",
    description: "Transforming tourists' GPS-tagged photographs into immersive mythic sagas projected across heritage landmarks without requiring mobile app downloads.",
    image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    project_url: "https://damgara.co.kr/",
    is_featured: true,
    tags: [
      "Jeju Island Myth",
      "Cultural Media",
      "Spatial Computing",
      "Zero-App Experience"
    ],
    is_demo: false,
    created_at: "2026-10-10T17:28:23.791Z"
  },
  {
    id: "proj_nextep_1",
    company_id: "comp_nextep",
    company_name: "NEXTEP",
    title: "빛의섬 루미버스 (Lumiverse: Island of Light)",
    category: "Theme Park & Multimedia Experience",
    description: "Operating a premier nocturnal multimedia theme park at Jeju Folk Village, integrating 3D engine projection with spatial light environments.",
    image_url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    project_url: "https://nextep.co.kr/",
    is_featured: true,
    tags: [
      "루미버스 (Lumiverse)",
      "Theme Park",
      "Jeju Folk Village",
      "Spatial Illumination"
    ],
    is_demo: false,
    created_at: "2026-10-10T17:28:23.791Z"
  },
  {
    id: "proj_nextep_2",
    company_id: "comp_nextep",
    company_name: "NEXTEP",
    title: "3D Engine Real-Time Virtual Production & BIM Visualization",
    category: "CGI & Architectural Simulation",
    description: "Cinematic computer-generated imagery, BIM-based civil engineering visualization, and real-time interactive VR/AR/MR content produced since 2008.",
    image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    project_url: "https://nextep.co.kr/",
    is_featured: true,
    tags: [
      "3D Engine",
      "Real-Time Render",
      "BIM Visualization",
      "VR/AR/MR Hardware"
    ],
    is_demo: false,
    created_at: "2026-10-10T17:28:23.791Z"
  },
  {
    id: "proj_noeul_1",
    company_id: "comp_noeul",
    company_name: "NOEUL",
    title: "2026 S/S 'Silhouette of Twilight' (노을의 실루엣)",
    category: "Seasonal Runway Collection",
    description: "Curated collection inspired by Seoul's twilight glow, featuring sensuous silhouettes, fluid drapery, and architectural tailoring.",
    image_url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80",
    project_url: "https://www.noeul.me/",
    is_featured: true,
    tags: [
      "2026 S/S",
      "노을의 실루엣",
      "Seoul Contemporary",
      "Editorial Lookbook"
    ],
    is_demo: false,
    created_at: "2026-10-10T17:28:23.791Z"
  },
  {
    id: "proj_noeul_2",
    company_id: "comp_noeul",
    company_name: "NOEUL",
    title: "Tailored Essentials: Shirts, Denim & Daily Minimalist Wear",
    category: "Contemporary Wardrobe",
    description: "High-density cotton tees, fluid button-down shirts, and relaxed tailored trousers designed for effortless everyday sophistication.",
    image_url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80",
    project_url: "https://www.noeul.me/",
    is_featured: true,
    tags: [
      "Essential Shirts",
      "Premium Cotton",
      "Minimalist Denim",
      "noeul.me"
    ],
    is_demo: false,
    created_at: "2026-10-10T17:28:23.791Z"
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: "serv_eng",
    title: "Engineering & Technical Services",
    category: "Infrastructure & Hardware",
    description: "End-to-end technical system design, equipment engineering, diagnostics, and industrial computing solutions.",
    icon: "Cpu",
    deliverables: [
      "Embedded hardware & sensor integration",
      "Industrial automation architectures",
      "Performance testing & physical stress analysis"
    ],
    is_active: true,
    display_order: 1
  },
  {
    id: "serv_web",
    title: "Website & Application Development",
    category: "Software Engineering",
    description: "High-performance full-stack web applications, cloud-native backend systems, and responsive web platforms.",
    icon: "Code",
    deliverables: [
      "Next.js & React enterprise web platforms",
      "High-speed API & database architectures",
      "Mobile-first responsive corporate interfaces"
    ],
    is_active: true,
    display_order: 2
  },
  {
    id: "serv_products",
    title: "Digital Products & E-Commerce",
    category: "Commerce & Ventures",
    description: "Custom online storefronts, catalog distribution networks, inventory synchronizations, and payment checkout flows.",
    icon: "ShoppingBag",
    deliverables: [
      "Custom transaction and checkout workflows",
      "Omnichannel inventory synchronization",
      "Customer portal and account systems"
    ],
    is_active: true,
    display_order: 3
  },
  {
    id: "serv_branding",
    title: "Branding & Creative Services",
    category: "Brand Strategy",
    description: "Cohesive brand positioning, typographic design systems, visual asset libraries, and marketing collateral.",
    icon: "Palette",
    deliverables: [
      "Brand identity guideline creation",
      "Modern typography & corporate design systems",
      "Creative visual direction & digital kits"
    ],
    is_active: true,
    display_order: 4
  },
  {
    id: "serv_ai",
    title: "AI-Powered Content & Video Production",
    category: "Generative Media",
    description: "Automated high-definition promotional videos, visual advertising loops, and brand storytelling powered by advanced AI models.",
    icon: "Video",
    deliverables: [
      "Generative video ad campaigns for brands",
      "Atmospheric corporate hero background videos",
      "Multiformat social media aspect ratio exports"
    ],
    is_active: true,
    display_order: 5
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  hero_headline: "AI. Fashion. Content. Style.",
  hero_subheadline: "Four Ventures. One Vision.",
  hero_description: "A portfolio of specialized companies spanning AI platforms, immersive media art, next-generation CG production, and contemporary Korean fashion — each a leader in its domain.",
  about_story: "NEXORA GROUP is a forward-thinking business portfolio uniting four specialized ventures: Rozena (AI technology & fashion), Damgara (AI media art experiences), Nextep Studio (3D CG & immersive content), and Noeul (contemporary Korean fashion). Together, we operate at the intersection of artificial intelligence, creative technology, and culture — accelerating ideas from concept to market reality.",
  about_mission: "To build human-centered products and experiences that fuse AI, design, and culture — empowering the next generation of creators, brands, and storytellers.",
  about_vision: "To be a globally recognized multi-venture group that sets the standard for AI-driven creativity, immersive media, and premium lifestyle brands originating from Seoul.",
  contact_email: "contact@nexoragroup.com",
  contact_location: "Seoul, South Korea — Global Digital Presence",
  updated_at: "2026-10-12T04:01:54.000Z"
};

export const INITIAL_VIDEOS: Video[] = [
  {
    id: "vid_hero_showcase",
    company_id: "comp_rozena",
    company_name: "ROZENA",
    title: "AIVALAPS® Virtual Fitting",
    description: "AI-powered real-time clothing simulation and generative model showcase.",
    provider: "mock",
    video_url: "https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-futuristic-silver-outfit-39871-large.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    aspect_ratio: "16:9",
    duration_seconds: 5,
    status: "completed",
    purpose: "hero_bg",
    prompt: "Cinematic fashion model in silver outfit, editorial studio lighting",
    is_featured: true,
    is_public: true,
    created_at: "2026-10-10T17:29:09.315Z",
    updated_at: "2026-10-10T17:29:09.315Z"
  }
];
