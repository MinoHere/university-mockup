import { useState } from 'react'
import { ArrowLeft, ArrowRight, BookOpen, GraduationCap, School } from 'lucide-react'
import { getLanguage, withLanguage } from './language'
import './AdmissionInformation.css'

const levels = {
  foundation: { icon: School, image: '/uis/program-asasi-2.jpg', programmeLevel: 'foundation' },
  undergraduate: { icon: GraduationCap, image: '/uis/program-ism.jpg', programmeLevel: 'bachelor' },
  postgraduate: { icon: BookOpen, image: '/uis/program-sarjana-r.jpg', programmeLevel: 'master' },
}
const copy = {
  ms: {
    heading: 'Maklumat Kemasukan untuk Bakal Pelajar', kicker: 'MAKLUMAT KEMASUKAN', change: 'Tukar Kategori', requirement: 'Syarat Kemasukan', offered: 'Program Ditawarkan', next: 'Langkah Seterusnya',
    nextText: 'Semak syarat program yang sesuai terlebih dahulu. Saluran permohonan dalam talian akan ditempatkan selepas aliran ini dimuktamadkan.',
    levels: {
      foundation: ['Foundation', 'Program Asasi', 'Program Asasi menyediakan laluan persediaan akademik kepada lepasan SPM atau kelayakan setara sebelum melanjutkan pengajian ke peringkat Sarjana Muda di UIS.', 'Pelajar membina asas pengetahuan, kemahiran pembelajaran dan persediaan bahasa mengikut bidang pilihan sebelum memasuki pengajian prasiswazah.', 'Asasi Pengajian Islam, Pengurusan, Teknologi Maklumat, Bahasa Arab, Komunikasi dan Bahasa Inggeris.'],
      undergraduate: ['Undergraduate', 'Program Prasiswazah', 'Program Diploma dan Sarjana Muda UIS menggabungkan pengetahuan bidang, pembelajaran praktikal dan pembangunan kemahiran profesional.', 'Laluan ini sesuai untuk pemohon yang memiliki kelayakan SPM, STPM, STAM, Matrikulasi, Asasi, Diploma atau kelayakan setara, tertakluk kepada syarat program.', 'Diploma dan Sarjana Muda dalam Pengajian Islam, Perniagaan, Teknologi, Pendidikan, Komunikasi dan Bahasa.'],
      postgraduate: ['Postgraduate', 'Program Pascasiswazah', 'Program Sarjana dan Doktor Falsafah UIS menyediakan laluan pengajian lanjutan melalui kerja kursus atau penyelidikan.', 'Pemohon boleh mengembangkan kepakaran profesional atau menjalankan penyelidikan mendalam di bawah penyeliaan akademik dalam bidang berkaitan.', 'Sarjana Kerja Kursus, Sarjana Penyelidikan dan Doktor Falsafah (PhD).'],
    },
  },
  en: {
    heading: 'Admission Information for Prospective Students', kicker: 'ADMISSION INFORMATION', change: 'Change Category', requirement: 'Entry Requirements', offered: 'Programmes Offered', next: 'Next Step',
    nextText: 'Review the requirements for the programme that suits you. The online application pathway will be added once the flow is finalised.',
    levels: {
      foundation: ['Foundation', 'Foundation Programme', 'The Foundation Programme provides an academic preparation pathway for SPM or equivalent graduates before progressing to Bachelor study at UIS.', 'Students build core knowledge, learning skills and language preparation according to their chosen field before entering undergraduate study.', 'Foundation in Islamic Studies, Management, Information Technology, Arabic, Communication and English.'],
      undergraduate: ['Undergraduate', 'Undergraduate Programmes', 'UIS Diploma and Bachelor programmes combine subject knowledge, practical learning and professional skill development.', 'This pathway is suitable for applicants with SPM, STPM, STAM, Matriculation, Foundation, Diploma or equivalent qualifications, subject to programme requirements.', 'Diploma and Bachelor programmes in Islamic Studies, Business, Technology, Education, Communication and Languages.'],
      postgraduate: ['Postgraduate', 'Postgraduate Programmes', 'UIS Master and Doctor of Philosophy programmes provide advanced study through coursework or research.', 'Applicants can develop professional expertise or conduct in-depth research under academic supervision in a related field.', 'Taught Master, Research Master and Doctor of Philosophy (PhD).'],
    },
  },
  zh: {
    heading: '未来学生入学信息', kicker: '入学信息', change: '更换类别', requirement: '入学要求', offered: '提供的课程', next: '下一步',
    nextText: '请先查看适合您的课程要求。线上申请渠道将在流程确定后提供。',
    levels: {
      foundation: ['Foundation', '大学预科课程', '预科课程为 SPM 或同等资格毕业生提供学术准备，之后可进入 UIS 学士阶段学习。', '学生根据所选领域建立基础知识、学习技能和语言准备。', '伊斯兰研究、管理、信息技术、阿拉伯语、传播及英语预科。'],
      undergraduate: ['Undergraduate', '本科课程', 'UIS 文凭和学士课程结合专业知识、实践学习及职业技能发展。', '适合拥有 SPM、STPM、STAM、预科、文凭或同等资格的申请者，具体以课程要求为准。', '伊斯兰研究、商业、科技、教育、传播及语言类文凭和学士课程。'],
      postgraduate: ['Postgraduate', '研究生课程', 'UIS 硕士及哲学博士课程通过授课或研究提供深造途径。', '申请者可在相关领域发展专业能力，或在学术指导下进行深入研究。', '授课型硕士、研究型硕士及哲学博士。'],
    },
  },
  ar: {
    heading: 'معلومات القبول للطلاب المحتملين', kicker: 'معلومات القبول', change: 'تغيير الفئة', requirement: 'متطلبات القبول', offered: 'البرامج المتاحة', next: 'الخطوة التالية',
    nextText: 'راجع متطلبات البرنامج المناسب لك أولاً. ستتم إضافة مسار التقديم الإلكتروني بعد اعتماد العملية.',
    levels: {
      foundation: ['Foundation', 'البرنامج التأسيسي', 'يوفر البرنامج التأسيسي مساراً أكاديمياً لخريجي SPM أو ما يعادله قبل الانتقال إلى دراسة البكالوريوس في UIS.', 'يبني الطلاب المعرفة الأساسية ومهارات التعلم والاستعداد اللغوي وفق المجال المختار.', 'التأسيس في الدراسات الإسلامية والإدارة وتقنية المعلومات والعربية والاتصال والإنجليزية.'],
      undergraduate: ['Undergraduate', 'برامج البكالوريوس', 'تجمع برامج الدبلوم والبكالوريوس في UIS بين المعرفة الأكاديمية والتعلم العملي وتطوير المهارات المهنية.', 'يناسب هذا المسار المتقدمين الحاصلين على SPM أو STPM أو STAM أو الدبلوم أو ما يعادلها وفق متطلبات البرنامج.', 'برامج الدبلوم والبكالوريوس في الدراسات الإسلامية والأعمال والتقنية والتعليم والاتصال واللغات.'],
      postgraduate: ['Postgraduate', 'برامج الدراسات العليا', 'تقدم برامج الماجستير والدكتوراه في UIS دراسة متقدمة من خلال المقررات أو البحث.', 'يمكن للمتقدمين تطوير خبراتهم المهنية أو إجراء بحث متعمق تحت إشراف أكاديمي.', 'ماجستير بالمقررات وماجستير بحثي ودكتوراه الفلسفة.'],
    },
  },
}

