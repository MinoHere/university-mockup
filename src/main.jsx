import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Menu, X, Phone, Mail, ChevronDown, ExternalLink } from 'lucide-react'
import './styles.css'
import HomePage from './HomePage'
import AccordionProgramExplorer from './AccordionProgramExplorer'
import ProgrammeDetailPage from './ProgrammeDetailPage'
import ApplicationReview from './ApplicationReview'
import AdmissionInformation from './AdmissionInformation'
import ContactPage from './ContactPage'
import LanguageSelector from './LanguageSelector'
import { getLanguage, getNavigation, withLanguage } from './language'

const base = '/uis/'

const funding = [
  ['TAJAAN MATRIKULASI UIS (TMU)', [['Soalan Lazim Berkenaan TMU', '/images/pembiayaan/faq-tajaan-matrikulasi-uis-2025.pdf']]],
  ['TAJAAN PASCASISWAZAH UIS (TPU)', [['(Sedang dikemas kini)', '#']]],
  ['PERBADANAN TABUNG PENDIDIKAN TINGGI NASIONAL (PTPTN)', [['Portal Rasmi PTPTN', 'https://www.ptptn.gov.my/'], ['Login MyPTPTN', 'https://www.ptptn.gov.my/myptptn']]],
  ['MAJLIS AMANAH RAKYAT (MARA)', [['Portal Rasmi MARA', 'https://www.mara.gov.my/']]],
  ['TABUNG KUMPULAN WANG BIASISWA NEGERI SELANGOR (TKWBNS)', [['Pinjaman Boleh Ubah Dalam Negara (PBDUN)', 'https://danapendidikan.selangor.gov.my/tkwbns/pembiayaan-pendidikan/pbudn'], ['Biasiswa Sagong Tasi (Biasiswa Khas Orang Asli Selangor)', 'https://danapendidikan.selangor.gov.my/tkwbns/pembiayaan-pendidikan/sagong-tasi-ipt']]],
  ['YAYASAN SELANGOR', [['Pinjaman Yayasan Selangor', 'https://yayasanselangor.org.my/pinjaman-pelajaran-2/']]],
  ['TABUNG PENDIDIKAN TAHFIZ AL-QURAN & AL-QIRAAT (TPTAA)', [['Syarat Permohonan', '/images/pembiayaan/brosur-tptaa-252.pdf'], ['Soalan Lazim (FAQ)', '/images/pembiayaan/faq-tptaa-v7-3-11062025.pdf']]],
  ['BANTUAN KEWANGAN PELAJAR ORANG KURANG UPAYA (OKU) â€“ KPT (OKU)', [['Syarat dan Garis Panduan', 'https://biasiswa.mohe.gov.my/bk_oku/'], ['Login KPT OKU', 'https://biasiswa.mohe.gov.my/bk_oku/login.php']]],
  ['JABATAN PERKHIDMATAN AWAM NEGERI SABAH (JPAN SABAH)', [['Portal Rasmi JPAN Sabah', 'https://jpan.sabah.gov.my/soalan-lazim/penjawat-awam/biasiswa']]],
  ['PINJAMAN PENGAJIAN TINGGI NEGERI PERAK DARUL RIDZUAN', [['Permohonan Pinjaman Pengajian Tinggi', 'http://spptp.perak.gov.my/page/main/home.php?id=0']]],
]

const zakat = [
  ['LEMBAGA ZAKAT SELANGOR (LZS)', [['Portal Rasmi LZS', 'https://www.zakatselangor.com.my/'], ['Bantuan Pendidikan Dermasiswa', 'https://www.zakatselangor.com.my/pendidikan']]],
  ['MAJLIS AGAMA ISLAM DAN ADAT ISTIADAT MELAYU KELANTAN (MAIK)', [['Bantuan Melanjutkan Pelajaran ke IPT', 'http://ipt-online.e-maik.my/frmlogin.aspx']]],
  ['MAJLIS AGAMA ISLAM WILAYAH PERSEKUTUAN (MAIWP)', [['Bantuan Am Pelajaran IPT / Bantuan Persediaan IPT', 'https://www.maiwp.gov.my/']]],
  ['MAJLIS UGAMA ISLAM DAN ADAT RESAM MELAYU PAHANG (MUIP)', [['Zakat 4 Pengajian MUIP', 'https://zakat4pengajian.muip.gov.my/appZ4P/']]],
  ['MAJLIS AGAMA ISLAM DAN ADAT MELAYU PERAK (MAIAMP)', [['Bantuan Kemasukan IPTA/IPTS', 'http://online.maiamp.gov.my/bantuanam/']]],
  ['LEMBAGA ZAKAT NEGERI KEDAH DARUL AMAN (LZNK)', [['Bantuan Awal IPT', 'http://ipt.zakatkedah.com.my/iptonline/iptonline_main2.wp?subid=2707'], ['Biasiswa Pengajian Pelajar Dalam Negara', 'http://biasiswa.zakatkedah.com.my/']]],
  ['MAJLIS AGAMA ISLAM NEGERI JOHOR (MAIJ)', [['Borang Skim Bantuan Dermasiswa Pelajaran', 'http://www.maij.gov.my/']]],
  ['MAJLIS UGAMA ISLAM SABAH (MUIS)', [['Skim Bantuan Pendidikan', 'https://appszakat.sabah.gov.my/agihan_skim.php']]],
  ['MAJLIS AGAMA ISLAM NEGERI SEMBILAN (MAINS)', [['Portal Rasmi MAINS', 'https://www.mains.gov.my/v2/']]],
]

