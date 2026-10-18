'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const translations: Record<string, [string, string]> = {
  'Back to NEXORA GROUP Portfolio': ['NEXORA GROUP 포트폴리오로 돌아가기', '返回 NEXORA GROUP 企业组合'],
  'Ventures:': ['계열사:', '旗下企业：'],
  'Verified Official Portal': ['공식 사이트 인증', '已验证官方网站'],
  'Visit Official Website': ['공식 웹사이트 방문', '访问官方网站'],
  'Explore Capabilities': ['주요 역량 살펴보기', '探索核心能力'],
  'Expertise & Solutions': ['전문 분야 및 솔루션', '专业能力与解决方案'],
  'Work & Case Studies': ['프로젝트 및 사례', '项目与案例'],
  'View Projects on Official Website': ['공식 웹사이트에서 프로젝트 보기', '在官方网站查看项目'],
  'Explore on Official Portal': ['공식 사이트에서 살펴보기', '前往官方网站探索'],
  'No Apps Required': ['앱 설치 불필요', '无需安装应用'],
  'Real-Time AI Facade': ['실시간 AI 미디어 파사드', '实时 AI 媒体立面'],
  'Mythic Heritage Stories': ['신화와 문화유산 이야기', '神话与文化遗产故事'],
  'Audiences interact frictionlessly without downloading specialized applications.': [
    '별도의 앱 설치 없이 관람객이 자유롭게 참여할 수 있습니다.',
    '观众无需下载专用应用即可轻松参与互动。'
  ],
  'Instantly converts submitted memories into generative animated media art.': [
    '공유된 추억을 실시간 생성형 미디어 아트로 변환합니다.',
    '将提交的回忆实时转化为生成式动态媒体艺术。'
  ],
  'Embedded narrative engines such as the Jeju Island Myth installation.': [
    '제주 신화 설치 작품과 같은 스토리텔링 기술을 적용합니다.',
    '融合济州岛神话装置等叙事引擎。'
  ],
  'Promptless click-to-fit AI garment simulation': [
    '프롬프트 없이 클릭만으로 AI 의류 가상 피팅',
    '无需提示词，点击即可进行 AI 虚拟试衣'
  ],
  'Cross-platform availability: iOS, Android, and Web': [
    'iOS, Android 및 웹 지원',
    '支持 iOS、Android 和网页'
  ],
  'High-resolution commercial marketing asset generation': [
    '고해상도 상업용 마케팅 이미지 생성',
    '生成高分辨率商业营销素材'
  ],
  'Curated soft grunge aesthetic & streetwear capsules': [
    '소프트 그런지 감성의 스트리트웨어 컬렉션',
    '精选柔和颓废风街头服饰系列'
  ],
  'Integrated manufacturing, branding, and distribution': [
    '제조·브랜딩·유통 통합 운영',
    '整合制造、品牌与分销'
  ],
  'Adaptive e-commerce UX designed for high customer engagement': [
    '고객 참여를 높이는 맞춤형 쇼핑 경험',
    '提升客户参与度的自适应电商体验'
  ],
  'Over 16 years of engineering visualization excellence': [
    '16년 이상의 엔지니어링 시각화 전문성',
    '超过16年的工程可视化经验'
  ],
  'Interactive hardware & real-time rendering systems': [
    '인터랙티브 하드웨어 및 실시간 렌더링 시스템',
    '交互式硬件与实时渲染系统'
  ],
  'BIM-based civil, commercial, and architectural media': [
    'BIM 기반 토목·상업·건축 미디어',
    '基于 BIM 的土木、商业及建筑媒体'
  ],
  'Jeju Folk Village permanent immersive installation': [
    '제주민속촌 상설 몰입형 설치',
    '济州民俗村常设沉浸式装置'
  ],
  'Turnkey theme park attraction operation and IP development': [
    '테마파크 어트랙션 운영 및 IP 개발',
    '主题公园项目运营与知识产权开发'
  ],
  'Synchronized audio-visual environmental lighting networks': [
    '영상·음향·환경 조명 통합 시스템',
    '同步音视频与环境照明系统'
  ],
  "Men's Line": ['남성복', '男装系列'],
  "Women's Line": ['여성복', '女装系列'],
  'Shirts & Tees': ['셔츠 및 티셔츠', '衬衫与 T 恤'],
  'Accessories': ['액세서리', '配饰'],
  'Tailored Jackets & Pants': ['테일러드 재킷 및 팬츠', '剪裁夹克与长裤'],
  'Fluid Silhouettes': ['유연한 실루엣', '流畅廓形'],
  'High-Density Cotton': ['고밀도 코튼', '高密度棉'],
  'Curated Bags & Leather': ['엄선된 가방 및 가죽 제품', '精选包袋与皮具'],
  'Experience AIVALAPS on rozena.co.kr': ['rozena.co.kr에서 AIVALAPS 체험하기', '在 rozena.co.kr 体验 AIVALAPS'],
  'Visit ROZENA Fashion Store': ['ROZENA 패션 스토어 방문', '访问 ROZENA 时尚商店'],
  'Explore STORYSYNC Pro on damgara.co.kr': ['damgara.co.kr에서 STORYSYNC Pro 살펴보기', '在 damgara.co.kr 探索 STORYSYNC Pro'],
  'View Technical Portfolio on nextep.co.kr': ['nextep.co.kr에서 기술 포트폴리오 보기', '在 nextep.co.kr 查看技术作品集'],
  'Learn more on nextep.co.kr': ['nextep.co.kr에서 자세히 보기', '在 nextep.co.kr 了解更多'],
  'Shop NOEUL at noeul.me': ['noeul.me에서 NOEUL 쇼핑하기', '在 noeul.me 选购 NOEUL'],
  'Our Companies': ['계열사 소개', '旗下公司'],
  'Explore Company': ['기업 자세히 보기', '了解公司'],
  'Official Website': ['공식 웹사이트', '官方网站'],
  'Website Coming Soon': ['웹사이트 준비 중', '网站即将上线'],
  'Verified Live': ['공식 사이트 확인됨', '已验证上线'],
  'Portfolio Ventures': ['포트폴리오 기업', '投资组合企业'],
  'AI Tech & Fashion': ['AI 기술 및 패션', 'AI 技术与时尚'],
  'AI Media Art': ['AI 미디어 아트', 'AI 媒体艺术'],
  'Digital Content & CG': ['디지털 콘텐츠 및 CG', '数字内容与 CG'],
  'Contemporary Fashion': ['컨템포러리 패션', '当代时尚'],
  'Profile': ['소개', '简介'],
  'Company Directory': ['기업 목록', '公司目录'],
  'Privacy Policy': ['개인정보 처리방침', '隐私政策'],
  'Terms of Service': ['이용약관', '服务条款'],
  'Platform': ['플랫폼', '平台'],
  'Previous Company': ['이전 계열사', '上一家公司'],
  'Next Company': ['다음 계열사', '下一家公司'],
  'Key Highlights': ['주요 특징', '核心亮点'],
  'Overview': ['개요', '概览'],
  'All 4 Portfolio Companies Active': ['4개 계열사 모두 정상 운영 중', '全部 4 家企业正常运营']
};

