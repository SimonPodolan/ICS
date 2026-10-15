"use client";
import type { ReactNode } from "react";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import { useSiteUI } from "./site-ui";
export default function CatalogShell({ children }: { children: ReactNode }) {
 const { locale, setLocale, openContact } = useSiteUI();
 return <><a href="#catalog-main" className="skip-link">Skip to content</a><SiteHeader locale={locale} onLocaleChange={setLocale} onContact={() => openContact()} catalog /><div className="catalog-site" lang="en">{children}</div><SiteFooter /></>;
}
