"use client";

import ButtonPrimary from "./button-primary";
import PageTransition from "./page-transition";

import PartnerStrip from "./partner-strip";
import { useEffect, useRef, useState } from "react";
import { translations } from "./translations";
import CleaningJourney from "./cleaning-journey";
import WorldMap from "./world-map";
import { journeyCopy } from "./journey-content";
import { usePageMotion } from "./use-page-motion";
import { useSmoothScroll } from "./smooth-scroll";
import RollingText from "./rolling-text";
import EngineeringStory from "./engineering-story";
import ApplicationsStory from "./applications-story";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import { useSiteUI } from "./site-ui";
import Icon from "./site-icon";
import ProductShowcase from "./product-showcase";
import "./section-scenes.css";
import "./home-refinement.css";
import "./action-styles.css";

function HeroFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => { if (motion.matches) video.pause(); else void video.play().catch(() => {}); };
    syncMotion();
    motion.addEventListener("change", syncMotion);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
      else if (!motion.matches) void video.play().catch(() => {});
    }, { threshold: 0.1 });
    observer.observe(video);
    return () => { observer.disconnect(); motion.removeEventListener("change", syncMotion); };
  }, []);
  return <video ref={ref} className="hero-film" src="/ics/hero-video.mp4" poster="/ics/hero-poster.jpg" muted loop playsInline preload="metadata" aria-hidden="true" />;
}

export default function Home() {
  const { locale, setLocale, openContact, contactOpen } = useSiteUI();
  const [industryModalOpen, setIndustryModalOpen] = useState(false);
  useSmoothScroll(industryModalOpen || contactOpen);
  const pageRef = useRef<HTMLElement>(null);
  usePageMotion(pageRef, locale);
  const copy = translations[locale];
  const journey = journeyCopy[locale];
  const [service, setService] = useState<number | null>(null);

  function openServiceContact(id: string) {
    const selected = journey.services.find((item) => item.id === id);
    if (!selected) return;
    openContact({ name: "", email: "", company: "", interest: selected.id, message: "" });
  }
  function openPartnerContact(country: string, countryCode?: string) {
    const message = { en: `I’m looking for an ICS contact in ${country}.`, sk: `Hľadám kontakt na ICS pre krajinu ${country}.`, de: `Ich suche einen ICS-Ansprechpartner für ${country}.`, ja: `${country}のICS窓口を探しています。` }[locale];
    openContact({ name: "", email: "", company: "", interest: "other", country: countryCode, message });
  }

  return <>
    <a className="skip-link" href="#main">{locale === "sk" ? "Prejsť na obsah" : locale === "de" ? "Zum Inhalt" : locale === "ja" ? "本文へ移動" : "Skip to content"}</a>
    <SiteHeader locale={locale} onLocaleChange={setLocale} onContact={() => openContact()} />
    <PageTransition><main id="main" className="home-page" ref={pageRef}>
      <section className="hero" aria-labelledby="hero-title">
        <HeroFilm />
        <div className="hero-shade" />
        <div className="hero-copy"><h1 id="hero-title">{copy.heroTitle[0]}<br />{copy.heroTitle[1]}</h1><a className="hero-link ui-action ui-action--secondary ui-action--inverse roll-trigger" href="#technology"><RollingText>{copy.editorial.explore}</RollingText><Icon name="arrow" /></a></div>
        <div className="hero-bottom"><span className="hero-location">{copy.origin}<br /><span>{copy.global}</span></span></div>
      </section>

      <ProductShowcase locale={locale} />

      <CleaningJourney locale={locale} />

      <ApplicationsStory locale={locale} onModalChange={setIndustryModalOpen} />
      
      <EngineeringStory locale={locale} />

      <section id="services" className="services-section section-pad reveal-section"><div className="services-intro"><h2>{journey.serviceTitle}</h2><p>{journey.serviceText}</p></div><div className="service-list">{journey.services.map((item, i) => <div className="service-row" key={item.id}><h3><button id={`service-trigger-${i}`} aria-expanded={service === i} aria-controls={`service-body-${i}`} onClick={() => setService(service === i ? null : i)}>{item.title}<span className="service-plus"><Icon name="plus" /></span></button></h3><div id={`service-body-${i}`} hidden={service !== i} role="region" aria-labelledby={`service-trigger-${i}`}><p>{item.text}</p><div className="service-actions"><ButtonPrimary icon="diagonal" onClick={() => openServiceContact(item.id)}>{journey.serviceAction}</ButtonPrimary></div></div></div>)}</div></section>

      <PartnerStrip locale={locale} />

      <section id="worldwide" className="world-story section-pad reveal-section"><div id="about" className="world-intro"><h2>{copy.editorial.worldHeading[0]}<br /><span>{copy.editorial.worldHeading[1]}</span></h2><div><p>{copy.worldText}</p></div></div><div className="world-map-wrap"><WorldMap locale={locale} onContact={openPartnerContact} /></div></section>

      <section className="contact-section section-pad"><h2 className="contact-invitation">{copy.editorial.contactTitle[0]}<br />{copy.editorial.contactTitle[1]}</h2><div className="contact-bottom"><p>{copy.ctaText}</p><ButtonPrimary onClick={() => openServiceContact("demonstration")}>{copy.bookDemo}</ButtonPrimary></div></section>
    </main></PageTransition>
    <SiteFooter />


  </>;
}