export default function SiteLanguageContent() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const originalMap = useRef(new WeakMap<Text, string>());
  const isTranslating = useRef(false);

  useEffect(() => {
    if (pathname.startsWith('/admin')) return;

    const translate = () => {
      if (isTranslating.current) return;
      isTranslating.current = true;

      try {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
          const textNode = node as Text;
          const parent = textNode.parentElement;
          // Skip interactive React elements, form controls, and scripts
          if (
            !parent ||
            parent.closest('button, nav, [role="button"], [role="option"], [role="listbox"], [data-no-translate], script, style, textarea, input, select, option, [contenteditable="true"]')
          ) {
            continue;
          }

          const raw = originalMap.current.get(textNode) ?? textNode.textContent ?? '';
          const trimmed = raw.trim();
          if (!trimmed || !translations[trimmed]) continue;

          if (!originalMap.current.has(textNode)) {
            originalMap.current.set(textNode, raw);
          }

          const targetTranslation =
            language === 'ko'
              ? translations[trimmed][0]
              : language === 'zh'
              ? translations[trimmed][1]
              : trimmed;

          const next = raw.replace(trimmed, targetTranslation);
          if (textNode.textContent !== next) {
            textNode.textContent = next;
          }
        }
      } finally {
        isTranslating.current = false;
      }
    };

    translate();

    // Observe only childList additions (no characterData to avoid mutation loops)
    const observer = new MutationObserver(() => {
      if (!isTranslating.current) {
        translate();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [pathname, language]);

  return null;
}
