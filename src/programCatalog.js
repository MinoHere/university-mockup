import subjectCatalog from './programSubjects.json'

const levelDefaults = {
  foundation: {
    label: 'Foundation', faculty: 'Foundation Studies', duration: '1 year',
    overview: 'A preparatory pathway for qualified SPM or O Level graduates before progressing to bachelor’s degree studies at UIS.',
    eligibility: 'Pass SPM/SPMV or an equivalent qualification recognised by the Malaysian Government. Programme-specific subject requirements may apply.',
    career: 'Foundation study is a pathway to undergraduate education and is not intended as a standalone professional qualification.',
    fees: { local: 'Registration fee: RM 1,000', international: 'Registration fee: RM 1,150' },
  },
  diploma: {
    label: 'Diploma', faculty: 'Diploma Studies', duration: '2½ to 3 years',
    overview: 'Career-focused study combining core knowledge, practical skills and industry-relevant learning in the selected discipline.',
    eligibility: 'Pass SPM/SPMV or an equivalent recognised qualification. Credit and subject requirements vary by programme.',
    career: 'Graduates may enter relevant junior professional roles or continue to a related bachelor’s degree programme.',
    fees: { local: 'Refer to the official programme page', international: 'Refer to the official programme page' },
  },
  bachelor: {
    label: 'Bachelor’s Degree', faculty: 'Undergraduate Studies', duration: '3 to 4 years',
    overview: 'An undergraduate programme that develops advanced disciplinary knowledge, practical capability and professional readiness.',
    eligibility: 'Recognised STPM, STAM, Foundation, Matriculation, Diploma or equivalent qualification. Requirements vary by programme.',
    career: 'Graduates are prepared for professional roles related to the selected discipline and further postgraduate study.',
    fees: { local: 'Refer to the official programme page', international: 'Refer to the official programme page' },
  },
  masterCoursework: {
    label: 'Master’s (Coursework)', faculty: 'Postgraduate Studies', duration: '1 to 2 years',
    overview: 'Structured postgraduate study using taught modules, applied assessment and a focused research or project component.',
    eligibility: 'A recognised bachelor’s degree or equivalent qualification, subject to programme-specific academic requirements.',
    career: 'Supports specialist, managerial and professional advancement in the selected field.',
    fees: { local: 'Refer to the official programme page', international: 'Refer to the official programme page' },
  },
  masterResearch: {
    label: 'Master’s (Research)', faculty: 'Postgraduate Research', duration: '2 to 3 years',
    overview: 'Research-led postgraduate study centred on supervised investigation and the production of an original thesis.',
    eligibility: 'A recognised bachelor’s degree in a relevant field or equivalent qualification accepted by UIS.',
    career: 'Prepares graduates for research, academic, consultancy and specialist professional roles.',
    fees: { local: 'Refer to the official programme page', international: 'Refer to the official programme page' },
  },
  phd: {
    label: 'Doctor of Philosophy (PhD)', faculty: 'Doctoral Studies', duration: '3 to 6 years',
    overview: 'Advanced independent research that makes an original contribution to knowledge under expert academic supervision.',
    eligibility: 'A recognised master’s degree in a relevant field or another qualification accepted by the UIS Senate.',
    career: 'Designed for academic leadership, advanced research and senior specialist or consultancy roles.',
    fees: { local: 'Refer to the official programme page', international: 'Refer to the official programme page' },
  },
}

