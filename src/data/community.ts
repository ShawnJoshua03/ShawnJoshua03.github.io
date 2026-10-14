// Community & Leadership entries. Sources: resume and LinkedIn export.

export interface Step {
  title: string;
  start: string;
  end: string;
  /** Sort key, YYYY-MM. */
  sort: string;
  note?: string;
}

/** SASE, shown as a promotion ladder. */
export const SASE: Step[] = [
  { title: 'Intern', start: 'Jan 2024', end: 'May 2024', sort: '2024-01' },
  { title: 'Outreach & External Relations', start: 'May 2024', end: 'May 2025', sort: '2024-05' },
  { title: 'Co-President', start: 'May 2025', end: 'May 2026', sort: '2025-05' },
  {
    title: 'South Central Regional Coordinator',
    start: 'Jun 2026',
    end: 'Present',
    sort: '2026-06',
    note: 'Working with representatives from 25+ chapters to organize national and regional conferences that promote networking between students and company representatives.',
  },
];

export interface Item {
  id: string;
  headline: string;
  org: string;
  role: string;
  when: string;
  sort: string;
  dateline: 'Dubai' | 'Cincinnati';
  body: string;
  todo?: string;
}

export const ITEMS: Item[] = [
  {
    id: 'tedx',
    headline: 'Student Gives Eight-Minute Talk on Perseverance to 200+ at TEDxGnms',
    org: 'TEDxGnms',
    role: 'Speaker',
    when: 'Oct 2020',
    sort: '2020-10',
    dateline: 'Dubai',
    body: 'I spoke for eight minutes on perseverance at TEDxGnms, in front of more than 200 people.',
    todo: 'link to the talk video, if it is online',
  },
  {
    id: 'knowledge-hour',
    headline: 'Knowledge Hour Gets a President',
    org: 'GEMS New Millennium School',
    role: 'Knowledge Hour President',
    when: 'May 2020 to Jun 2021',
    sort: '2020-05',
    dateline: 'Dubai',
    body: 'I served as President of Knowledge Hour at GEMS New Millennium School for just over a year.',
    todo: 'what Knowledge Hour is and what you ran as president',
  },
  {
    id: 'student-teacher',
    headline: 'Graduate Returns to the Classroom, This Time at the Front',
    org: 'GEMS New Millennium School',
    role: 'Student Teacher',
    when: 'Jun 2021 to Aug 2021',
    sort: '2021-06',
    dateline: 'Dubai',
    body: 'The summer after finishing high school, I spent three months as a Student Teacher at GEMS New Millennium School.',
    todo: 'subject and grade you taught',
  },
  {
    id: 'service-desk',
    headline: 'Service Desk Assistant Helps 750+ Students Move In, Move Out, and Get Back In',
    org: 'University of Cincinnati',
    role: 'Service Desk Assistant',
    when: 'Feb 2023 to Apr 2026',
    sort: '2023-02',
    dateline: 'Cincinnati',
    body: 'Over three years at the service desk I helped more than 750 students with move-ins and move-outs, managed package check-ins and resident lockouts, and cut student wait times by 20%.',
  },
  {
    id: 'soit',
    headline: 'School of IT Hosts Academic Achievement Dinner, With Help',
    org: 'School of Information Technology, University of Cincinnati',
    role: 'Student Worker',
    when: 'Aug 2024 to Dec 2024',
    sort: '2024-08',
    dateline: 'Cincinnati',
    body: 'I helped organize and run School of IT events, including the academic achievement dinner, and helped professors coordinate student meetings and advising sessions.',
  },
  {
    id: 'intern-ambassador',
    headline: 'Kroger Names Intern Ambassador for Summer 2026',
    org: 'Kroger',
    role: 'Intern Ambassador',
    when: 'Jun 2026 to Aug 2026',
    sort: '2026-06',
    dateline: 'Cincinnati',
    body: 'Intern Ambassador for Kroger during the same summer as my Kroger Finance internship.',
    todo: 'what the ambassador role involved',
  },
];

export const CERTIFICATIONS = [
  { name: 'Duke of Edinburgh Silver Award', todo: 'year' },
  { name: 'Azure Machine Learning Development: Part 1' },
  { name: 'Advanced Java Programming' },
  { name: 'AutoCAD 2024 Essential Training' },
];
