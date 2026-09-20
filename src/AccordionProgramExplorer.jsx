import { useMemo, useState } from 'react'
import {
  BookOpen, BriefcaseBusiness, ChevronDown, ChevronRight, Clock3,
  Download, ExternalLink, FileCheck2, GraduationCap, Landmark,
  List, Tag, Target, Users,
} from 'lucide-react'
import { programmeLevels } from './programCatalog'
import { getLanguage } from './language'
import './AccordionProgramExplorer.css'
import './AccordionProgramExplorerLevelList.css'
import './AccordionProgramExplorerInline.css'
import './AccordionProgramExplorerPoints.css'

const levelMap = Object.fromEntries(programmeLevels.map((level) => [level.id, level]))
const groups = [
  { id: 'foundation', label: 'Asasi', levels: ['foundation'] },
  { id: 'diploma', label: 'Diploma', levels: ['diploma'] },
  { id: 'bachelor', label: 'Sarjana Muda', levels: ['bachelor'] },
  { id: 'master', label: 'Sarjana', levels: ['masterCoursework', 'masterResearch'] },
  { id: 'phd', label: 'PhD', levels: ['phd'] },
].map((group) => ({ ...group, programmes: group.levels.flatMap((id) => levelMap[id].programmes.map((programme) => ({ ...programme, level: levelMap[id] }))) }))

