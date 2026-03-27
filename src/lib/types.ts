export interface Person {
  name: string;
  role: string;
  org: string;
  image: string;
  linkedin?: string;
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

export type RegistrationStatus = "pending" | "approved" | "rejected";

export interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  age: string;
  role: string;
  organization: string;
  dev_experience: string;
  ai_experience: string;
  ai_tools: string;
  motivation: string;
  expectations: string;
  has_theme: string;
  theme_description: string | null;
  has_team: string;
  team_name: string | null;
  want_challenge: string;
  volunteer_help: string;
  github_handle: string | null;
  avatar_url: string | null;
  ticket_number: number;
  ticket_id: string;
  registration_status: RegistrationStatus;
  notes: string | null;
  created_at: string;
  status_updated_at: string | null;
}

export type SponsorTier = "organizer" | "gold" | "silver" | "bronze";

export interface Sponsor {
  name: string;
  logo?: string;
  href?: string;
  tier: SponsorTier;
}
