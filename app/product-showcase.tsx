"use client";

import ButtonPrimary from "./button-primary";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import type { Locale } from "./content";
import { categories } from "./catalog-categories";
import products from "./catalog-preview.json";
import RollingText from "./rolling-text";
import { translations } from "./translations";

const labels = {
  en: ["Clean.", "Produce.", "Automate.", "Accessories."],
  sk: ["Čistiť.", "Vyrábať.", "Automatizovať.", "Príslušenstvo."],
  de: ["Reinigen.", "Produzieren.", "Automatisieren.", "Zubehör."],
  ja: ["洗浄", "製造", "自動化", "アクセサリー"],
};
function Arrow() { return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg>; }

export default function ProductShowcase({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const section = useRef<HTMLElement>(null);
  const pointer = useRef(false);
  const copy = translations[locale];
  const requested = useRef(0);
  async function selectCategory(index: number, animate: boolean) {
    requested.current = index;
    const photo = section.current?.querySelector<HTMLImageElement>(`[data-system="${index}"] img`);
    // Keep the current preview visible until the next photograph can be painted.
    if (photo && !photo.complete) await photo.decode().catch(() => {});
    if (requested.current !== index) return;
    pointer.current = animate;
    setSelected(index);
  }
  useLayoutEffect(() => {
    const panels = section.current?.querySelectorAll(".system-stage") ?? [];
    return () => {
      requested.current = -1;
      gsap.killTweensOf(panels);
    };
  }, []);
  useLayoutEffect(() => {
    const panels = section.current?.querySelectorAll<HTMLElement>(".system-stage");
    if (!panels) return;
    const animate = pointer.current && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    panels.forEach((panel, index) => {
      const active = index === selected;
      // Retarget from the current frame; never reset an interrupted transition.
      gsap.to(panel, { autoAlpha: active ? 1 : 0, y: active ? 0 : 8,
        duration: animate ? .28 : 0, ease: "power2.out", overwrite: true });
    });
  }, [selected]);
  return <section ref={section} id="technology" className="technology-section section-pad">
    <nav className="system-tabs" aria-label={copy.editorial.technologyLabel}>{categories.map((item, index) => <Fragment key={item.slug}><Link className="roll-trigger system-category-link" href={`/products/${item.slug}`} data-active={selected === index}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") { void selectCategory(index, true); } }}
      onFocus={() => { void selectCategory(index, false); }}>
      <RollingText>{labels[locale][index]}</RollingText><Arrow />
    </Link><button type="button" className="roll-trigger system-category-preview" data-active={selected === index} aria-pressed={selected === index} aria-controls="system-preview" onClick={(event) => {
      void selectCategory(index, event.detail !== 0);
    }}><RollingText>{labels[locale][index]}</RollingText><Arrow /></button></Fragment>)}</nav>
    <div id="system-preview" className="system-preview-stack">
    {categories.map((category, index) => {
      const product = products.find((item) => item.id === category.id)!;
      return <div key={category.slug} data-system={index} className="system-stage" aria-hidden={selected !== index} inert={selected !== index} style={{ opacity: index === 0 ? 1 : 0, visibility: index === 0 ? "visible" : "hidden", pointerEvents: selected === index ? "auto" : "none" }}>
      <div className="system-copy"><h3>{index < 3 ? copy.products[index].title : labels[locale][index].replace(/\.$/, "")}</h3><p className="system-description">{index < 3 ? copy.products[index].text : category.intro}</p><ButtonPrimary href={`/products/${category.slug}`}>{copy.viewRange}</ButtonPrimary></div>
      <div className={`system-visual system-visual-${index}`}>

        <Image src={category.image} alt={product.title} width={1200} height={1000} sizes="(max-width: 700px) 100vw, 65vw" loading="eager" />
        <div className="system-caption"><span>{product.title}</span><Link href="/products" className="ui-action ui-action--secondary">{locale === "sk" ? "Všetky produkty" : locale === "de" ? "Alle Produkte" : locale === "ja" ? "すべての製品" : "All products"}<Arrow /></Link></div>
      </div>
    </div>;
    })}
    </div>
  </section>;
}