function Header({ onMenu, language }) {
  const navigation = getNavigation(language)
  return <>
    <div className="topbar"><div className="top-inner"><LanguageSelector className="site-languages"/><div className="top-links"><a href="tel:+60389117000"><Phone size={14}/> +603 8911 7000</a><a href="mailto:info@uis.edu.my"><Mail size={14}/> info@uis.edu.my</a></div></div></div>
    <header className="site-header"><a href={withLanguage('/', language)} className="logo-wrap"><img src={base+'logo-study-uis-2025.png'} alt="UIS" /></a><nav className="desktop-nav">{navigation.map(([label, href], index) => <a key={href} href={withLanguage(href, language)} target={href.startsWith('http') ? '_blank' : undefined}>{label}{index === 1 && <ChevronDown size={14}/>}</a>)}</nav><button className="menu-btn" onClick={onMenu} aria-label="Buka menu"><Menu/></button></header>
  </>
}
const footerCopy = {
  ms: { contact: 'Hubungi Kami', follow: 'Ikuti Kami', rights: '© 2026 UIS. Hakcipta Terpelihara', disclaimer: 'Penafian', privacy: 'Dasar Privasi', security: 'Dasar Keselamatan', copyright: 'Notis Hakcipta' },
  en: { contact: 'Contact Us', follow: 'Follow Us', rights: '© 2026 UIS. All rights reserved', disclaimer: 'Disclaimer', privacy: 'Privacy Policy', security: 'Security Policy', copyright: 'Copyright Notice' },
  zh: { contact: '\u8054\u7cfb\u6211\u4eec', follow: '\u5173\u6ce8\u6211\u4eec', rights: '© 2026 UIS. \u7248\u6743\u6240\u6709', disclaimer: '\u514d\u8d23\u58f0\u660e', privacy: '\u9690\u79c1\u653f\u7b56', security: '\u5b89\u5168\u653f\u7b56', copyright: '\u7248\u6743\u901a\u77e5' },
  ar: { contact: '\u0627\u062a\u0635\u0644 \u0628\u0646\u0627', follow: '\u062a\u0627\u0628\u0639\u0646\u0627', rights: '© 2026 UIS. \u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638\u0629', disclaimer: '\u0625\u062e\u0644\u0627\u0621 \u0645\u0633\u0624\u0648\u0644\u064a\u0629', privacy: '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629', security: '\u0633\u064a\u0627\u0633\u0629 \u0627\u0644\u0623\u0645\u0627\u0646', copyright: '\u0625\u0634\u0639\u0627\u0631 \u062d\u0642\u0648\u0642 \u0627\u0644\u0646\u0634\u0631' },
}
function Footer({ language = getLanguage() }) { const text = footerCopy[language] || footerCopy.ms; return <footer><div className="footer-main"><div><img className="footer-logo" src={base+'logo-study-uis-2025.png'} alt="UIS"/><p>Universiti Islam Selangor (UIS), Bandar Seri Putra,<br/>43000 Kajang, Selangor, MALAYSIA.</p></div><div><h3>{text.contact}</h3><a href="tel:+60389117000">+603 8911 7000</a><a href="mailto:info@uis.edu.my">info@uis.edu.my</a></div><div><h3>{text.follow}</h3><div className="social"><a href="https://www.facebook.com/UISrasmi">f</a><a href="https://www.instagram.com/UISrasmi">ig</a><a href="https://www.youtube.com/@UISrasmi">yt</a></div></div></div><div className="footer-bottom"><span>{text.rights}</span><span><a href="#">{text.disclaimer}</a> · <a href="#">{text.privacy}</a> · <a href="#">{text.security}</a> · <a href="#">{text.copyright}</a></span></div></footer> }
const pageLabels = {
  ms: { 'Program Pengajian': 'Program Pengajian', 'Permohonan / Semakan Permohonan': 'Permohonan / Semakan Permohonan', 'Maklumat Kemasukan': 'Maklumat Kemasukan', 'Pinjaman & Tajaan': 'Pinjaman & Tajaan', 'Terokai Pilihan Program Pengajian Berkualiti untuk Masa Depan Anda!': 'Terokai Pilihan Program Pengajian Berkualiti untuk Masa Depan Anda!', 'International Student': 'International Student', 'Pelajar Malaysia': 'Pelajar Malaysia' },
  en: { 'Program Pengajian': 'Study Programmes', 'Permohonan / Semakan Permohonan': 'Application / Review', 'Maklumat Kemasukan': 'Admission Information', 'Pinjaman & Tajaan': 'Loans & Sponsorships', 'Terokai Pilihan Program Pengajian Berkualiti untuk Masa Depan Anda!': 'Explore Quality Study Programme Options for Your Future!', 'International Student': 'International Student', 'Pelajar Malaysia': 'Malaysian Student' },
  zh: { 'Program Pengajian': '课程', 'Permohonan / Semakan Permohonan': '申请 / 查询', 'Maklumat Kemasukan': '入学信息', 'Pinjaman & Tajaan': '贷款与赞助', 'Terokai Pilihan Program Pengajian Berkualiti untuk Masa Depan Anda!': '探索优质课程，为未来开启更多可能！', 'International Student': '国际学生', 'Pelajar Malaysia': '马来西亚学生' },
  ar: { 'Program Pengajian': 'البرامج الدراسية', 'Permohonan / Semakan Permohonan': 'التقديم / التحقق', 'Maklumat Kemasukan': 'معلومات القبول', 'Pinjaman & Tajaan': 'القروض والرعاية', 'Terokai Pilihan Program Pengajian Berkualiti untuk Masa Depan Anda!': 'اكتشف برامج دراسية عالية الجودة لمستقبلك!', 'International Student': 'الطلاب الدوليون', 'Pelajar Malaysia': 'الطلاب الماليزيون' },
}
function PageTitle({ title, subtitle, language = getLanguage() }) { const labels = pageLabels[language] || pageLabels.ms; return <section className="page-title"><div className="container"><h1>{labels[title] || title}</h1>{subtitle && <p>{labels[subtitle] || subtitle}</p>}</div></section> }


