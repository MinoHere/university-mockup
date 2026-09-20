import { useMemo, useState } from 'react'
import {
  ArrowLeft, BadgeCheck, BriefcaseBusiness, ChevronDown,
  ChevronRight, Clock3, FileCheck2, GraduationCap, Info, Landmark,
  Languages, ListChecks, Presentation, Tag, WalletCards,
} from 'lucide-react'
import { accommodationFeesUrl, programmeLevels } from './programCatalog'
import programmeDetails from './programmeDetails.json'
import './ProgrammeDetailPage.css'

const groupLabels = {
  foundation: 'Asasi', diploma: 'Diploma', bachelor: 'Sarjana Muda',
  masterCoursework: 'Sarjana', masterResearch: 'Sarjana', phd: 'PhD',
}

function DetailAccordion({ id, icon: Icon, title, open, onToggle, children }) {
  return <section className={`programme-detail-row ${open ? 'open' : ''}`}>
    <button type="button" onClick={() => onToggle(id)} aria-expanded={open}>
      <Icon size={20}/><span>{title}</span>{open ? <ChevronDown size={18}/> : <ChevronRight size={18}/>} 
    </button>
    {open && <div className="programme-detail-content">{children}</div>}
  </section>
}

function FieldValue({ value }) {
  const values = Array.isArray(value) ? value : [value]
  return <div className="programme-field-values">{values.map((item) => <p key={item}>{item || 'Maklumat sedang dikemas kini oleh UIS.'}</p>)}</div>
}

function TextLines({ lines, headings = [] }) {
  return <div className="programme-text-lines">{lines.map((line, index) => headings.includes(line) || line === 'Nota:' ? <h3 key={`${line}-${index}`}>{line}</h3> : <p key={`${line}-${index}`}>{line}</p>)}</div>
}

function Fees({ lines }) {
  const output = []
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (line === 'Pelajar Malaysia' || line === 'Pelajar Antarabangsa') {
      output.push(<h3 key={`${line}-${index}`}>{line}</h3>)
    } else if (index + 1 < lines.length && lines[index + 1].startsWith(':')) {
      const value = lines[index + 1].replace(/^:\s*/, '')
      output.push(<div className="programme-fee-line" key={`${line}-${index}`}><span>{line}</span><strong>{line === 'Yuran Penginapan' ? <a href={accommodationFeesUrl} target="_blank" rel="noreferrer">Klik Di Sini</a> : value}</strong></div>)
      index += 1
    } else {
      output.push(<p key={`${line}-${index}`}>{line}</p>)
    }
  }
  return <div className="programme-fee-list">{output}</div>
}

function groupSubjects(subjects) {
  const groups = []
  let current = { title: 'Senarai Kursus', items: [] }
  subjects.forEach((subject) => {
    if (/^(semester|year|tahun|syarat graduasi)/i.test(subject)) {
      if (current.items.length) groups.push(current)
      current = { title: subject, items: [] }
    } else current.items.push(subject)
  })
  if (current.items.length || !groups.length) groups.push(current)
  return groups
}

