"use client";

import ButtonPrimary from "./button-primary";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { headquarters, networkFacts, worldCountries } from "./world-map-data";
import { worldMapCountryNames, worldMapCountryOrder } from "./world-map-locales";
import "./world-map.css";

type Locale = "en" | "sk" | "de" | "ja";
type WorldMapProps = { locale: Locale; onContact: (country: string, countryCode?: string) => void };
const countryById = new Map(worldCountries.map((country) => [country.id, country]));

const labels = {
  en: {
    map: "Explore the world of ICS", choose: "Choose your country", headquarters: "Headquarters", otherCountry: "Other country / region",
    help: "Select a country. Our team will help you find the right local contact.",
    contact: "Find your local contact", hqContact: "Talk to our team", countries: "countries", distributors: "distributors", continents: "continents",
    keyboard: "Use the arrow keys to choose a country, or use the country menu below.",
  },
  sk: {
    map: "Objavte svet ICS", choose: "Vyberte svoju krajinu", headquarters: "Centrála", otherCountry: "Iná krajina / región",
    help: "Vyberte krajinu. Náš tím vám pomôže nájsť správny miestny kontakt.",
    contact: "Nájsť miestny kontakt", hqContact: "Spojiť sa s naším tímom", countries: "krajín", distributors: "distribútorov", continents: "kontinenty",
    keyboard: "Krajinu vyberiete šípkami alebo pomocou ponuky pod mapou.",
  },
  de: {
    map: "Entdecken Sie die Welt von ICS", choose: "Land auswählen", headquarters: "Hauptsitz", otherCountry: "Anderes Land / Region",
    help: "Wählen Sie ein Land. Unser Team hilft Ihnen, den richtigen Ansprechpartner zu finden.",
    contact: "Ansprechpartner finden", hqContact: "Unser Team kontaktieren", countries: "Länder", distributors: "Vertriebspartner", continents: "Kontinente",
    keyboard: "Wählen Sie ein Land mit den Pfeiltasten oder über die Länderauswahl unter der Karte.",
  },
  ja: {
    map: "ICSのグローバルネットワーク", choose: "国を選択", headquarters: "本社", otherCountry: "その他の国・地域",
    help: "国をお選びください。担当チームが適切な窓口をご案内します。",
    contact: "地域の窓口を探す", hqContact: "チームに問い合わせる", countries: "か国", distributors: "販売代理店", continents: "大陸",
    keyboard: "矢印キー、または地図の下のメニューで国を選択できます。",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function WorldMap({ locale, onContact }: WorldMapProps) {
  const [selectedId, setSelectedId] = useState("svk");
  const rootRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<Record<string, SVGPathElement | null>>({});
  const uniqueId = useId();
  const text = labels[locale];
  const countryName = (id: string) => id === "other" ? text.otherCountry : worldMapCountryNames[locale][id];
  const options = useMemo(() => worldMapCountryOrder[locale].map((id) => ({
    ...countryById.get(id)!,
    localizedName: worldMapCountryNames[locale][id],
  })), [locale]);
  const selected = countryById.get(selectedId);
  const isHeadquarters = selected?.code === "SK";

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia(node);
    let mounted = true;

    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Geography → headquarters → network scale. Values and controls stay visible.
      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: "top 90%",
          end: "top 36%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      reveal
        .fromTo(".world-map-stage", {
          opacity: 0.8,
        }, {
          opacity: 1, duration: 0.65, ease: "none",
        }, 0)
        .fromTo(".world-map-hq-marker text, .world-map-leader", {
          opacity: 0.25,
        }, {
          opacity: 1, duration: 0.25, ease: "none",
        }, 0.28)
        .fromTo(".world-map-pulse", {
          scale: 0.85, opacity: 0.55, transformOrigin: "50% 50%",
        }, {
          scale: 2.6, opacity: 0, duration: 0.4, ease: "power2.out",
        }, 0.3)
        .fromTo(".world-map-facts > div", {
          opacity: 0.8,
        }, {
          opacity: 1, duration: 0.25, stagger: 0.06, ease: "power2.out",
        }, 0.53);

      // Keyboard/touch focus settles the map immediately, so targets never drift.
      const settleForInteraction = () => {
        reveal.scrollTrigger?.kill(false, true);
        reveal.progress(1).pause();
      };
      node.addEventListener("focusin", settleForInteraction);
      return () => node.removeEventListener("focusin", settleForInteraction);
    });

    // Account for the preceding pinned journey and final font metrics.
    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    void document.fonts.ready.then(() => {
      if (mounted) ScrollTrigger.refresh();
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(refreshFrame);
      media.revert();
    };
  }, []);

  function moveFocus(direction: number) {
    const current = options.findIndex((country) => country.id === selectedId);
    const next = options[(current + direction + options.length) % options.length];
    setSelectedId(next.id);
    pathsRef.current[next.id]?.focus();
  }

  return (
    <div className="ics-world-map" ref={rootRef}>
      <p className="world-map-sr-only" id={`${uniqueId}-instructions`}>{text.keyboard}</p>
      <div className="world-map-stage">
        <svg viewBox="0 0 1000 405" aria-label={text.map} aria-describedby={`${uniqueId}-instructions`} role="group" className="world-map-geography">
          {worldCountries.map((country) => (
            <path
              key={country.id}
              ref={(node) => { pathsRef.current[country.id] = node; }}
              d={country.path}
              className={`world-map-country${country.code === "SK" ? " world-map-country-hq" : ""}${selectedId === country.id ? " world-map-country-selected" : ""}`}
              role={country.code ? "button" : undefined}
              tabIndex={country.code ? ((selectedId === "other" ? country.id === "svk" : selectedId === country.id) ? 0 : -1) : undefined}
              aria-label={country.code ? `${countryName(country.id)}${country.code === "SK" ? ` — ${text.headquarters}` : ""}` : undefined}
              aria-pressed={country.code ? selectedId === country.id : undefined}
              onClick={country.code ? () => setSelectedId(country.id) : undefined}
              onFocus={country.code ? () => setSelectedId(country.id) : undefined}
              onKeyDown={country.code ? (event) => {
                if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) {
                  event.preventDefault();
                  moveFocus(event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1);
                } else if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedId(country.id);
                }
              } : undefined}
            >
              <title>{countryName(country.id)}</title>
            </path>
          ))}
          <g aria-hidden="true" className="world-map-hq-marker" transform={`translate(${headquarters.x} ${headquarters.y})`}>
            <circle className="world-map-pulse" r="7" />
            <circle className="world-map-hq-dot" r="3.5" />
            <path className="world-map-leader" d="M7 -3 L31 -20 H66" />
            <text x="71" y="-17">ICS · {text.headquarters}</text>
          </g>
          {!isHeadquarters && selected && <g aria-hidden="true" className="world-map-selection-marker" transform={`translate(${selected.x} ${selected.y})`}>
            <circle r="7" className="world-map-selection-ring" />
            <circle r="2.8" />
          </g>}
        </svg>
      </div>


      <div className="world-map-controls">
        <div className="world-map-country-picker">
          <label className="world-map-sr-only" htmlFor={`${uniqueId}-country`}>{text.choose}</label>
          <select id={`${uniqueId}-country`} value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
            {options.map((country) => <option key={country.id} value={country.id}>{country.localizedName}</option>)}
            <option value="other">{text.otherCountry}</option>
          </select>
          <svg aria-hidden="true" viewBox="0 0 16 16"><path d="m4 6 4 4 4-4" /></svg>
        </div>
        <p className="world-map-selection-copy" aria-live="polite">{isHeadquarters ? `Považská Bystrica · ${text.headquarters}` : text.help}</p>
        <ButtonPrimary className="world-map-contact" onClick={() => onContact(countryName(selectedId), selected?.code || undefined)}>{isHeadquarters ? text.hqContact : text.contact}</ButtonPrimary>
      </div>

      <dl className="world-map-facts" aria-label={text.map}>
        <div><dt>{text.countries}</dt><dd>{networkFacts.countries}</dd></div>
        <div><dt>{text.distributors}</dt><dd>{networkFacts.distributors}</dd></div>
        <div><dt>{text.continents}</dt><dd>{networkFacts.continents}</dd></div>
      </dl>
    </div>
  );
}