function Programs() { return <><PageTitle title="Program Pengajian" subtitle="Terokai Pilihan Program Pengajian Berkualiti untuk Masa Depan Anda!"/><main className="container content-pad"><AccordionProgramExplorer language={getLanguage()}/></main></> }

function Apply() { return <><PageTitle title="Permohonan / Semakan Permohonan"/><main className="container content-pad"><ApplicationReview language={getLanguage()}/></main></> }

function Admission({ audience }) { return <><PageTitle title="Maklumat Kemasukan" subtitle={audience === 'international' ? 'International Student' : 'Pelajar Malaysia'}/><main className="container content-pad"><AdmissionInformation audience={audience} language={getLanguage()}/></main></> }

function FundingSection({ title, items }) { return <section className="fund-section"><h2>{title}</h2><div className="fund-grid">{items.map(([name, links], i)=><article className="fund-card" key={name}><div className="fund-number">{i+1}</div><div><h3>{name}</h3>{links.map(([label, href])=><a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}>{label} <ExternalLink size={13}/></a>)}</div></article>)}</div></section> }
function Funding() { return <><PageTitle title="Pinjaman & Tajaan"/><main className="container content-pad"><FundingSection title="Tajaan / Biasiswa / Pinjaman" items={funding}/><FundingSection title="Zakat" items={zakat}/></main></> }
function Contact() { return <ContactPage language={getLanguage()}/> }

function MobileMenu({ close, language }) { const navigation=getNavigation(language); return <div className="mobile-menu"><button onClick={close} className="close-btn"><X/></button>{navigation.map(([label, href])=><a key={href} href={withLanguage(href, language)} target={href.startsWith('http') ? '_blank' : undefined}>{label}</a>)}<div className="mobile-contact"><a href="tel:+60389117000"><Phone size={15}/> +603 8911 7000</a><a href="mailto:info@uis.edu.my"><Mail size={15}/> info@uis.edu.my</a></div></div> }
function App() { const [open, setOpen] = useState(false); const language=getLanguage(); useEffect(()=>{ document.documentElement.lang=language; document.documentElement.dir=language === 'ar' ? 'rtl' : 'ltr' },[language]); const path=window.location.pathname; if (path === '/') return <HomePage/>; const routeParts=path.split('/').filter(Boolean); const programmeCode=path.startsWith('/program-pengajian/') ? routeParts[1] : ''; const applicantType=routeParts[0] === 'permohonan-semakan' && (routeParts[1] === 'malaysian' || routeParts[1] === 'international') ? routeParts[1] : ''; let page=programmeCode?<ProgrammeDetailPage code={decodeURIComponent(programmeCode)}/>:path.includes('program-pengajian')?<Programs/>:applicantType?<Admission audience={applicantType}/>:path.includes('permohonan-semakan')?<Apply/>:path.includes('pinjaman-tajaan')?<Funding/>:path.includes('hubungi-kami')?<Contact/>:<HomePage/>; return <><Header onMenu={()=>setOpen(true)} language={language}/>{page}<Footer language={language}/>{open&&<MobileMenu close={()=>setOpen(false)} language={language}/>}</> }
createRoot(document.getElementById('root')).render(<App />)