const images = { foundation: '/uis/program-asasi-2.jpg', diploma: '/uis/program-diploma.jpg', bachelor: '/uis/program-ism.jpg', master: '/uis/program-sarjana-kk.jpg', phd: '/uis/program-phd.jpg' }
const ui = {
  ms: { level: 'Tahap Pengajian', program: 'Program', levelHint: 'Pilih tahap pengajian untuk melihat senarai program yang bersesuaian.', list: 'Senarai Program', listIntro: 'Berikut ialah senarai', offered: 'program yang ditawarkan di UIS.', outcomes: 'Hasil Pembelajaran', career: 'Prospek Kerjaya', courses: 'Senarai Kursus', requirements: 'Syarat Kemasukan', contact: 'Hubungi Fakulti', summary: 'Sinopsis Program', duration: 'Tempoh Pengajian', faculty: 'Fakulti', mode: 'Mod Pengajian', detail: 'Maklumat Lanjut', pdf: 'Muat Turun PDF', overview: 'Ringkasan', requirementLocal: 'Pelajar Malaysia', requirementInternational: 'Pelajar Antarabangsa', fullRequirements: 'Lihat syarat penuh', fullTime: 'Sepenuh masa', flexible: 'Sepenuh / separuh masa', entries: 'entri kursus dan semester tersedia untuk program ini.', contactSection: 'Seksyen Permohonan dan Kemasukan Pelajar', internationalRequirement: 'Kelayakan setara yang diiktiraf oleh Kerajaan Malaysia dan UIS, termasuk syarat bahasa yang berkenaan.', countLabel: 'program ditawarkan' },
  en: { level: 'Study Level', program: 'Programme', levelHint: 'Choose a study level to view the matching programme list.', list: 'Programme List', listIntro: 'The following is a list of', offered: 'programmes offered at UIS.', outcomes: 'Learning Outcomes', career: 'Career Prospects', courses: 'Course List', requirements: 'Entry Requirements', contact: 'Faculty Contact', summary: 'Programme Synopsis', duration: 'Study Period', faculty: 'Faculty', mode: 'Study Mode', detail: 'More Information', pdf: 'Download PDF', overview: 'Overview', requirementLocal: 'Malaysian Students', requirementInternational: 'International Students', fullRequirements: 'View full requirements', fullTime: 'Full-time', flexible: 'Full / part-time', entries: 'course and semester entries are available for this programme.', contactSection: 'Student Application and Admission Section', internationalRequirement: 'Equivalent qualifications recognised by the Malaysian Government and UIS, including applicable language requirements.', countLabel: 'programmes offered' },
  zh: { level: '\u5b66\u4e60\u9636\u6bb5', program: '\u8bfe\u7a0b', levelHint: '\u9009\u62e9\u5b66\u4e60\u9636\u6bb5\u4ee5\u67e5\u770b\u76f8\u5e94\u7684\u8bfe\u7a0b\u5217\u8868\u3002', list: '\u8bfe\u7a0b\u5217\u8868', listIntro: '\u4ee5\u4e0b\u662f UIS \u63d0\u4f9b\u7684', offered: '\u9879\u8bfe\u7a0b\u3002', outcomes: '\u5b66\u4e60\u6210\u679c', career: '\u5c31\u4e1a\u524d\u666f', courses: '\u8bfe\u7a0b\u6e05\u5355', requirements: '\u5165\u5b66\u8981\u6c42', contact: '\u5b66\u9662\u8054\u7cfb', summary: '\u8bfe\u7a0b\u7b80\u4ecb', duration: '\u5b66\u4e60\u671f\u9650', faculty: '\u5b66\u9662', mode: '\u5b66\u4e60\u6a21\u5f0f', detail: '\u8be6\u7ec6\u4fe1\u606f', pdf: '\u4e0b\u8f7d PDF', overview: '\u6982\u89c8', requirementLocal: '\u9a6c\u6765\u897f\u4e9a\u5b66\u751f', requirementInternational: '\u56fd\u9645\u5b66\u751f', fullRequirements: '\u67e5\u770b\u5b8c\u6574\u8981\u6c42', fullTime: '\u5168\u65e5\u5236', flexible: '\u5168\u65e5\u5236 / \u975e\u5168\u65e5\u5236', entries: '\u8bfe\u7a0b\u548c\u5b66\u671f\u8d44\u6599\u53ef\u7528\u3002', contactSection: '\u5b66\u751f\u7533\u8bf7\u4e0e\u5165\u5b66\u90e8\u95e8', internationalRequirement: '\u9a6c\u6765\u897f\u4e9a\u653f\u5e9c\u548c UIS \u8ba4\u53ef\u7684\u540c\u7b49\u8d44\u683c\u53ca\u9002\u7528\u7684\u8bed\u8a00\u8981\u6c42\u3002' },
  ar: { level: '\u0627\u0644\u0645\u0631\u062d\u0644\u0629 \u0627\u0644\u062f\u0631\u0627\u0633\u064a\u0629', program: '\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062c', levelHint: '\u0627\u062e\u062a\u0631 \u0627\u0644\u0645\u0631\u062d\u0644\u0629 \u0627\u0644\u062f\u0631\u0627\u0633\u064a\u0629 \u0644\u0639\u0631\u0636 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0628\u0631\u0627\u0645\u062c \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629.', list: '\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0628\u0631\u0627\u0645\u062c', listIntro: '\u0641\u064a\u0645\u0627 \u064a\u0644\u064a \u0642\u0627\u0626\u0645\u0629 \u0628\u0640', offered: '\u0628\u0631\u0627\u0645\u062c \u062a\u0642\u062f\u0645\u0647\u0627 UIS.', outcomes: '\u0646\u0648\u0627\u062a\u062c \u0627\u0644\u062a\u0639\u0644\u0645', career: '\u0627\u0644\u0622\u0641\u0627\u0642 \u0627\u0644\u0645\u0647\u0646\u064a\u0629', courses: '\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0642\u0631\u0631\u0627\u062a', requirements: '\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0642\u0628\u0648\u0644', contact: '\u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0643\u0644\u064a\u0629', summary: '\u0646\u0628\u0630\u0629 \u0639\u0646 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062c', duration: '\u0645\u062f\u0629 \u0627\u0644\u062f\u0631\u0627\u0633\u0629', faculty: '\u0627\u0644\u0643\u0644\u064a\u0629', mode: '\u0646\u0645\u0637 \u0627\u0644\u062f\u0631\u0627\u0633\u0629', detail: '\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0625\u0636\u0627\u0641\u064a\u0629', pdf: '\u062a\u0646\u0632\u064a\u0644 PDF', overview: '\u0646\u0638\u0631\u0629 \u0639\u0627\u0645\u0629', requirementLocal: '\u0627\u0644\u0637\u0644\u0627\u0628 \u0627\u0644\u0645\u0627\u0644\u064a\u0632\u064a\u0648\u0646', requirementInternational: '\u0627\u0644\u0637\u0644\u0627\u0628 \u0627\u0644\u062f\u0648\u0644\u064a\u0648\u0646', fullRequirements: '\u0639\u0631\u0636 \u0627\u0644\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0643\u0627\u0645\u0644\u0629', fullTime: '\u062f\u0648\u0627\u0645 \u0643\u0627\u0645\u0644', flexible: '\u062f\u0648\u0627\u0645 \u0643\u0627\u0645\u0644 / \u062c\u0632\u0626\u064a', entries: '\u0639\u0646\u0627\u0635\u0631 \u0627\u0644\u0645\u0642\u0631\u0631\u0627\u062a \u0648\u0627\u0644\u0641\u0635\u0648\u0644 \u0645\u062a\u0648\u0641\u0631\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062c.', contactSection: '\u0642\u0633\u0645 \u0637\u0644\u0628\u0627\u062a \u0648\u0642\u0628\u0648\u0644 \u0627\u0644\u0637\u0644\u0628\u0629', internationalRequirement: '\u0645\u0624\u0647\u0644\u0627\u062a \u0645\u0639\u062a\u0631\u0641 \u0628\u0647\u0627 \u062d\u0643\u0648\u0645\u0629 \u0645\u0627\u0644\u064a\u0632\u064a\u0627 \u0648 UIS \u0645\u0639 \u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629.' },
}
const localizedLevelLabels = { ms: { foundation: 'Asasi', diploma: 'Diploma', bachelor: 'Sarjana Muda', master: 'Sarjana', phd: 'PhD' }, en: { foundation: 'Foundation', diploma: 'Diploma', bachelor: 'Bachelor', master: 'Master', phd: 'PhD' }, zh: { foundation: '\u9884\u79d1', diploma: '\u6587\u51ed', bachelor: '\u5b66\u58eb', master: '\u7855\u58eb', phd: '\u535a\u58eb' }, ar: { foundation: '\u0627\u0644\u062a\u0623\u0633\u064a\u0633', diploma: '\u0627\u0644\u062f\u0628\u0644\u0648\u0645', bachelor: '\u0627\u0644\u0628\u0643\u0627\u0644\u0648\u0631\u064a\u0648\u0633', master: '\u0627\u0644\u0645\u0627\u062c\u0633\u062a\u064a\u0631', phd: '\u0627\u0644\u062f\u0643\u062a\u0648\u0631\u0627\u0647' } }
const descriptions = {
  foundation: 'Program persediaan akademik sebelum melanjutkan pengajian ke peringkat ijazah sarjana muda.',
  diploma: 'Program berorientasikan kerjaya yang menggabungkan pengetahuan asas dan kemahiran praktikal.',
  bachelor: 'Program prasiswazah yang membangunkan pengetahuan lanjutan dan kemahiran profesional.',
  master: 'Pengajian pascasiswazah untuk membina kepakaran profesional dan keupayaan penyelidikan.',
  phd: 'Penyelidikan lanjutan yang menghasilkan sumbangan asli kepada bidang ilmu.',
}

