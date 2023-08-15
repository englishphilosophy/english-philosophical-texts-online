import type { PageDetails } from "../../islands/Info.tsx";

export const aboutTitles = {
  about: "General Information",
  corpus: "Corpus Details",
  principles: "Editorial Principles",
  permissions: "Permissions",
  contact: "Contact Us",
  support: "Statements of Support",
};

export const aboutPages: PageDetails[] = [
  { id: "about", title: aboutTitles.about, url: "/about" },
  { id: "corpus", title: aboutTitles.corpus, url: "/about/corpus" },
  { id: "principles", title: aboutTitles.principles, url: "/about/principles" },
  {
    id: "permissions",
    title: aboutTitles.permissions,
    url: "/about/permissions",
  },
  { id: "contact", title: aboutTitles.contact, url: "/about/contact" },
  { id: "support", title: aboutTitles.support, url: "/about/support" },
];
