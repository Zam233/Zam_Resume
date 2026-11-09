export type Meta = {
  source: string;
  updated: string;
  note: string;
};

export type Profile = {
  name: string;
  latin: string;
  age: number;
  status: string;
  address: string;
  fields: string[];
  summary: string;
  portrait: string;
};

export type Skill = { name: string; group?: string };

export type Account = {
  platform: string;
  handle: string;
  followers: string;
  note?: string;
  /** public profile URL; omit or null when there is nothing to link to */
  url?: string | null;
};

export type EducationItemKind = 'note' | 'thesis' | 'award' | 'role';

export type EducationItem = { kind: EducationItemKind; text: string };

export type Education = {
  school: string;
  degree: string;
  major?: string;
  gpa?: string;
  period: string;
  current?: boolean;
  items: EducationItem[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export type Project = {
  title: string;
  subtitle?: string;
  summary: string;
  link?: string;
  linkLabel?: string;
  pipeline?: string[];
  tags?: string[];
};

export type OtherProject = { time: string; text: string };

export type Resume = {
  meta: Meta;
  profile: Profile;
  skills: Skill[];
  certificates: string[];
  aiAgents: string[];
  accounts: Account[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  otherProjects: OtherProject[];
};

export type SectionId =
  | 'overview'
  | 'education'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'accounts';

export type SectionMeta = {
  id: SectionId;
  label: string;
  latin: string;
  short: string;
};