export default function AdmissionInformation({ audience, language = getLanguage() }) {
  const requested = new URLSearchParams(window.location.search).get('level')
  const initialLevel = levels[requested] ? requested : 'foundation'
  const [activeLevel, setActiveLevel] = useState(initialLevel)
  const text = copy[language] || copy.ms
  const level = levels[activeLevel]
  const levelText = text.levels[activeLevel]
  const audienceLabel = audience === 'international' ? (language === 'ms' ? 'International Student' : language === 'zh' ? '国际学生' : language === 'ar' ? 'الطلاب الدوليون' : 'International Student') : (language === 'ms' ? 'Pelajar Malaysia' : language === 'zh' ? '马来西亚学生' : language === 'ar' ? 'الطلاب الماليزيون' : 'Malaysian Student')

  return <section className="admission-information">
    <div className="admission-information-heading"><div><p>{text.kicker}</p><h2>{text.heading}</h2><span>{audienceLabel}</span></div><a href={withLanguage('/permohonan-semakan', language)}><ArrowLeft size={16}/> {text.change}</a></div>
    <div className="admission-level-tabs" role="tablist" aria-label={text.kicker}>{Object.entries(levels).map(([id, item]) => { const Icon = item.icon; return <button type="button" role="tab" aria-selected={activeLevel === id} className={activeLevel === id ? 'active' : ''} key={id} onClick={() => setActiveLevel(id)}><Icon size={17}/>{levelTextFor(copy, language, id)}</button> })}</div>
    <div className="admission-level-panel" role="tabpanel"><div className="admission-level-copy"><p className="admission-level-kicker">{levelText[0]}</p><h3>{levelText[1]}</h3><p>{levelText[2]}</p><p>{levelText[3]}</p><a className="admission-requirements" href={withLanguage('/program-pengajian?level=' + level.programmeLevel, language)}>{text.requirement} <ArrowRight size={16}/></a></div><img src={level.image} alt={levelText[1]}/></div>
    <div className="admission-info-notes"><article><span>{text.offered}</span><p>{levelText[4]}</p></article><article><span>{text.next}</span><p>{text.nextText}</p></article></div>
  </section>
}

function levelTextFor(allCopy, language, id) {
  const labels = allCopy[language]?.levels[id] || allCopy.ms.levels[id]
  return labels[0]
}