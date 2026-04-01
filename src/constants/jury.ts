import type { Person, InfoCriterion } from "@/lib/types";

export const JURY_MEMBERS: Person[] = [
  { name: "Предстои", role: "Жури", org: "-", image: "", linkedin: "" },
  { name: "Предстои", role: "Жури", org: "-", image: "", linkedin: "" },
  { name: "Предстои", role: "Жури", org: "-", image: "", linkedin: "" },
  { name: "Предстои", role: "Жури", org: "-", image: "", linkedin: "" },
  { name: "Предстои", role: "Жури", org: "-", image: "", linkedin: "" },
  { name: "Предстои", role: "Жури", org: "-", image: "", linkedin: "" },
];

export const MENTORS: Person[] = [
  {
    name: "Людмил Радулов",
    role: "Ментор",
    org: "Software Roastery",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQGtQpo9gZgz2g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1709842866352?e=1776902400&v=beta&t=Qt3PXfvZFLVtfDSbw5s9HSWp0wsNkMXEs5-7-G3-OZY",
    linkedin: "https://www.linkedin.com/in/lyudmil-radulov/",
  },
  {
    name: "Веселин Стоянов",
    role: "Ментор",
    org: "Software Roastery",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQFauX1RYHNujQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729224813400?e=1776902400&v=beta&t=8Jw0Mw9pZSDdYsG9C_rXc-9kDHnCkN1NZvzjY4Q01qc",
    linkedin: "https://www.linkedin.com/in/stoyanov-veselin-8b083111/",
  },
  {
    name: "Веселин Златев",
    role: "Ментор",
    org: "Reward Gateway",
    image:
      "https://media.licdn.com/dms/image/v2/C4D03AQGuSKSMVcMoLw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1563106292252?e=1776902400&v=beta&t=vU9DhPZ-epwxeTY_vpmDGBR7iIOwclPCAcYehV3rbw0",
    linkedin: "https://www.linkedin.com/in/veselin-zlatev-bb87a8167/",
  },
  {
    name: "Ангел Манчев",
    role: "Ментор",
    org: "Reward Gateway",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQH2MlM4OGX9wg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1723832119935?e=1776902400&v=beta&t=n1yaaqQi8RkoZrPWK8-rypg_hm0TeKWbiBk9LZO6wW0",
    linkedin: "https://www.linkedin.com/in/angelmanchev/",
  },
  {
    name: "Стефан Атанасов",
    role: "Ментор",
    org: "Reward Gateway",
    image: "",
    linkedin: "https://www.linkedin.com/in/stefan-atanasov-95968a65/",
  },
  {
    name: "Юзджан Мехмедов",
    role: "Ментор",
    org: "Jethost",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQGYoDe8dIDgeg/profile-displayphoto-shrink_400_400/B4DZOnHfJgHgAg-/0/1733675578776?e=1776902400&v=beta&t=-qQtSDGu-QvdjzTICQVNRuHVfqz-dX1dmvu_o_BTgo4",
    linkedin: "https://www.linkedin.com/in/yuzdzhan-mehmedov-8b155569/",
  },
  {
    name: "Ивелин Белчев",
    role: "Ментор",
    org: "Freelance, Checkpoint",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQFtwvuHJm_WGA/profile-displayphoto-scale_400_400/B4DZx6TrL6IYAk-/0/1771578508453?e=1776902400&v=beta&t=JxLEWscxJme9He-kq6xHYqUbfTQH26IkmAHO8r93pT4",
    linkedin: "https://www.linkedin.com/in/ivelin-belchev/",
  },
  {
    name: "Ивелин Павлов",
    role: "Ментор",
    org: "-",
    image:
      "https://media.licdn.com/dms/image/v2/C4E03AQGg19taw_rk8g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1633468424878?e=1776902400&v=beta&t=LiOwDZ9cspyLV-sItYz1J4WuIJ-dI_9j3F8iKyFgGAs",
    linkedin: "https://www.linkedin.com/in/ibpavlov/",
  },
  {
    name: "Александър Кондов",
    role: "Ментор",
    org: "-",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQHLMaILrEfrYg/profile-displayphoto-shrink_400_400/B4DZQw9WaUHwAg-/0/1735988177040?e=1776902400&v=beta&t=iIKFGTkJ6nzRBGEYxxK0cC1wJc4jiuLfj0RN24slrnc",
    linkedin: "https://www.linkedin.com/in/alexander-kondov-2a8b25a9/",
  },
  {
    name: "Искрен Балчев",
    role: "Ментор",
    org: "-",
    image:
      "https://media.licdn.com/dms/image/v2/C4E03AQFOFgajayjLlA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1517664631921?e=1776902400&v=beta&t=C82G5gJUxAxSlkByhuooSBAEFmi7gwNNjJQD2-gqEkg",
    linkedin: "https://www.linkedin.com/in/iskrenbalchev/",
  },
  {
    name: "Елисей Йорданов",
    role: "Ментор",
    org: "-",
    image:
      "https://media.licdn.com/dms/image/v2/C4D03AQFwY838MFiNWA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1635674299913?e=1776902400&v=beta&t=loxH5_QVFtbRrbdsAsGeVY5y0AXm7_NTQk_7Qq41YR0",
    linkedin: "https://www.linkedin.com/in/elisey-yordanov-19625a1a0/",
  },
];

export const JUDGING_CRITERIA: InfoCriterion[] = [
  {
    title: "Идея и потенциал",
    pct: "30%",
    desc: "Има ли потенциал за развитие след хакатона? Решава ли реален проблем?",
  },
  {
    title: "AI интеграция",
    pct: "25%",
    desc: "Доколко ефективно е използван AI? Vibe coding подход и дълбочина на AI решението.",
  },
  {
    title: "UI/UX и презентация",
    pct: "25%",
    desc: "Яснота, лекота на използване и практичност на интерфейса. Качество на демо презентацията.",
  },
  {
    title: "Продукт и изпълнение",
    pct: "20%",
    desc: "Има ли работеща функционалност и реална стойност? Качество на изпълнението.",
  },
];
