import { useEffect, useRef, useState } from 'react'
import { BookOpenText, ChevronLeft, ChevronRight, ChevronsRight, Globe2, GraduationCap, IdCard, Mail, Menu, Phone, UserRoundCheck, X } from 'lucide-react'
import HomeProgrammeCards from './HomeProgrammeCards'
import LanguageSelector from './LanguageSelector'
import { getLanguage, getNavigation, withLanguage } from './language'
import './HomePage.css'

const banners = [
  { image: '/uis/imicitra-kini-dibuka-banner.jpg', href: 'https://imcitra.uis.edu.my/', alt: 'Program Micro-Credential UIS' },
  { image: '/uis/apel-c-2026.jpg', alt: 'APEL C UIS 2026' },
  { image: '/uis/ptptn-sesi-261.jpg', href: 'https://docs.google.com/forms/d/e/1FAIpQLSdwMlsfO9myJl5DVWWR3zOcTi1AujvRPrNyDbcmp6TopWQJXA/viewform', alt: 'PTPTN UIS 2026' },
  { image: '/uis/Banner_Ikuti_Media_Sosial_UISWEB.jpg', alt: 'Media sosial UIS' },
]

const brochureBase = [
  { href: '/program-pengajian?level=foundation', icon: IdCard },
  { href: '/program-pengajian?level=diploma', icon: BookOpenText },
  { href: '/program-pengajian?level=bachelor', icon: GraduationCap },
  { href: '/program-pengajian?level=master', icon: Globe2 },
  { href: '/program-pengajian?level=phd', icon: UserRoundCheck },
]

const achievementValues = [
  { value: 29876, suffix: '+' },
  { value: 70, suffix: '+' },
  { value: 34 },
  { value: 5 },
]

const homeCopy = {
  ms: {
    programmeHeading: 'Terokai Pilihan Program Pengajian Berkualiti untuk Masa Depan Anda!',
    brochureEyebrow: 'Panduan Pengajian UIS', brochureTitle: 'Brosur Digital',
    brochureIntro: 'Terokai program mengikut tahap pengajian dan kategori pelajar.',
    brochureLink: 'Lihat program', brochureAll: 'Lihat Semua Program',
    brochures: [
      ['Program Asasi', 'Laluan persediaan universiti'], ['Program Diploma', 'Pengajian berfokus dan praktikal'],
      ['Program Sarjana Muda', 'Pengajian peringkat ijazah'], ['Program Sarjana', 'Kerja kursus dan penyelidikan'],
      ['Doktor Falsafah (PhD)', 'Penyelidikan peringkat tertinggi'],
    ],
    achievementTitle: 'Pencapaian UIS',
    achievementIntro: 'Lebih tiga dekad menerajui tradisi ilmu dan membina generasi profesional berteraskan nilai Islam.',
    achievementLabels: ['Graduan sejak 1995', 'Program diluluskan MQA', 'Program tanpa syarat Bahasa Arab SPM', 'Peringkat pengajian'],
    previous: 'Banner sebelumnya', next: 'Banner seterusnya', show: 'Paparkan banner', open: 'Buka menu', close: 'Tutup menu',
    copyright: '© 2026 UIS. Hakcipta Terpelihara', legal: ['Penafian', 'Dasar Privasi', 'Dasar Keselamatan', 'Notis Hakcipta'],
  },
  en: {
    programmeHeading: 'Explore Quality Study Programme Options for Your Future!',
    brochureEyebrow: 'UIS Study Guide', brochureTitle: 'Digital Brochure',
    brochureIntro: 'Explore programmes by level of study and student category.',
    brochureLink: 'View programmes', brochureAll: 'View All Programmes',
    brochures: [
      ['Foundation Programmes', 'University preparation pathway'], ['Diploma Programmes', 'Focused and practical study'],
      ["Bachelor's Programmes", 'Undergraduate degree study'], ["Master's Programmes", 'Coursework and research'],
      ['Doctor of Philosophy (PhD)', 'Highest-level research study'],
    ],
    achievementTitle: 'UIS Achievements',
    achievementIntro: 'More than three decades of leading a tradition of knowledge and developing professionals grounded in Islamic values.',
    achievementLabels: ['Graduates since 1995', 'MQA-approved programmes', 'Programmes without SPM Arabic requirement', 'Levels of study'],
    previous: 'Previous banner', next: 'Next banner', show: 'Show banner', open: 'Open menu', close: 'Close menu',
    copyright: '© 2026 UIS. All Rights Reserved', legal: ['Disclaimer', 'Privacy Policy', 'Security Policy', 'Copyright Notice'],
  },
  zh: {
    programmeHeading: '探索优质课程，为未来开启更多可能！',
    brochureEyebrow: 'UIS 学习指南', brochureTitle: '电子课程手册',
    brochureIntro: '按学习阶段浏览 UIS 提供的课程。',
    brochureLink: '查看课程', brochureAll: '查看所有课程',
    brochures: [
      ['大学预科课程', '进入大学前的学术准备'], ['文凭课程', '专业且实用的学习'],
      ['学士学位课程', '本科阶段学习'], ['硕士课程', '课程与研究模式'],
      ['哲学博士（PhD）', '最高阶段的研究学习'],
    ],
    achievementTitle: 'UIS 成就',
    achievementIntro: '三十多年来，UIS 坚持知识传统，培养以伊斯兰价值观为基础的专业人才。',
    achievementLabels: ['自 1995 年以来的毕业生', '获 MQA 批准的课程', '无需 SPM 阿拉伯语要求的课程', '学习阶段'],
    previous: '上一张横幅', next: '下一张横幅', show: '显示横幅', open: '打开菜单', close: '关闭菜单',
    copyright: '© 2026 UIS。版权所有', legal: ['免责声明', '隐私政策', '安全政策', '版权声明'],
  },
  ar: {
    programmeHeading: 'اكتشف برامج دراسية عالية الجودة لمستقبلك!',
    brochureEyebrow: 'دليل الدراسة في UIS', brochureTitle: 'الكتيب الرقمي',
    brochureIntro: 'استكشف البرامج حسب المرحلة الدراسية وفئة الطالب.',
    brochureLink: 'عرض البرامج', brochureAll: 'عرض جميع البرامج',
    brochures: [
      ['البرامج التأسيسية', 'مسار تحضيري للجامعة'], ['برامج الدبلوم', 'دراسة عملية ومتخصصة'],
      ['برامج البكالوريوس', 'الدراسة الجامعية'], ['برامج الماجستير', 'المقررات والبحث'],
      ['دكتوراه الفلسفة', 'أعلى مستوى من الدراسة البحثية'],
    ],
    achievementTitle: 'إنجازات UIS',
    achievementIntro: 'أكثر من ثلاثة عقود من ريادة تقاليد العلم وإعداد مهنيين يستندون إلى القيم الإسلامية.',
    achievementLabels: ['الخريجون منذ 1995', 'برامج معتمدة من MQA', 'برامج لا تشترط العربية في SPM', 'المراحل الدراسية'],
    previous: 'الشريحة السابقة', next: 'الشريحة التالية', show: 'عرض الشريحة', open: 'فتح القائمة', close: 'إغلاق القائمة',
    copyright: '© 2026 UIS. جميع الحقوق محفوظة', legal: ['إخلاء المسؤولية', 'سياسة الخصوصية', 'سياسة الأمان', 'حقوق النشر'],
  },
}

