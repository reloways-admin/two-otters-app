"use client";
import { useState } from "react";

import NavV5 from "@/components/v5/NavV5";
import HeroV5 from "@/components/v5/HeroV5";
import FeaturesV5 from "@/components/v5/FeaturesV5";
import ProcessV5 from "@/components/v5/ProcessV5";
import ValuesV5 from "@/components/v5/ValuesV5";
import PersonaV5 from "@/components/v5/PersonaV5";
import AboutV5 from "@/components/v5/AboutV5";
import FaqV5 from "@/components/v5/FaqV5";
import ContactV5 from "@/components/v5/ContactV5";
import FooterV5 from "@/components/v5/FooterV5";

import en from "@/locales/en.json";
import he from "@/locales/he.json";

type Lang = "en" | "he";
const locales = { en, he } as const;

export default function V5Page() {
  const [lang, setLang] = useState<Lang>("en");
  const t = locales[lang];
  const isRTL = lang === "he";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="v5-page">
      <NavV5 t={t.nav} isRTL={isRTL} lang={lang} onLangChange={setLang} />
      <HeroV5 t={t.hero} isRTL={isRTL} />
      <FeaturesV5 t={t.features} isRTL={isRTL} />
      <ProcessV5 t={t.process} isRTL={isRTL} />
      <ValuesV5 t={t.values} isRTL={isRTL} />
      <PersonaV5 t={t.persona} isRTL={isRTL} />
      <AboutV5 t={t.about} isRTL={isRTL} />
      <FaqV5 t={t.faq} isRTL={isRTL} />
      <ContactV5 t={t.contact} isRTL={isRTL} />
      <FooterV5 t={t.footer} isRTL={isRTL} />
    </div>
  );
}
