export interface Person {
  name: string;
  role: string;
  org: string;
  image: string;
}

export interface Criterion {
  title: string;
  desc: string;
}

export interface AgendaEntry {
  time: string;
  label: string;
  desc: string;
}

export interface Prize {
  place: string;
  amount: string;
  desc: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface InfoCriterion {
  title: string;
  pct: string;
  desc: string;
}

export interface Sponsor {
  name: string;
  logo?: string;
}