export default function ProgrammeDetailPage({ code }) {
  const record = useMemo(() => {
    for (const level of programmeLevels) {
      const programme = level.programmes.find((item) => item.code.toLowerCase() === code.toLowerCase())
      if (programme) return { programme, level }
    }
    return null
  }, [code])
  const [openSection, setOpenSection] = useState('program-code')

  if (!record) return <main className="container programme-detail-not-found"><h1>Program tidak ditemui</h1><a href="/program-pengajian"><ArrowLeft size={16}/> Kembali ke Program Pengajian</a></main>

  const { programme, level } = record
  const details = programmeDetails[programme.code.toLowerCase()]
  const subjectGroups = groupSubjects(details['Struktur Program'])
  const toggle = (id) => setOpenSection((current) => current === id ? '' : id)

  return <>
    <section className="programme-detail-hero"><div className="container">
      <a className="programme-detail-back" href="/program-pengajian"><ArrowLeft size={16}/> Program Pengajian</a>
      <p>{groupLabels[level.id]}</p><h1>{programme.name}</h1>
    </div></section>

    <main className="container programme-detail-main">
      <div className="programme-detail-layout">
      <div className="programme-detail-accordions">
        <DetailAccordion id="program-code" icon={Tag} title="Kod Program" open={openSection === 'program-code'} onToggle={toggle}><FieldValue value={details['Kod Program']}/></DetailAccordion>
        <DetailAccordion id="study-mode" icon={GraduationCap} title="Mod Pengajian" open={openSection === 'study-mode'} onToggle={toggle}><FieldValue value={details['Mod Pengajian']}/></DetailAccordion>
        <DetailAccordion id="mqa" icon={BadgeCheck} title="Nombor Pendaftaran MQA" open={openSection === 'mqa'} onToggle={toggle}><FieldValue value={details['Nombor Pendaftaran MQA']}/>{details.mqaUrl && <a className="programme-detail-link" href={details.mqaUrl} target="_blank" rel="noreferrer">Pautan MQA</a>}</DetailAccordion>
        <DetailAccordion id="period" icon={Clock3} title="Tempoh Pengajian" open={openSection === 'period'} onToggle={toggle}><FieldValue value={details['Tempoh Pengajian']}/></DetailAccordion>
        <DetailAccordion id="teaching-mode" icon={Presentation} title="Mod Pengajaran" open={openSection === 'teaching-mode'} onToggle={toggle}><FieldValue value={details['Mod Pengajaran']}/></DetailAccordion>
        <DetailAccordion id="language" icon={Languages} title="Bahasa Pengantar" open={openSection === 'language'} onToggle={toggle}><FieldValue value={details['Bahasa Pengantar']}/></DetailAccordion>
        <DetailAccordion id="faculty" icon={Landmark} title="Fakulti / Pusat Pengajian" open={openSection === 'faculty'} onToggle={toggle}><FieldValue value={details['Fakulti / Pusat Pengajian']}/></DetailAccordion>
        <DetailAccordion id="information" icon={Info} title="Maklumat Program" open={openSection === 'information'} onToggle={toggle}><TextLines lines={details['Maklumat Program']}/></DetailAccordion>
        <DetailAccordion id="eligibility" icon={FileCheck2} title="Syarat Kelayakan" open={openSection === 'eligibility'} onToggle={toggle}><TextLines lines={details['Syarat Kelayakan']} headings={['Pelajar Malaysia','Pelajar Antarabangsa']}/></DetailAccordion>
        <DetailAccordion id="career" icon={BriefcaseBusiness} title="Prospek Kerjaya" open={openSection === 'career'} onToggle={toggle}><TextLines lines={details['Prospek Kerjaya']}/></DetailAccordion>
        <DetailAccordion id="fees" icon={WalletCards} title="Anggaran Yuran Keseluruhan" open={openSection === 'fees'} onToggle={toggle}><Fees lines={details['Anggaran Yuran Keseluruhan']}/></DetailAccordion>
        <DetailAccordion id="structure" icon={ListChecks} title="Struktur Program" open={openSection === 'structure'} onToggle={toggle}><div className="programme-subject-groups">{subjectGroups.map((group) => <section key={group.title}><h3>{group.title}</h3><ul>{group.items.map((subject, index) => <li key={`${group.title}-${subject}-${index}`}>{subject}</li>)}</ul></section>)}</div></DetailAccordion>
      </div>
      <aside className="programme-desktop-overview">
        <div className="programme-desktop-overview-title"><Info size={21}/><h2>Sinopsis Program</h2></div>
        <p className="programme-desktop-overview-name">{programme.name}</p>
        <div className="programme-desktop-overview-list">
          <div><Tag/><span><small>Kod Program</small><strong>{details['Kod Program']}</strong></span></div>
          <div><GraduationCap/><span><small>Mod Pengajian</small><strong>{details['Mod Pengajian']}</strong></span></div>
          <div><BadgeCheck/><span><small>Nombor Pendaftaran MQA</small><strong>{details['Nombor Pendaftaran MQA']}</strong>{details.mqaUrl && <a href={details.mqaUrl} target="_blank" rel="noreferrer">Pautan MQA</a>}</span></div>
          <div><Clock3/><span><small>Tempoh Pengajian</small>{(Array.isArray(details['Tempoh Pengajian']) ? details['Tempoh Pengajian'] : [details['Tempoh Pengajian']]).map((period) => <strong key={period}>{period}</strong>)}</span></div>
        </div>
      </aside>
      </div>
    </main>
  </>
}



