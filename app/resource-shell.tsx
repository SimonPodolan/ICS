"use client";
import type { ReactNode } from "react";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import { useSiteUI } from "./site-ui";
export default function ResourceShell({ children }: { children: ReactNode }) {
  const { locale, setLocale, openContact } = useSiteUI();
  return <><a href="#resource-main" className="skip-link">{{ en: "Skip to content", sk: "Prejsť na obsah", de: "Zum Inhalt", ja: "本文へ" }[locale]}</a><SiteHeader locale={locale} onLocaleChange={setLocale} onContact={() => openContact()} catalog /><main id="resource-main" className="resource-page">{children}</main><SiteFooter /></>;
}