async function downloadSubjects(programme, label) {
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF({ unit: 'mm', format: 'a4' })
  const width = pdf.internal.pageSize.getWidth()
  const height = pdf.internal.pageSize.getHeight()
  const margin = 18
  let y = 22
  const page = (space = 8) => { if (y + space > height - 18) { pdf.addPage(); y = 20 } }
  pdf.setFillColor(8, 91, 78); pdf.rect(0, 0, width, 14, 'F')
  pdf.setTextColor(8, 91, 78); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(17)
  const title = pdf.splitTextToSize(programme.name, width - margin * 2)
  pdf.text(title, margin, y); y += title.length * 7 + 3
  pdf.setTextColor(90, 90, 90); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(10)
  pdf.text(`${label} | ${programme.code.toUpperCase()}`, margin, y); y += 10
  pdf.setTextColor(8, 91, 78); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(13)
  pdf.text('Senarai Kursus Mengikut Semester', margin, y); y += 8
  const subjects = programme.subjects.length ? programme.subjects : ['Maklumat kursus sedang dikemas kini oleh UIS.']
  subjects.forEach((subject) => {
    const heading = /^(semester|year|tahun|syarat graduasi)/i.test(subject)
    const lines = pdf.splitTextToSize(subject, width - margin * 2 - (heading ? 0 : 5))
    page(lines.length * 5 + 3)
    pdf.setFont('helvetica', heading ? 'bold' : 'normal')
    pdf.setTextColor(heading ? 8 : 45, heading ? 91 : 45, heading ? 78 : 45)
    pdf.setFontSize(heading ? 11 : 9.5)
    pdf.text(heading ? lines : lines.map((line, index) => `${index ? '  ' : 'â€¢ '}${line}`), margin + (heading ? 0 : 3), y)
    y += lines.length * 5 + (heading ? 3 : 1.5)
  })
  pdf.save(`${programme.code}-senarai-kursus.pdf`)
}

