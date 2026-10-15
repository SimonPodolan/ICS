"use client";
import ButtonPrimary from "./button-primary";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "./content";
import { partnerBrands, partnerCopy } from "./partner-content";
import "./partner-strip.css";

export default function PartnerStrip({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const t = partnerCopy[locale];
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    let inViewport = false;
    const sync = () => setVisible(inViewport && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inViewport = entry.isIntersecting; sync(); });
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);
  return <section id="partners" className="partner-section" ref={root} aria-labelledby="partner-heading">
    <div className="partner-section-intro section-pad"><h2 id="partner-heading">{t.title}</h2><div><p>{t.text}</p><ButtonPrimary href="/partners">{t.action}</ButtonPrimary></div></div>
    <div className="partner-ticker" data-paused={paused || !visible}>
      <div className="partner-track">
        {[0, 1].map(copy => <ul className="partner-track-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>{partnerBrands.map(brand => <li key={brand.file}><Image src={`/ics/partners/${brand.file}`} alt={copy === 0 ? brand.name : ""} width={180} height={90} loading="eager" sizes="(max-width: 600px) 130px, 170px" /></li>)}</ul>)}
      </div>
    </div>
    <div className="partner-motion-controls section-pad"><button type="button" className="ui-action ui-action--secondary ui-action--icon" onClick={() => setPaused(value => !value)} aria-label={paused ? t.play : t.pause} title={paused ? t.play : t.pause}><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{paused ? <path d="m7 4 9 6-9 6Z" /> : <path d="M7 4v12M13 4v12" />}</svg></button></div>
  </section>;
}
