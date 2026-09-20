import { withLanguage } from './language'
import './HomeProgrammeCards.css'

const base = '/uis/'
const homeProgrammes = [
  { title: 'Asasi', subtitle: 'Permulaan kepada kecemerlangan akademik', image: 'program-asasi-2.jpg', href: '/program-pengajian?level=foundation' },
  { title: 'Diploma', subtitle: 'Membina potensi diri dengan ilmu, kemahiran dan pengalaman industri', image: 'program-diploma.jpg', href: '/program-pengajian?level=diploma' },
  { title: 'Sarjana Muda', subtitle: 'Meningkatkan pengetahuan, membangunkan kepakaran, melahirkan pemimpin masa depan', image: 'program-ism.jpg', href: '/program-pengajian?level=bachelor' },
  { title: 'Sarjana (Kerja Kursus)', subtitle: 'Melahirkan insan berkepakaran tinggi, memperkukuhkan kepimpinan.', image: 'program-sarjana-kk.jpg', href: '/program-pengajian?level=master' },
  { title: 'Sarjana (Penyelidikan)', subtitle: 'Terokai idea baharu. Sumbang kepada disiplin ilmu terpilih.', image: 'program-sarjana-r.jpg', href: '/program-pengajian?level=master' },
  { title: 'Doktor Falsafah (PhD)', subtitle: 'Jadilah pakar penyelidik dalam disiplin ilmu terpilih', image: 'program-phd.jpg', href: '/program-pengajian?level=phd' },
]

export default function HomeProgrammeCards({ language = 'ms' }) {
  return <div className="home-programme-grid">
    {homeProgrammes.map((programme) => <a className="home-programme-card" href={withLanguage(programme.href, language)} key={programme.title} aria-label={programme.title + ': ' + programme.subtitle}>
      <img src={base + programme.image} alt=""/>
    </a>)}
  </div>
}