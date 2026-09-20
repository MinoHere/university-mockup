export const languageOptions = [
  { code: 'ms', label: 'Bahasa Melayu', flag: '/uis/icons/flag-my.svg' },
  { code: 'en', label: 'English', flag: '/uis/icons/flag-gb.svg' },
  { code: 'zh', label: '中文', flag: '/uis/icons/flag-cn.svg' },
  { code: 'ar', label: 'العربية', flag: '/uis/icons/flag-sa.svg' },
]

const navigation = {
  ms: ['Utama', 'Program Pengajian', 'Micro-Credential', 'Permohonan / Semakan', 'Pinjaman & Tajaan', 'Hubungi Kami'],
  en: ['Home', 'Study Programmes', 'Micro-Credentials', 'Application / Review', 'Loans & Sponsorships', 'Contact Us'],
  zh: ['首页', '课程', '微证书', '申请 / 查询', '贷款与赞助', '联系我们'],
  ar: ['الرئيسية', 'البرامج الدراسية', 'الشهادات المصغرة', 'التقديم / التحقق', 'القروض والرعاية', 'اتصل بنا'],
}

const navigationTargets = [
  '/', '/program-pengajian', 'https://imcitra.uis.edu.my/',
  '/permohonan-semakan', '/pinjaman-tajaan', '/hubungi-kami',
]

export function getLanguage() {
  if (typeof window === 'undefined') return 'ms'
  const requested = new URLSearchParams(window.location.search).get('lang')
  if (languageOptions.some(({ code }) => code === requested)) {
    window.localStorage.setItem('uis-language', requested)
    return requested
  }
  const stored = window.localStorage.getItem('uis-language')
  return languageOptions.some(({ code }) => code === stored) ? stored : 'ms'
}

export function getNavigation(language = 'ms') {
  return navigationTargets.map((href, index) => [navigation[language]?.[index] || navigation.ms[index], href])
}

export function withLanguage(href, language = 'ms') {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return href
  const url = new URL(href, window.location.origin)
  url.searchParams.set('lang', language)
  return url.pathname + url.search + url.hash
}

export function languageHref(language) {
  const url = new URL(window.location.href)
  url.searchParams.set('lang', language)
  return url.pathname + url.search + url.hash
}