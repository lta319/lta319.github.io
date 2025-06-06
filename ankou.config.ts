import I18nKeys from "./src/locales/keys";
import type { Configuration } from "./src/types/config";

const AnkouConfig: Configuration = {
  title: "Ankou",
  subTitle: "Welcome to My Site",
  brandTitle: "Ankou",

  description: "Ankou Site",

  site: "https://gothub.com/lta319",

  locale: "en", // set for website language and date format

  navigators: [
    {
      nameKey: I18nKeys.nav_bar_home,
      href: "/",
    },
    {
      nameKey: I18nKeys.nav_bar_archive,
      href: "/archive",
    },
    {
      nameKey: I18nKeys.nav_bar_about,
      href: "/about",
    },
    {
      nameKey: I18nKeys.nav_bar_github,
      href: "https://github.com/lta319",
    },
  ],

  username: "Ankou ",
  sign: "Ad Astra Per Aspera.",
  avatarUrl: "/logo/kiana.jpg",//https://s2.loli.net/2025/01/25/FPpTrQSezM8ivbl.webp
  socialLinks: [
    {
      icon: "line-md:github-loop",
      link: "https://github.com/lta319",
    },
    {
      icon: "mingcute:bilibili-line",
      link: "https://space.bilibili.com/413332637",
    },
    {
      icon: "mingcute:netease-music-line",
      link: "https://c6.y.qq.com/base/fcgi-bin/u?__=H6uM3wyiKs2e",//"https://music.163.com/#/user/home?id=125291648"
    },
  ],
  maxSidebarCategoryChip: 6, // It is recommended to set it to a common multiple of 2 and 3
  maxSidebarTagChip: 12,
  maxFooterCategoryChip: 6,
  maxFooterTagChip: 24,

  banners: [
    "https://s2.loli.net/2025/01/25/PBvHFjr5yDu6t4a.webp",
    "https://s2.loli.net/2025/01/25/6bKcwHZigzlM4mJ.webp",
    "https://s2.loli.net/2025/01/25/H9WgEK6qNTcpFiS.webp",
    "https://s2.loli.net/2025/01/25/njNVtuUMzxs81RI.webp",
    "https://s2.loli.net/2025/01/25/tozsJ8QHAjFN3Mm.webp",
    "https://s2.loli.net/2025/01/25/Pm89OveZq7NWUxF.webp",
    "https://s2.loli.net/2025/01/25/UCYKvc1ZhgPHB9m.webp",
    "https://s2.loli.net/2025/01/25/JjpLOW8VSmufzlA.webp",
  ],
  slugMode: "HASH", // 'RAW' | 'HASH'

  license: {
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",//"https://creativecommons.org/licenses/by-nc-sa/4.0/"
  },

  // WIP functions
  bannerStyle: "LOOP", // 'loop' | 'static' | 'hidden'
};

export default AnkouConfig;