function Row({ id, icon: Icon, title, open, onToggle, children, featured = false }) {
  return <section className={`accordion-row ${open ? 'open' : ''} ${featured ? 'featured' : ''}`}>
    <button type="button" onClick={() => onToggle(id)} aria-expanded={open}><Icon size={20}/><span>{title}</span>{open ? <ChevronDown size={18}/> : <ChevronRight size={18}/>}</button>
    {open && <div className="accordion-row-content">{children}</div>}
  </section>
}

function ProgrammeSynopsis({ programme, group, text, translatedLevelLabels }) {
  const level = programme.level
  return <aside className="accordion-overview"><div className="accordion-overview-title"><BookOpen size={22}/><h3>{text.summary}</h3></div><img src={images[group.id]} alt="Universiti Islam Selangor"/><h4>{programme.name}</h4><p>{descriptions[group.id]}</p><div className="accordion-meta"><div><Clock3/><span><strong>{text.duration}</strong>{level.duration}</span></div><div><Landmark/><span><strong>{text.faculty}</strong>{level.faculty}</span></div><div><GraduationCap/><span><strong>{text.level}</strong>{translatedLevelLabels[group.id]}</span></div><div><Tag/><span><strong>{text.mode}</strong>{group.id === 'master' || group.id === 'phd' ? text.flexible : text.fullTime}</span></div></div><div className="accordion-actions"><a href={`/program-pengajian/${programme.code}`}>{text.detail} <ChevronRight size={14}/></a><button type="button" onClick={() => downloadSubjects(programme, group.label)}><Download size={14}/> {text.pdf}</button></div></aside>
}

