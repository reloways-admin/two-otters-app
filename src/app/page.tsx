"use client";
import { useState } from "react";

import NavV4 from "@/components/v4/NavV4";
import HeroV4 from "@/components/v4/HeroV4";
import FeaturesV4 from "@/components/v4/FeaturesV4";
import ProcessV4 from "@/components/v4/ProcessV4";
import ValuesV4 from "@/components/v4/ValuesV4";
import PersonaV4 from "@/components/v4/PersonaV4";
import AboutV4 from "@/components/v4/AboutV4";
import FaqV4 from "@/components/v4/FaqV4";
import ContactV4 from "@/components/v4/ContactV4";
import FooterV4 from "@/components/v4/FooterV4";

import en from "@/locales/en.json";
import he from "@/locales/he.json";

type Lang = "en" | "he";
const locales = { en, he } as const;

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("he");
  const t = locales[lang];
  const isRTL = lang === "he";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="v4-page">
      <NavV4 t={t.nav} isRTL={isRTL} lang={lang} onLangChange={setLang} />
      <HeroV4 t={t.hero} isRTL={isRTL} />
      <FeaturesV4 t={t.features} isRTL={isRTL} />
      <ProcessV4 t={t.process} isRTL={isRTL} />
      <ValuesV4 t={t.values} isRTL={isRTL} />
      <PersonaV4 t={t.persona} isRTL={isRTL} />
      <AboutV4 t={t.about} isRTL={isRTL} />
      <FaqV4 t={t.faq} isRTL={isRTL} />
      <ContactV4 t={t.contact} isRTL={isRTL} />
      <FooterV4 t={t.footer} isRTL={isRTL} />
    </div>
  );
}
