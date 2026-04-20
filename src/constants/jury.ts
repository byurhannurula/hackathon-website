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
    name: "Милко Янков",
    role: "Ментор",
    org: "Reward Gateway",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQFFsO3D8b_2iA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1698699852672?e=1776902400&v=beta&t=CpBPpghAQWHHwEgnSu56qa5i9j0UOLZZrQfXFi3J9QI",
    linkedin: "https://www.linkedin.com/in/milkoyankov/ ",
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
    image: "/avatars/stefan.png",
    linkedin: "https://www.linkedin.com/in/stefan-atanasov-95968a65/",
  },
  {
    name: "Петър Стоянов",
    role: "Ментор",
    org: "Reward Gateway",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQEMD0B2RMx_0g/profile-displayphoto-crop_800_800/B4DZhvRk4oHsAM-/0/1754213540360?e=1778112000&v=beta&t=ezZ2acOLEKf7UmynuIgcvUj8xje6Ng7wY02TL-9AhgM",
    linkedin: "https://www.linkedin.com/in/peterstoyanov1/",
  },
  {
    name: "Юзджан Мехмедов",
    role: "Ментор",
    org: "JetHost",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQGYoDe8dIDgeg/profile-displayphoto-shrink_400_400/B4DZOnHfJgHgAg-/0/1733675578776?e=1776902400&v=beta&t=-qQtSDGu-QvdjzTICQVNRuHVfqz-dX1dmvu_o_BTgo4",
    linkedin: "https://www.linkedin.com/in/yuzdzhan-mehmedov-8b155569/",
  },
  {
    name: "Иво Русев",
    role: "Ментор",
    org: "Graphwise",
    image:
      "https://media.licdn.com/dms/image/v2/C5603AQEYM6Yo8L_y0g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1526035431129?e=1776902400&v=beta&t=nRBb4thqkVhVwU4lvuWeN9g3BxE7pmqw6134I5FmI84",
    linkedin: "https://www.linkedin.com/in/ivo-rusev-b2bb149b/",
  },
  {
    name: "Александър Кондов",
    role: "Ментор",
    org: "SumUp",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQHLMaILrEfrYg/profile-displayphoto-shrink_400_400/B4DZQw9WaUHwAg-/0/1735988177040?e=1776902400&v=beta&t=iIKFGTkJ6nzRBGEYxxK0cC1wJc4jiuLfj0RN24slrnc",
    linkedin: "https://www.linkedin.com/in/alexander-kondov-2a8b25a9/",
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
    name: "ас. Мартин Джуров",
    role: "Ментор",
    org: "Катедра ИИТ, РУ",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQHUtkpg9JBfWw/profile-displayphoto-shrink_800_800/B4DZWwfEUfHIAc-/0/1742422689559?e=1776902400&v=beta&t=j5DMCBgu_El9LjS8vG7DWNsdyTGb8EbiqsE21FDiNGo",
    linkedin: "https://www.linkedin.com/in/martin-s-dzhurov/",
  },
  {
    name: "ас. Кристиан Спасов",
    role: "Ментор",
    org: "Катедра ИИТ, РУ",
    image: "/avatars/kristian.png",
    linkedin:
      "https://www.linkedin.com/in/%D0%BA%D1%80%D0%B8%D1%81%D1%82%D0%B8%D0%B0%D0%BD-%D1%81-744985121/",
  },
  {
    name: "Серкан Садулов",
    role: "Ментор",
    org: "Катедра ИИТ, РУ",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQEXyZ7zeYtDLA/profile-displayphoto-crop_800_800/B4DZzS3A86HYAI-/0/1773064163570?e=1776902400&v=beta&t=97oO_ofDbAidwzh4gY63HkH1ZKkeR8p8IlcYoNpWIQk",
    linkedin: "https://www.linkedin.com/in/serkan-sadulov/",
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
  {
    name: "Борислав Копрински",
    role: "Ментор",
    org: "-",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQHYP2N9k9AnVQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730235818014?e=1776902400&v=beta&t=StT6qIMdkL1IfGYZfBRGZZffiprJGWxmkVXqPu2GqgI",
    linkedin: "https://www.linkedin.com/in/borislav-koprinski/",
  },
  {
    name: "Николай Нинов",
    role: "Ментор",
    org: "-",
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQGrdm0R_rTIZw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1727696636397?e=1778112000&v=beta&t=SFES_OucfIGVG-vcEhyCCBoh5WDGpqqE7Hxl0Jv1ob4",
    linkedin: "https://www.linkedin.com/in/nick-ninov/",
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
