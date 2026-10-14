// Site-wide settings and the copy that changes with the project filter.

export const SITE = {
  name: 'Shawn Lasrado',
  title: 'Shawn Lasrado · Software, AI & Data, Product',
  motto: 'Building interesting things.',
  email: 'shawnlasrado@gmail.com',
  github: 'https://github.com/ShawnJoshua03',
  linkedin: 'https://www.linkedin.com/in/shawn-lasrado',
  resumePdf: '/Shawn_Lasrado_Resume_2026.pdf',
  degree: 'B.S. Computer Science, IT minor',
  school: 'University of Cincinnati',
  grad: 'December 2026',
  location: 'U.S.-based · open to relocation & remote',
  /** Never mention visa or work-authorization status unless this is true. */
  showWorkAuth: false,
  workAuthNote: '',
  /** TODO(shawn) notes render only in `npm run dev`, never on the live site. */
  showTodos: import.meta.env.DEV,
} as const;

export type FocusId = 'all' | 'software' | 'ai' | 'product';

export interface Focus {
  id: FocusId;
  label: string;
  /** Key into each project's `rank` frontmatter. */
  rankKey: 'all' | 'eng' | 'ai' | 'product';
  /** Hero line under the name. */
  pitch: string;
}

export const FOCUSES: Focus[] = [
  {
    id: 'all',
    label: 'All',
    rankKey: 'all',
    pitch: 'I build software, ML and data products that ship, then write down exactly what they can’t do yet.',
  },
  {
    id: 'software',
    label: 'Software',
    rankKey: 'eng',
    pitch: 'Full-stack developer. My recent projects run CI on every push, ship with a live demo, and list their own limitations.',
  },
  {
    id: 'ai',
    label: 'AI & Data',
    rankKey: 'ai',
    pitch: 'I build ML and agent systems, score them on the metric that matters, and publish the numbers that make them look worse.',
  },
  {
    id: 'product',
    label: 'Product',
    rankKey: 'product',
    pitch: 'I founded a rental platform, led a $48M+ RFP at Kroger, and can still read the SQL behind the dashboard.',
  },
];

export const FOCUS_IDS = FOCUSES.map((f) => f.id);

// Skills come from the resume.
export const SKILLS = [
  { group: 'Languages & Frameworks', items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C++', 'Java', 'HTML/CSS', 'React', 'FastAPI', 'Flask', 'Next.js', 'Node.js', 'D3.js'] },
  { group: 'AI / ML', items: ['Google Cloud ADK', 'Gemini', 'Elasticsearch', 'Neo4j', 'LangChain', 'vector embeddings', 'scikit-learn', 'pandas', 'NumPy'] },
  { group: 'Cloud & Tools', items: ['GCP', 'Firebase', 'Supabase', 'AWS', 'Git', 'Docker', 'Power BI', 'Azure ML', 'Power Automate', 'Oracle', 'Coupa', 'ServiceNow', 'Excel'] },
];
