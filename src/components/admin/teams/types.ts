export interface Member {
  id: string;
  full_name: string;
  role: string;
  dev_experience: string;
  ai_experience: string;
  ai_tools: string;
  has_theme: string;
  theme_description: string | null;
  organization: string;
  github_handle: string | null;
  avatar_url: string | null;
  ticket_number: number;
  ticket_id: string;
  registration_status: string;
}

export interface Team {
  name: string;
  members: Member[];
}

export interface SuggestedTeam {
  reason: string;
  members: Member[];
}

export interface TeamsSummary {
  totalApproved: number;
  formedTeams: number;
  soloCount: number;
  solosWithIdea: number;
  pendingCount: number;
}

export const DEV_SHORT: Record<string, string> = {
  "Нямам опит": "Няма",
  "Минимален - под 1 година": "<1г",
  "Начално ниво - между 1 и 3 години": "1-3г",
  "Средно ниво - между 4 и 7 години": "4-7г",
  "Високо ниво - над 8 години": "8+г",
};

export const AI_SHORT: Record<string, string> = {
  "Нямам опит": "Няма",
  "Между 1 и 6 месеца": "1-6м",
  "Между 7 и 12 месеца": "7-12м",
  "Повече от 12 месеца": "12+м",
};

export const DEV_COLOR: Record<string, string> = {
  "Нямам опит": "bg-white/10 text-white/50",
  "Минимален - под 1 година": "bg-blue-500/15 text-blue-400",
  "Начално ниво - между 1 и 3 години": "bg-cyan-500/15 text-cyan-400",
  "Средно ниво - между 4 и 7 години": "bg-purple-500/15 text-purple-400",
  "Високо ниво - над 8 години": "bg-acid/15 text-acid",
};

export const DEV_LEVEL_ORDER = [
  "Нямам опит",
  "Минимален - под 1 година",
  "Начално ниво - между 1 и 3 години",
  "Средно ниво - между 4 и 7 години",
  "Високо ниво - над 8 години",
] as const;
