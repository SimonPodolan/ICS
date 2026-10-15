"use client";

import ButtonPrimary from "./button-primary";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import type { Locale } from "./content";
import { translations } from "./translations";
import RollingText from "./rolling-text";
import { partnerCopy } from "./partner-content";
import "./site-header.css";

type SiteHeaderProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  onContact: () => void;
  catalog?: boolean;
};

const languages: { code: Locale; name: string }[] = [
  { code: "en", name: "English" },
  { code: "sk", name: "Slovenčina" },
  { code: "de", name: "Deutsch" },
  { code: "ja", name: "日本語" },
];
const destinations = [
  { id: "products", index: 0 },
  { id: "applications", index: 1 },
  { id: "services", index: 2 },
  { id: "partners", index: -1 },
  { id: "worldwide", index: 3 },
];

function subscribeToScroll(changed: () => void) {
  window.addEventListener("scroll", changed, { passive: true });
  return () => window.removeEventListener("scroll", changed);
}
const isScrolled = () => window.scrollY > 32;
const serverScroll = () => false;

function Arrow() {
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg>;
}

export default function SiteHeader({ locale, onLocaleChange, onContact, catalog = false }: SiteHeaderProps) {
  const copy = translations[locale];
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, serverScroll);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const languageRef = useRef<HTMLDetailsElement>(null);
  const mobileRef = useRef<HTMLElement>(null);
  const mobileId = useId();
  const menuMotion = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const context = gsap.context(() => {
      const panel = header.querySelector(".mobile-nav");
      const backdrop = header.querySelector(".mobile-menu-backdrop");
      const fill = header.querySelector(".mobile-menu-fill");
      const links = header.querySelectorAll(".mobile-nav-item > a");
      const bottom = header.querySelector(".mobile-nav-bottom");
      gsap.set([panel, backdrop], { autoAlpha: 0 });
      gsap.set(fill, { scaleY: 0, transformOrigin: "50% 0%" });
      gsap.set(links, { yPercent: 110, opacity: 0 });
      gsap.set(bottom, { y: 10, opacity: 0 });
      menuMotion.current = gsap.timeline({ paused: true, onReverseComplete: () => { gsap.set(panel, { autoAlpha: 0 }); } })
        .to(backdrop, { autoAlpha: 1, duration: .24, ease: "power2.out" }, 0)
        .to(fill, { scaleY: 1, duration: .32, ease: "power3.inOut" }, 0)
        .to(".header-menu-line--top", { y: 4, rotation: 45, duration: .26, ease: "power3.inOut", svgOrigin: "12 8" }, 0)
        .to(".header-menu-line--bottom", { y: -4, rotation: -45, duration: .26, ease: "power3.inOut", svgOrigin: "12 16" }, 0)
        .to(links, { yPercent: 0, opacity: 1, duration: .25, stagger: .035, ease: "power3.out" }, .09)
        .to(bottom, { y: 0, opacity: 1, duration: .22, ease: "power2.out" }, .2);
    }, header);
    return () => { context.revert(); menuMotion.current = null; };
  }, []);

  useLayoutEffect(() => {
    const timeline = menuMotion.current;
    if (!timeline) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const settle = () => {
      timeline.progress(mobileOpen ? 1 : 0).pause();
      gsap.set(mobileRef.current, { autoAlpha: mobileOpen ? 1 : 0 });
    };
    if (reduced.matches || document.documentElement.dataset.input === "keyboard") settle();
    else if (mobileOpen) { gsap.set(mobileRef.current, { autoAlpha: 1 }); timeline.timeScale(1).play(); }
    else timeline.timeScale(1.5).reverse();
    const onReducedMotion = () => { if (reduced.matches) settle(); };
    reduced.addEventListener("change", onReducedMotion);
    return () => reduced.removeEventListener("change", onReducedMotion);
  }, [mobileOpen]);

  useEffect(() => {
    const closeLanguage = (restoreFocus: boolean) => {
      const picker = languageRef.current;
      if (!picker?.open) return false;
      picker.open = false;
      if (restoreFocus) picker.querySelector("summary")?.focus({ preventScroll: true });
      return true;
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (closeLanguage(true)) return;
      if (mobileOpen) {
        setMobileOpen(false);
        menuRef.current?.focus({ preventScroll: true });
      }
    };
    const onOutsidePointer = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return;
      if (!languageRef.current?.contains(event.target)) closeLanguage(languageRef.current?.contains(document.activeElement) ?? false);
      if (mobileOpen && !headerRef.current?.contains(event.target)) {
        // Restore a disappearing menu focus; the pointer's default action can then
        // focus the outside control normally.
        if (mobileRef.current?.contains(document.activeElement)) menuRef.current?.focus({ preventScroll: true });
        setMobileOpen(false);
      }
    };
    const onFocusOutside = (event: FocusEvent) => {
      if (!(event.target instanceof Node) || headerRef.current?.contains(event.target)) return;
      closeLanguage(false);
      if (mobileOpen) setMobileOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 961px)");
    const onDesktop = () => { if (desktop.matches) setMobileOpen(false); };

    document.addEventListener("keydown", onEscape);
    document.addEventListener("pointerdown", onOutsidePointer);
    document.addEventListener("focusin", onFocusOutside);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("pointerdown", onOutsidePointer);
      document.removeEventListener("focusin", onFocusOutside);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [mobileOpen]);

  function chooseLanguage(next: Locale) {
    onLocaleChange(next);
    if (languageRef.current) {
      languageRef.current.open = false;
      languageRef.current.querySelector("summary")?.focus({ preventScroll: true });
    }
  }

  function toggleMenu() {
    if (languageRef.current) languageRef.current.open = false;
    setMobileOpen((open) => !open);
  }

  function contactFromMenu() {
    // The contact dialog can restore focus to this persistent control when closed.
    menuRef.current?.focus({ preventScroll: true });
    setMobileOpen(false);
    onContact();
  }

  return <header ref={headerRef} className="site-header ics-header" data-menu-open={mobileOpen} data-scrolled={catalog || scrolled}>
    <div className="header-inner">
      <div className="header-identity">
        <Link className="brand" href={catalog ? "/" : "#"} aria-label="ICS — Ice Cleaning Systems" onClick={() => setMobileOpen(false)}>
          <Image src="/ics/logo-light.svg" alt="ICS Ice Cleaning Systems" width={175} height={40} priority />
        </Link>
        <span className="header-origin">{copy.origin}</span>
      </div>

      <nav className="desktop-nav" aria-label={copy.menu}>
        {destinations.map(({ id, index }) => <Link className="header-nav-link roll-trigger" key={id} href={id === "products" ? "/products" : catalog ? `/#${id}` : `#${id}`}><RollingText>{id === "products" ? copy.footerLinks[0] : id === "partners" ? partnerCopy[locale].nav : copy.nav[index]}</RollingText></Link>)}
      </nav>

      <div className="header-actions">
        <details className="language-picker" ref={languageRef} onToggle={(event) => { if (event.currentTarget.open) setMobileOpen(false); }}>
          <summary aria-label={`${copy.language}: ${languages.find((language) => language.code === locale)?.name}`}>
            <span>{locale.toUpperCase()}</span>
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>
          </summary>
          <div className="language-popover" role="group" aria-label={copy.language}>
            {languages.map((language) => <button key={language.code} type="button" lang={language.code} aria-pressed={locale === language.code} onClick={() => chooseLanguage(language.code)}><span>{language.name}</span><span className="language-code" aria-hidden="true">{language.code.toUpperCase()}</span></button>)}
          </div>
        </details>
        <ButtonPrimary className="header-contact" icon="diagonal" onClick={onContact}>{copy.contact}</ButtonPrimary>
        <button ref={menuRef} className="mobile-toggle ui-action ui-action--secondary ui-action--inverse ui-action--icon" type="button" aria-expanded={mobileOpen} aria-controls={mobileId} aria-label={mobileOpen ? copy.close : copy.menu} onClick={toggleMenu}>
          <svg className="header-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path className="header-menu-line header-menu-line--top" d="M3 8h18" /><path className="header-menu-line header-menu-line--bottom" d="M3 16h18" /></svg>
        </button>
      </div>
    </div>

    <button className="mobile-menu-backdrop" type="button" aria-hidden="true" tabIndex={-1} style={{ pointerEvents: mobileOpen ? "auto" : "none" }} onClick={() => { menuRef.current?.focus({ preventScroll: true }); setMobileOpen(false); }} />
    <nav ref={mobileRef} id={mobileId} className="mobile-nav" aria-label={copy.menu} aria-hidden={!mobileOpen} inert={!mobileOpen} data-lenis-prevent>
      <div className="mobile-menu-content">
      <div className="mobile-menu-fill" aria-hidden="true" />
      <div className="mobile-nav-links">
        {destinations.map(({ id, index }) => <div className="mobile-nav-item" key={id}><Link className="header-nav-link" href={id === "products" ? "/products" : catalog ? `/#${id}` : `#${id}`} onClick={() => { menuRef.current?.focus({ preventScroll: true }); setMobileOpen(false); }}><span>{id === "products" ? copy.footerLinks[0] : id === "partners" ? partnerCopy[locale].nav : copy.nav[index]}</span><Arrow /></Link></div>)}
      </div>
      <div className="mobile-nav-bottom"><a className="mobile-email" href="mailto:sales@ics-dryice.com" onClick={() => setMobileOpen(false)}>sales@ics-dryice.com</a><ButtonPrimary icon="diagonal" onClick={contactFromMenu}>{copy.contact}</ButtonPrimary></div>
      </div>
    </nav>
  </header>;
}