export default function AccordionProgramExplorer({ language = getLanguage() }) {
  const text = ui[language] || ui.ms
  const translatedLevelLabels = localizedLevelLabels[language] || localizedLevelLabels.ms
  const requestedLevel = new URLSearchParams(window.location.search).get('level')
  const initialGroup = groups.find((item) => item.id === requestedLevel) || groups[0]
  const [groupId, setGroupId] = useState(initialGroup.id)
  const [programmeCode, setProgrammeCode] = useState(initialGroup.programmes[0].code)
  const [openSection, setOpenSection] = useState(requestedLevel ? 'programmes' : 'level')
  const [expandedProgrammeCode, setExpandedProgrammeCode] = useState(null)
  const group = groups.find((item) => item.id === groupId) || groups[0]
  const programme = group.programmes.find((item) => item.code === programmeCode) || group.programmes[0]
  const level = programme.level
  const outcomes = useMemo(() => [
    `Menguasai pengetahuan teras berkaitan ${programme.name}.`,
    'Mengaplikasikan kemahiran penyelesaian masalah secara sistematik dan beretika.',
    'Berkomunikasi dan bekerjasama dengan berkesan dalam persekitaran profesional.',
    'Membangunkan kemahiran digital, kepimpinan dan pembelajaran sepanjang hayat.',
  ], [programme])

  const chooseLevel = (levelId, openProgrammes = false) => {
    const next = groups.find((item) => item.id === levelId) || groups[0]
    setGroupId(next.id)
    setProgrammeCode(next.programmes[0].code)
    setExpandedProgrammeCode(null)
    if (openProgrammes) setOpenSection('programmes')
  }
  const changeLevel = (event) => chooseLevel(event.target.value)
  const toggle = (id) => setOpenSection((current) => current === id ? '' : id)
  const selectProgramme = (item) => {
    setProgrammeCode(item.code)
    setExpandedProgrammeCode((current) => current === item.code ? null : item.code)
  }

  return <section className="accordion-programmes">
    <div className="accordion-mobile-controls">
      <label><span>{text.level}</span><select value={group.id} onChange={changeLevel}>{groups.map((item) => <option value={item.id} key={item.id}>{translatedLevelLabels[item.id]}</option>)}</select></label>
      <label><span>{text.program}</span><select value={programme.code} onChange={(event) => { const selected = group.programmes.find((item) => item.code === event.target.value) || group.programmes[0]; setProgrammeCode(selected.code); setExpandedProgrammeCode(selected.code) }}>{group.programmes.map((item) => <option value={item.code} key={`${item.level.id}-${item.code}`}>{item.name}</option>)}</select></label>
    </div>

    <div className="accordion-programme-layout">
      <div className="accordion-list">
        <Row id="level" icon={GraduationCap} title={text.level} open={openSection === 'level'} onToggle={toggle} featured>
          <p>{text.levelHint}</p>
          <div className="accordion-level-list">{groups.map((item) => <button type="button" className={item.id === group.id ? 'selected' : ''} key={item.id} onClick={() => chooseLevel(item.id, true)}><span><strong>{translatedLevelLabels[item.id]}</strong><small>{item.programmes.length} {text.countLabel}</small></span><ChevronRight size={16}/></button>)}</div>
        </Row>
        <Row id="programmes" icon={List} title={text.list} open={openSection === 'programmes'} onToggle={toggle}>
          <p>{text.listIntro} {group.programmes.length} {translatedLevelLabels[group.id]} {text.offered}</p>
          <div className="accordion-programme-list">{group.programmes.map((item) => { const expanded = expandedProgrammeCode === item.code; return <div className={`accordion-programme-entry ${expanded ? 'expanded' : ''}`} key={`${item.level.id}-${item.code}`}><button type="button" className={item.code === programme.code ? 'selected' : ''} onClick={() => selectProgramme(item)} aria-expanded={expanded}><span>{item.name}</span>{expanded ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}</button>{expanded && <ul className="programme-inline-points"><li><strong>{text.overview}:</strong> {descriptions[group.id]}</li><li><strong>{text.duration}:</strong> {item.level.duration}</li><li><strong>{text.faculty}:</strong> {item.level.faculty}</li><li><strong>{text.mode}:</strong> {group.id === 'master' || group.id === 'phd' ? text.flexible : text.fullTime}</li><li className="programme-inline-mobile-actions"><a href={`/program-pengajian/${item.code}`}>{text.detail} <ChevronRight size={13}/></a><button type="button" onClick={() => downloadSubjects(item, group.label)}><Download size={13}/> {text.pdf}</button></li></ul>}</div> })}</div>
        </Row>
        <Row id="outcomes" icon={Target} title={text.outcomes} open={openSection === 'outcomes'} onToggle={toggle}><ul>{outcomes.map((item) => <li key={item}>{item}</li>)}</ul></Row>
        <Row id="career" icon={BriefcaseBusiness} title={text.career} open={openSection === 'career'} onToggle={toggle}><p>{level.career}</p></Row>
        <Row id="courses" icon={BookOpen} title={text.courses} open={openSection === 'courses'} onToggle={toggle}><p>{programme.subjects.length} {text.entries}</p><button className="accordion-pdf" type="button" onClick={() => downloadSubjects(programme, group.label)}><Download size={15}/> {text.pdf}</button></Row>
        <Row id="requirements" icon={FileCheck2} title={text.requirements} open={openSection === 'requirements'} onToggle={toggle}><h4>{text.requirementLocal}</h4><p>{level.eligibility}</p><h4>{text.requirementInternational}</h4><p>{text.internationalRequirement}</p><a href={programme.officialUrl} target="_blank" rel="noreferrer">{text.fullRequirements} <ExternalLink size={13}/></a></Row>
        <Row id="contact" icon={Users} title={text.contact} open={openSection === 'contact'} onToggle={toggle}><p><strong>{text.contactSection}</strong><br/>+603 8911 7060 / +603 8911 7139<br/><a href="mailto:admission@uis.edu.my">admission@uis.edu.my</a></p></Row>
      </div>
      <ProgrammeSynopsis programme={programme} group={group} text={text} translatedLevelLabels={translatedLevelLabels}/>
    </div>
  </section>
}



