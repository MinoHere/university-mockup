import { Clock3, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import './ContactPage.css'

const mapQuery = 'Universiti Islam Selangor, Bandar Seri Putra, 43000 Kajang, Selangor'
const mapEmbed = 'https://www.google.com/maps?q=' + encodeURIComponent(mapQuery) + '&output=embed'
const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(mapQuery)
const contactCopy = {
  ms: { home: 'Utama', contact: 'Hubungi Kami', kicker: 'Kami sedia membantu', title: 'Mari berhubung dengan UIS.', intro: 'Sila hubungi pasukan UIS melalui saluran yang sesuai untuk pertanyaan permohonan, penawaran, pendaftaran atau urusan pelajar antarabangsa.', pathway: 'Saluran Pertanyaan', pathwayTitle: 'Hubungi pasukan yang tepat', localLabel: 'Pelajar Malaysia & Antarabangsa', localTitle: 'Seksyen Permohonan dan Kemasukan Pelajar', localDesc: 'Pertanyaan tentang permohonan, penawaran program dan pendaftaran pelajar.', direct: 'Talian Terus', extension: 'Sambungan', email: 'E-mel', international: 'Pelajar Antarabangsa Sahaja', internationalTitle: 'Pusat Hubungan Antarabangsa', internationalDesc: 'Pertanyaan tentang EMGS, imigresen, visa pelajar dan urusan pelajar antarabangsa.', mainExtension: 'Talian Utama & Sambungan', campus: 'Lokasi Kampus', campusTitle: 'Universiti Islam Selangor', directions: 'Buka di Google Maps', address: 'Alamat', mainLine: 'Talian Utama', generalEmail: 'E-mel Umum', hours: 'Waktu Operasi', weekday: 'Isnin - Jumaat', breakWeek: 'Rehat Isnin - Khamis', breakFriday: 'Rehat Jumaat', weekend: 'Sabtu - Ahad', closed: 'Tutup', module: 'Permohonan & Kemasukan', location: 'Lokasi Kampus', internationalOnly: 'Pelajar Antarabangsa Sahaja', mainContact: 'Seksyen Permohonan dan Kemasukan Pelajar' },
  en: { home: 'Home', contact: 'Contact Us', kicker: 'We are here to help', title: 'Connect with UIS.', intro: 'Contact the appropriate UIS team for questions about applications, offers, registration or international student matters.', pathway: 'Enquiry Channels', pathwayTitle: 'Contact the right team', localLabel: 'Malaysian & International Students', localTitle: 'Student Application and Admission Section', localDesc: 'Questions about applications, programme offers and student registration.', direct: 'Direct Lines', extension: 'Extensions', email: 'Email', international: 'International Students Only', internationalTitle: 'International Relations Centre', internationalDesc: 'Questions about EMGS, immigration, student visas and international student matters.', mainExtension: 'Main Line & Extensions', campus: 'Campus Location', campusTitle: 'Universiti Islam Selangor', directions: 'Open in Google Maps', address: 'Address', mainLine: 'Main Line', generalEmail: 'General Email', hours: 'Operating Hours', weekday: 'Monday - Friday', breakWeek: 'Break Monday - Thursday', breakFriday: 'Friday Break', weekend: 'Saturday - Sunday', closed: 'Closed', module: 'Applications & Admissions', location: 'Campus Location', internationalOnly: 'International Students Only', mainContact: 'Student Application and Admission Section' },
  zh: { home: '\u9996\u9875', contact: '\u8054\u7cfb\u6211\u4eec', kicker: '\u6211\u4eec\u968f\u65f6\u4e3a\u60a8\u63d0\u4f9b\u5e2e\u52a9', title: '\u4e0e UIS \u8054\u7cfb', intro: '\u5982\u6709\u7533\u8bf7\u3001\u5f55\u53d6\u3001\u6ce8\u518c\u6216\u56fd\u9645\u5b66\u751f\u76f8\u5173\u95ee\u9898\uff0c\u8bf7\u8054\u7cfb\u4ee5\u4e0b\u56e2\u961f', pathway: '\u54a8\u8be2\u6e20\u9053', pathwayTitle: '\u8054\u7cfb\u5408\u9002\u7684\u56e2\u961f', localLabel: '\u9a6c\u6765\u897f\u4e9a\u53ca\u56fd\u9645\u5b66\u751f', localTitle: '\u5b66\u751f\u7533\u8bf7\u4e0e\u62db\u751f\u90e8\u95e8', localDesc: '\u54a8\u8be2\u7533\u8bf7\u3001\u8bfe\u7a0b\u5f55\u53d6\u53ca\u5b66\u751f\u6ce8\u518c\u4e8b\u5b9c', direct: '\u76f4\u7ebf\u7535\u8bdd', extension: '\u5206\u673a', email: '\u7535\u5b50\u90ae\u4ef6', international: '\u4ec5\u9650\u56fd\u9645\u5b66\u751f', internationalTitle: '\u56fd\u9645\u5173\u7cfb\u4e2d\u5fc3', internationalDesc: '\u54a8\u8be2 EMGS\u3001\u79fb\u6c11\u3001\u5b66\u751f\u7b7e\u8bc1\u53ca\u56fd\u9645\u5b66\u751f\u4e8b\u52a1', mainExtension: '\u603b\u673a\u53ca\u5206\u673a', campus: '\u6821\u56ed\u4f4d\u7f6e', campusTitle: '\u96ea\u5170\u83aa\u4f0a\u65af\u5170\u5927\u5b66', directions: '\u5728 Google \u5730\u56fe\u4e2d\u6253\u5f00', address: '\u5730\u5740', mainLine: '\u603b\u673a', generalEmail: '\u4e00\u822c\u90ae\u4ef6', hours: '\u5de5\u4f5c\u65f6\u95f4', weekday: '\u661f\u671f\u4e00 - \u661f\u671f\u4e94', breakWeek: '\u661f\u671f\u4e00 - \u661f\u671f\u56db\u4f11\u606f', breakFriday: '\u661f\u671f\u4e94\u4f11\u606f', weekend: '\u661f\u671f\u516d - \u661f\u671f\u65e5', closed: '\u4f11\u606f', module: '\u7533\u8bf7\u4e0e\u5165\u5b66', location: '\u6821\u56ed\u4f4d\u7f6e', internationalOnly: '\u4ec5\u9650\u56fd\u9645\u5b66\u751f', mainContact: '\u5b66\u751f\u7533\u8bf7\u4e0e\u62db\u751f\u90e8\u95e8' },
  ar: { home: '\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629', contact: '\u0627\u062a\u0635\u0644 \u0628\u0646\u0627', kicker: '\u0646\u062d\u0646 \u0647\u0646\u0627 \u0644\u0644\u0645\u0633\u0627\u0639\u062f\u0629', title: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 UIS', intro: '\u0644\u0644\u0627\u0633\u062a\u0641\u0633\u0627\u0631\u0627\u062a \u062d\u0648\u0644 \u0627\u0644\u062a\u0642\u062f\u064a\u0645 \u0648\u0627\u0644\u0642\u0628\u0648\u0644 \u0648\u0627\u0644\u062a\u0633\u062c\u064a\u0644 \u0623\u0648 \u0634\u0624\u0648\u0646 \u0627\u0644\u0637\u0644\u0627\u0628 \u0627\u0644\u062f\u0648\u0644\u064a\u064a\u0646\u060c \u0627\u062e\u062a\u0631 \u0627\u0644\u0642\u0646\u0627\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629', pathway: '\u0642\u0646\u0648\u0627\u062a \u0627\u0644\u0627\u0633\u062a\u0641\u0633\u0627\u0621', pathwayTitle: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0641\u0631\u064a\u0642 \u0627\u0644\u0645\u0646\u0627\u0633\u0628', localLabel: '\u0627\u0644\u0637\u0644\u0627\u0628 \u0627\u0644\u0645\u0627\u0644\u064a\u0632\u064a\u0648\u0646 \u0648\u0627\u0644\u062f\u0648\u0644\u064a\u0648\u0646', localTitle: '\u0642\u0633\u0645 \u0637\u0644\u0628\u0627\u062a \u0648\u0642\u0628\u0648\u0644 \u0627\u0644\u0637\u0644\u0627\u0628', localDesc: '\u0627\u0633\u062a\u0641\u0633\u0627\u0631\u0627\u062a \u0627\u0644\u062a\u0642\u062f\u064a\u0645 \u0648\u0639\u0631\u0648\u0636 \u0627\u0644\u0628\u0631\u0627\u0645\u062c \u0648\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u0637\u0644\u0627\u0628', direct: '\u0627\u0644\u062e\u0637\u0648\u0637 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0629', extension: '\u0627\u0644\u062a\u062d\u0648\u064a\u0644\u0627\u062a', email: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a', international: '\u0644\u0644\u0637\u0644\u0627\u0628 \u0627\u0644\u062f\u0648\u0644\u064a\u064a\u0646 \u0641\u0642\u0637', internationalTitle: '\u0645\u0631\u0643\u0632 \u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062a \u0627\u0644\u062f\u0648\u0644\u064a\u0629', internationalDesc: '\u0627\u0633\u062a\u0641\u0633\u0627\u0631\u0627\u062a EMGS \u0648\u0627\u0644\u0647\u062c\u0631\u0629 \u0648\u062a\u0623\u0634\u064a\u0631\u0627\u062a \u0627\u0644\u0637\u0644\u0627\u0628 \u0648\u0634\u0624\u0648\u0646 \u0627\u0644\u0637\u0644\u0627\u0628 \u0627\u0644\u062f\u0648\u0644\u064a\u064a\u0646', mainExtension: '\u0627\u0644\u062e\u0637 \u0627\u0644\u0631\u0626\u064a\u0633\u064a \u0648\u0627\u0644\u062a\u062d\u0648\u064a\u0644\u0627\u062a', campus: '\u0645\u0648\u0642\u0639 \u0627\u0644\u062d\u0631\u0645 \u0627\u0644\u062c\u0627\u0645\u0639\u064a', campusTitle: '\u062c\u0627\u0645\u0639\u0629 \u0633\u0644\u0627\u0646\u063a\u0648\u0631 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629', directions: '\u0641\u062a\u062d \u0641\u064a \u062e\u0631\u0627\u0626\u0637 Google', address: '\u0627\u0644\u0639\u0646\u0648\u0627\u0646', mainLine: '\u0627\u0644\u062e\u0637 \u0627\u0644\u0631\u0626\u064a\u0633\u064a', generalEmail: '\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0639\u0627\u0645', hours: '\u0633\u0627\u0639\u0627\u062a \u0627\u0644\u0639\u0645\u0644', weekday: '\u0627\u0644\u0627\u062b\u0646\u064a\u0646 - \u0627\u0644\u062c\u0645\u0639\u0629', breakWeek: '\u0627\u0633\u062a\u0631\u0627\u062d\u0629 \u0627\u0644\u0627\u062b\u0646\u064a\u0646 - \u0627\u0644\u062e\u0645\u064a\u0633', breakFriday: '\u0627\u0633\u062a\u0631\u0627\u062d\u0629 \u0627\u0644\u062c\u0645\u0639\u0629', weekend: '\u0627\u0644\u0633\u0628\u062a - \u0627\u0644\u0623\u062d\u062f', closed: '\u0645\u063a\u0644\u0642', module: '\u0627\u0644\u062a\u0642\u062f\u064a\u0645 \u0648\u0627\u0644\u0642\u0628\u0648\u0644', location: '\u0645\u0648\u0642\u0639 \u0627\u0644\u062d\u0631\u0645', internationalOnly: '\u0644\u0644\u0637\u0644\u0627\u0628 \u0627\u0644\u062f\u0648\u0644\u064a\u064a\u0646 \u0641\u0642\u0637', mainContact: '\u0642\u0633\u0645 \u0637\u0644\u0628\u0627\u062a \u0648\u0642\u0628\u0648\u0644 \u0627\u0644\u0637\u0644\u0627\u0628' },
}

export default function ContactPage({ language = getLanguage() }) {
  const text = contactCopy[language] || contactCopy.ms
  return <main className="contact-joomla">
    <section className="contact-title-banner">
      <div className="contact-container">
        <h1>{text.contact}</h1>
      </div>
    </section>

    <div className="contact-container contact-body">
      <nav className="contact-breadcrumbs" aria-label="Breadcrumb">
        <a href="/">{text.home}</a><span>/</span><strong>{text.contact}</strong>
      </nav>

      <header className="contact-introduction">
        <p className="contact-overline">{text.localLabel}</p>
        <h2>{text.mainContact}</h2>
        <span className="contact-heading-line"/>
        <p>{text.intro}</p>
      </header>

      <div className="contact-module-grid">
        <section className="contact-module">
          <h3>{text.module}</h3>
          <div className="contact-module-content">
            <div className="contact-detail">
              <span className="contact-detail-icon"><Phone aria-hidden="true"/></span>
              <div>
                <h4>{text.direct}</h4>
                <div className="contact-number-list">
                  <a href="tel:+60389117060">+603 8911 7060</a>
                  <a href="tel:+60389117139">+603 8911 7139</a>
                  <a href="tel:+60389117073">+603 8911 7073</a>
                  <a href="tel:+60389117141">+603 8911 7141</a>
                </div>
              </div>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-icon"><Phone aria-hidden="true"/></span>
              <div><h4>{text.extension}</h4><p>+603 8911 7000<br/>1220 / 2240 / 2239 / 1417</p></div>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-icon"><Mail aria-hidden="true"/></span>
              <div><h4>{text.email}</h4><a href="mailto:admission@uis.edu.my">admission@uis.edu.my</a></div>
            </div>
          </div>
        </section>

        <section className="contact-module">
          <h3>{text.internationalOnly}</h3>
          <div className="contact-module-content">
            <p className="contact-module-description">{text.internationalDesc}</p>
            <div className="contact-detail">
              <span className="contact-detail-icon"><Phone aria-hidden="true"/></span>
              <div><h4>{text.mainExtension}</h4><p>+603 8911 7000<br/>3509 / 6625 / 6626 / 6627</p></div>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-icon"><Mail aria-hidden="true"/></span>
              <div><h4>{text.email}</h4><a href="mailto:international@uis.edu.my">international@uis.edu.my</a></div>
            </div>
          </div>
        </section>
      </div>

      <section className="contact-location-module">
        <div className="contact-location-heading">
          <div>
            <p className="contact-overline">{text.location}</p>
            <h2>{text.campusTitle}</h2>
            <span className="contact-heading-line"/>
          </div>
          <a href={directionsUrl} target="_blank" rel="noreferrer">{text.directions} <ExternalLink aria-hidden="true"/></a>
        </div>

        <div className="contact-campus-summary">
          <div className="contact-summary-item">
            <MapPin aria-hidden="true"/>
            <div><strong>{text.address}</strong><span>Bandar Seri Putra, 43000 Kajang, Selangor, Malaysia</span></div>
          </div>
          <div className="contact-summary-item">
            <Phone aria-hidden="true"/>
            <div><strong>{text.mainLine}</strong><a href="tel:+60389117000">+603 8911 7000</a></div>
          </div>
          <div className="contact-summary-item">
            <Mail aria-hidden="true"/>
            <div><strong>{text.generalEmail}</strong><a href="mailto:info@uis.edu.my">info@uis.edu.my</a></div>
          </div>
        </div>

        <div className="contact-map">
          <iframe title="Peta lokasi Universiti Islam Selangor" src={mapEmbed} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"/>
        </div>

        <div className="contact-operation-hours">
          <Clock3 aria-hidden="true"/>
          <div>
            <h3>{text.hours}</h3>
            <div className="contact-hours-grid">
              <p><strong>{text.weekday}</strong><span>8:00 pagi – 5:30 petang</span></p>
              <p><strong>{text.breakWeek}</strong><span>1:00 – 2:00 petang</span></p>
              <p><strong>{text.breakFriday}</strong><span>12:15 – 2:45 petang</span></p>
              <p><strong>{text.weekend}</strong><span>{text.closed}</span></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
}