function SocialLinks({ footer = false }) {
  return <div className={footer ? 'home-footer-socials' : 'home-socials'}>
    <a href="https://www.facebook.com/UISrasmi" target="_blank" rel="noreferrer" aria-label="Facebook UIS"><img src="/uis/icons/facebook.svg" alt=""/></a>
    <a href="https://www.youtube.com/@UISrasmi" target="_blank" rel="noreferrer" aria-label="YouTube UIS"><img src="/uis/icons/youtube.svg" alt=""/></a>
    <a href="https://www.instagram.com/UISrasmi" target="_blank" rel="noreferrer" aria-label="Instagram UIS"><img src="/uis/icons/instagram.svg" alt=""/></a>
    <a href="https://www.tiktok.com/@UISrasmi" target="_blank" rel="noreferrer" aria-label="TikTok UIS"><img src="/uis/icons/tiktok.svg" alt=""/></a>
  </div>
}

function HomeHeader({ menuOpen, setMenuOpen, language, copy }) {
  const nav = getNavigation(language)
  return <>
    <div className="home-topbar"><div className="home-topbar-inner">
      <div className="home-topbar-left"><SocialLinks/><LanguageSelector className="home-languages"/></div>
      <div className="home-topbar-contact"><a href="tel:+60389117000"><Phone/> +603 8911 7000</a><a href="mailto:info@uis.edu.my"><Mail/> info@uis.edu.my</a></div>
    </div></div>
    <header className="home-header">
      <a className="home-logo" href={withLanguage('/', language)}><img src="/uis/logo-study-uis-2025.png" alt="Study at Universiti Islam Selangor"/></a>
      <nav className="home-nav">{nav.map(([label, href], index) => <a className={index === 0 ? 'active' : ''} href={withLanguage(href, language)} key={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>{label}</a>)}</nav>
      <button type="button" className="home-menu-button" onClick={() => setMenuOpen(true)} aria-label={copy.open}><Menu/></button>
    </header>
    {menuOpen && <div className="home-mobile-menu"><button type="button" onClick={() => setMenuOpen(false)} aria-label={copy.close}><X/></button>{nav.map(([label, href]) => <a href={withLanguage(href, language)} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}</div>}
  </>
}

function HomeCarousel({ copy }) {
  const [slide, setSlide] = useState(0)
  useEffect(() => { const timer = window.setInterval(() => setSlide((current) => (current + 1) % banners.length), 5500); return () => window.clearInterval(timer) }, [])
  const changeSlide = (next) => setSlide((next + banners.length) % banners.length)
  return <section className="home-carousel" aria-label="UIS">
    <div className="home-carousel-stage">{banners.map((banner, index) => {
      const image = <img src={banner.image} alt={banner.alt}/>
      return <div className={'home-slide ' + (index === slide ? 'active' : '')} aria-hidden={index !== slide} key={banner.image}>{banner.href ? <a href={banner.href} target="_blank" rel="noreferrer" tabIndex={index === slide ? 0 : -1}>{image}</a> : image}</div>
    })}</div>
    <button className="home-carousel-arrow previous" type="button" onClick={() => changeSlide(slide - 1)} aria-label={copy.previous}><ChevronLeft/></button>
    <button className="home-carousel-arrow next" type="button" onClick={() => changeSlide(slide + 1)} aria-label={copy.next}><ChevronRight/></button>
    <div className="home-carousel-dots">{banners.map((banner, index) => <button type="button" className={index === slide ? 'active' : ''} onClick={() => setSlide(index)} aria-label={copy.show + ' ' + (index + 1)} key={banner.image}/>)}</div>
  </section>
}

function HomeDigitalBrochure({ language, copy }) {
  return <section className="home-brochure" aria-labelledby="home-brochure-title">
    <div className="home-brochure-inner">
      <div className="home-brochure-heading">
        <span>{copy.brochureEyebrow}</span><h2 id="home-brochure-title">{copy.brochureTitle}</h2><p>{copy.brochureIntro}</p>
      </div>
      <div className="home-brochure-grid">
        {brochureBase.map(({ href, icon: Icon }, index) => {
          const [title, audience] = copy.brochures[index]
          return <a href={withLanguage(href, language)} className="home-brochure-card" key={href}>
            <span className="home-brochure-icon"><Icon aria-hidden="true"/></span><strong>{title}</strong><small>{audience}</small>
            <span className="home-brochure-link">{copy.brochureLink} <ChevronRight aria-hidden="true"/></span>
          </a>
        })}
      </div>
      <a className="home-brochure-more" href={withLanguage('/program-pengajian', language)}><ChevronsRight aria-hidden="true"/> {copy.brochureAll}</a>
    </div>
  </section>
}

function HomeAchievements({ copy }) {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setProgress(1); return undefined }
    let frame
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const startedAt = performance.now()
      const animate = (now) => {
        const elapsed = Math.min((now - startedAt) / 2000, 1)
        setProgress(1 - Math.pow(1 - elapsed, 3))
        if (elapsed < 1) frame = requestAnimationFrame(animate)
      }
      frame = requestAnimationFrame(animate)
    }, { threshold: 0.25 })
    observer.observe(section)
    return () => { observer.disconnect(); if (frame) cancelAnimationFrame(frame) }
  }, [])
  return <section className="home-achievements" ref={sectionRef} aria-labelledby="home-achievements-title">
    <div className="home-achievements-inner">
      <div className="home-achievements-intro"><span className="home-achievements-eyebrow">Universiti Islam Selangor</span><h2 id="home-achievements-title">{copy.achievementTitle}</h2><p>{copy.achievementIntro}</p></div>
      <div className="home-achievements-grid">{achievementValues.map(({ value, suffix = '' }, index) => <div className="home-achievement" key={copy.achievementLabels[index]}><strong>{Math.round(value * progress).toLocaleString('en-MY')}{suffix}</strong><span>{copy.achievementLabels[index]}</span></div>)}</div>
    </div>
  </section>
}

