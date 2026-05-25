export interface SkillCategory {
  title: string;
  tool: string[];
}

export interface Skills {
  ml: SkillCategory;
  programming: SkillCategory;
  frontend: SkillCategory;
  backend: SkillCategory;
  database: SkillCategory;
  devops_others: SkillCategory;
}

export interface BioData {
  role_focus: string;
  single_linear: string;
  about_me: string;
  research_vision: string;
  skill: Skills;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  start_date: string;
  end_date: string;
  logo: string;
  gpa?: string;
}

export interface Publication {
  order: number;
  title: string;
  authors: string;
  venue: string;
  year: number;
  isPreprint: boolean;
  link: string;
}
