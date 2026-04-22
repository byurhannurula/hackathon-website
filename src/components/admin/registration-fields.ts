import type { Registration } from "@/lib/types";
import { fmtDate } from "@/lib";

export function getRegistrationFields(reg: Registration): [string, string | null][] {
  return [
    ["Имейл", reg.email],
    ["Роля", reg.role],
    ["Дата на регистрация", fmtDate(reg.created_at)],
    ["Телефон", reg.phone],
    ["Възраст", reg.age],
    ["Организация", reg.organization],
    ["Dev опит", reg.dev_experience],
    ["AI опит", reg.ai_experience],
    ["AI инструменти", reg.ai_tools],
    ["Има тема", reg.has_theme],
    ["Описание на тема", reg.theme_description],
    ["Има отбор", reg.has_team],
    ["Име на отбор", reg.team_name],
    ["Иска предизвикателство", reg.want_challenge],
    ["Доброволец", reg.volunteer_help],
    ["GitHub", reg.github_handle],
  ];
}