const programmeLists = {
  foundation: [
    ['fa01', 'Foundation in Islamic Studies'], ['fa02', 'Foundation in Management'], ['fa03', 'Foundation in Information Technology'],
    ['fa04', 'Foundation in Arabic Language'], ['fa05', 'Foundation in Communication'], ['fa06', 'Foundation in English Language'],
  ],
  diploma: [
    ['is11', 'Diploma in Quranic Language Studies'], ['is13', 'Diploma in Islamic Creed and Thought'], ['is14', 'Diploma in Al-Quran and As-Sunnah'],
    ['is15', 'Diploma in Da’wah'], ['is16', 'Diploma in Tahfiz Al-Quran and Al-Qiraat'], ['is12', 'Diploma in Shariah Studies'],
    ['is18', 'Diploma in Shariah and Islamic Law'], ['ms31', 'Diploma in Accounting'], ['ms32', 'Diploma in Business Management'],
    ['ms33', 'Diploma in Islamic Banking'], ['ms34', 'Diploma in Human Resource Management'], ['eb01', 'Executive Diploma in Mosque Management'],
    ['ms36', 'Diploma in Multimedia'], ['ms39', 'Diploma in Computer Science'], ['es52', 'Diploma in Teaching (TESL)'],
    ['es53', 'Diploma in Teaching (Islamic Education)'], ['cs41', 'Diploma in Communication'], ['ls43', 'Diploma in English Language Studies'],
  ],
  bachelor: [
    ['bi02', 'Bachelor of Al-Quran and Al-Sunnah with Communication (Honours)'], ['bi03', 'Bachelor of Usuluddin with Multimedia (Honours)'],
    ['bi04', 'Bachelor of Al-Quran and Al-Qiraat (Honours)'], ['bi05', 'Bachelor of Da’wah with Human Resource Management (Honours)'],
    ['bi06', 'Bachelor of Islamic Studies (Arabic with Multimedia) (Honours)'], ['bc01', 'Bachelor of Quranic Language Studies (Honours)'],
    ['bc03', 'Bachelor of Islamic Studies (Arabic Translation) (Honours)'], ['bs03', 'Bachelor of Shariah and Law (Honours)'],
    ['bs02', 'Bachelor of Shariah with Muamalat (Honours)'], ['bb01', 'Bachelor of Business Administration with E-Commerce (Honours)'],
    ['bb02', 'Bachelor of Human Resource Management (Honours)'], ['bb03', 'Bachelor of Economics and Finance (Honours)'],
    ['bb04', 'Bachelor of Accounting (Honours)'], ['bb05', 'Bachelor of Islamic Finance (Banking) (Honours)'],
    ['bb08', 'Bachelor of Management (Halal Industry) (Honours)'], ['bt01', 'Bachelor of Creative Multimedia (Interactive Media) (Honours)'],
    ['bt02', 'Bachelor of Information Technology (Network Technology) (Honours)'], ['bt04', 'Bachelor of Creative Multimedia (Digital Design) (Honours)'],
    ['bt05', 'Bachelor of Information Systems (Honours)'], ['be01', 'Bachelor of Education (TESL) with Multimedia'],
    ['be02', 'Bachelor of Islamic Education with Multimedia (Honours)'], ['be03', 'Bachelor of Education (Tahfiz Al-Quran and Al-Qiraat) (Honours)'],
    ['bc02', 'Bachelor of Communication (Broadcasting) (Honours)'], ['bb09', 'Bachelor of English with Corporate Communication (Honours)'],
  ],
  masterCoursework: [['mg02', 'Master of Shariah (Management)'], ['mg01', 'Master of Business Administration (Muamalah)'], ['mc03', 'Master of Information Technology']],
  masterResearch: [
    ['mt04', 'Master of Usuluddin and Islamic Thought'], ['mt05', 'Master of Usuluddin (Comparative Religion)'], ['mt06', 'Master of Hadith Studies'],
    ['mt07', 'Master of Al-Quran Studies'], ['mt08', 'Master of Qiraat Studies'], ['mt09', 'Master of Da’wah and Community Development'],
    ['mt22', 'Master of Arabic for Specific Purposes'], ['mt21', 'Master of Shariah Law'], ['mt10', 'Master of Human Resource Management'],
    ['mt11', 'Master of Economics'], ['mt12', 'Master of Islamic Finance'], ['mt13', 'Master of Accounting'],
    ['mt20', 'Master of Science (Creative Multimedia)'], ['mt23', 'Master of Information Technology Science'],
    ['mt15', 'Master of Education (Islamic Education)'], ['mt16', 'Master of Education (Language Education)'],
    ['mt17', 'Master of Education (Curriculum and Pedagogy)'], ['mt18', 'Master of Education (Educational Administration)'],
    ['mt14', 'Master of Communication'],
  ],
  phd: [
    ['pi01', 'Doctor of Philosophy in Islamiyyat'], ['pi02', 'Doctor of Philosophy in Arabic Studies'], ['ps01', 'Doctor of Philosophy in Shariah'],
    ['pb01', 'Doctor of Philosophy in Management'], ['pb02', 'Doctor of Philosophy in Accounting'],
    ['pt02', 'Doctor of Philosophy in Information Technology'], ['pe01', 'Doctor of Philosophy in Education'],
  ],
}

export const programmeLevels = Object.entries(programmeLists).map(([id, list]) => ({
  id, ...levelDefaults[id],
  programmes: list.map(([code, name]) => ({ code, name, subjects: subjectCatalog[code] || [], officialUrl: `https://study.uis.edu.my/${code}` })),
}))

export const accommodationFeesUrl = 'https://study.uis.edu.my/images/yuran-penginapan-uis-2025.pdf'
