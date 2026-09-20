import { getLanguage, languageHref, languageOptions } from './language'

export default function LanguageSelector({ className = '' }) {
  const activeLanguage = getLanguage()
  return <div className={'language-switcher ' + className} aria-label="Pilihan bahasa">
    {languageOptions.map((language) => <a className={language.code === activeLanguage ? 'active' : ''} href={languageHref(language.code)} lang={language.code} hrefLang={language.code} title={language.label} aria-label={language.label} aria-current={language.code === activeLanguage ? 'page' : undefined} key={language.code}>
      <img src={language.flag} alt=""/>
    </a>)}
  </div>
}