function HomeFooter({ copy }) {
  return <footer className="home-footer">
    <div className="home-footer-contact"><div className="home-footer-contact-inner"><p><strong>Universiti Islam Selangor (UIS),</strong> Bandar Seri Putra, 43000 Kajang, Selangor, MALAYSIA.</p><a href="tel:+60389117000"><Phone/> +603 8911 7000</a><a href="mailto:info@uis.edu.my"><Mail/> info@uis.edu.my</a><SocialLinks footer/></div></div>
    <div className="home-footer-bottom"><span>{copy.copyright}</span><span>{copy.legal.map((item, index) => <span key={item}>{index > 0 && ' | '}<a href="#">{item}</a></span>)}</span></div>
  </footer>
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const language = getLanguage()
  const copy = homeCopy[language] || homeCopy.ms
  useEffect(() => { document.documentElement.lang = language; document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr' }, [language])
  return <div className="uis-home" dir={language === 'ar' ? 'rtl' : 'ltr'}><HomeHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} language={language} copy={copy}/><main><HomeCarousel copy={copy}/><section className="home-programmes"><div className="home-programmes-inner"><h1>{copy.programmeHeading}</h1><span className="home-title-line"/><HomeProgrammeCards language={language}/></div></section><HomeDigitalBrochure language={language} copy={copy}/><HomeAchievements copy={copy}/></main><HomeFooter copy={copy}/></div>
}