"use client";

import Image from "next/image";
import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent } from "react";
import { gsap } from "gsap";
import type { Locale } from "./content";
import { translations } from "./translations";
import { industries, industryInterface } from "./industry-content";
import { industryDetails, industryReading } from "./industry-details";
import IndustrySheet from "./industry-sheet";
import { scrollToPosition } from "./smooth-scroll";
import RollingText from "./rolling-text";
import "./applications-story.css";

type Industry = typeof industries[number];
const COMPACT_QUERY = "(max-width: 800px), (hover: none), (pointer: coarse)";
function useMedia(query: string) {
  const subscribe = useCallback((changed: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", changed);
    return () => media.removeEventListener("change", changed);
  }, [query]);
  const snapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, snapshot, () => false);
}

function IndustryArticle({ item, locale }: { item: Industry; locale: Locale }) {
  const [title, summary] = item.copy[locale];
  const [context, applications] = industryDetails[item.id][locale];
  const reading = industryReading[locale];
  return <>
    <div className="industry-reading-grid">
      <div className="industry-reading-photo"><Image src={`/ics/industries/${item.id}.webp`} alt={title} fill sizes="(max-width: 800px) 100vw, 42vw" /></div>
      <div className="industry-reading-copy"><p className="industry-reading-lead">{summary}</p><p>{context}</p><h3>{reading.applications}</h3><ul>{applications.map((application) => <li key={application}>{application}</li>)}</ul></div>
      <div className="industry-reading-method"><h3>{reading.method}</h3><p>{reading.methodText}</p><p>{reading.setupText}</p></div>
    </div>
  </>;
}

function DesktopIndustryDetail({ item, locale, column, columns }: { item: Industry; locale: Locale; column: number; columns: number }) {
  const detailRef = useRef<HTMLDivElement>(null);
  const [title, summary] = item.copy[locale];
  const [context, applications] = industryDetails[item.id][locale];
  const remaining = Array.from({ length: columns }, (_, index) => index + 1).filter((position) => position !== column);

  useEffect(() => {
    if (!detailRef.current || document.documentElement.dataset.input === "keyboard" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = gsap.context(() => {
      gsap.from(".industry-desktop-part", { opacity: 0, y: 10, duration: .24, stagger: .025, ease: "power3.out" });
    }, detailRef);
    return () => animation.revert();
  }, [item.id, columns]);

  return <div ref={detailRef} id="industry-detail" className="industry-desktop-detail" role="region" aria-labelledby={`industry-trigger-${item.id}`} data-photo-column={column} style={{ "--photo-column": column, "--context-column": remaining[0], "--examples-column": remaining[1] ?? remaining[0] } as CSSProperties}>
    <figure className="industry-desktop-photo industry-desktop-part">
      <div className="industry-reading-photo"><Image src={`/ics/industries/${item.id}.webp`} alt={title} fill sizes="(max-width: 1100px) 44vw, 28vw" /></div>
      <figcaption>{summary}</figcaption>
    </figure>
    <div className="industry-desktop-context industry-desktop-part"><p>{context}</p></div>
    <div className="industry-desktop-examples industry-desktop-part"><h3>{industryReading[locale].applications}</h3><ul>{applications.map((application) => <li key={application}>{application}</li>)}</ul></div>
  </div>;
}

export default function ApplicationsStory({ locale, onModalChange }: { locale: Locale; onModalChange?: (open: boolean) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [preview, setPreview] = useState({ index: 0, visible: false });
  const previewRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const selectionAnchor = useRef<{ trigger: HTMLButtonElement; top: number } | null>(null);
  const hoverAllowed = useRef(false);
  const positioned = useRef(false);
  const moveX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const moveY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const compact = useMedia(COMPACT_QUERY);
  const wide = useMedia("(min-width: 1101px)");
  const columns = wide ? 3 : 2;
  const copy = translations[locale];
  const ui = industryInterface[locale];
  const reading = industryReading[locale];
  const current = selected === null ? null : industries[selected];

  useLayoutEffect(() => {
    const anchor = selectionAnchor.current;
    selectionAnchor.current = null;
    if (compact || !anchor?.trigger.isConnected) return;
    const displacement = anchor.trigger.getBoundingClientRect().top - anchor.top;
    if (Math.abs(displacement) > .5) {
      scrollToPosition(window.scrollY + displacement, { immediate: true });
    }
  }, [selected, compact]);

  const closeDetails = useCallback(() => {
    selectionAnchor.current = null;
    setSelected(null);
    const trigger = triggerRef.current;
    trigger?.focus({ preventScroll: true });
    if (!compact && trigger && trigger.getBoundingClientRect().top < 0) {
      scrollToPosition(window.scrollY + trigger.getBoundingClientRect().top - 64, { duration: .4 });
    }
  }, [compact]);

  useEffect(() => {
    const element = previewRef.current;
    if (!element) return;
    const media = window.matchMedia("(min-width: 801px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const hide = () => {
      positioned.current = false;
      setPreview((previous) => previous.visible ? { ...previous, visible: false } : previous);
    };
    const sync = () => { hoverAllowed.current = media.matches; hide(); };
    hoverAllowed.current = media.matches;
    moveX.current = gsap.quickTo(element, "x", { duration: .34, ease: "power3.out" });
    moveY.current = gsap.quickTo(element, "y", { duration: .34, ease: "power3.out" });
    media.addEventListener("change", sync);
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("resize", hide, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("keydown", hide);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("scroll", hide);
      window.removeEventListener("resize", hide);
      window.removeEventListener("blur", hide);
      document.removeEventListener("keydown", hide);
      moveX.current?.tween.kill();
      moveY.current?.tween.kill();
      moveX.current = moveY.current = null;
    };
  }, []);

  function hidePreview() {
    positioned.current = false;
    setPreview((previous) => previous.visible ? { ...previous, visible: false } : previous);
  }
  function followPointer(event: PointerEvent<HTMLButtonElement>, index: number) {
    if (!hoverAllowed.current || event.pointerType === "touch" || selected === index) return;
    const element = previewRef.current;
    if (!element) return;
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const viewportWidth = document.documentElement.clientWidth;
    const trigger = event.currentTarget.getBoundingClientRect();
    const right = trigger.right + width + 24 <= viewportWidth - 12;
    const left = trigger.left - width - 24 >= 12;
    const desiredX = right ? trigger.right + 24 + (event.clientX - trigger.left) * .14
      : left ? trigger.left - width - 24 - (trigger.right - event.clientX) * .14
        : event.clientX + width + 28 < viewportWidth ? event.clientX + 28 : event.clientX - width - 28;
    const x = Math.max(12, Math.min(desiredX, viewportWidth - width - 12));
    const y = Math.max(12, Math.min(event.clientY - height * .4, window.innerHeight - height - 12));
    if (!positioned.current) {
      moveX.current?.tween.pause();
      moveY.current?.tween.pause();
      gsap.set(element, { x, y });
      positioned.current = true;
    } else {
      moveX.current?.(x);
      moveY.current?.(y);
    }
  }
  function revealPreview(event: PointerEvent<HTMLButtonElement>, index: number) {
    if (!hoverAllowed.current || event.pointerType === "touch" || selected === index) return;
    followPointer(event, index);
    setPreview((previous) => previous.visible && previous.index === index ? previous : { index, visible: true });
  }

  return (
    <section id="applications" className="applications-section applications-story section-pad" aria-labelledby="applications-heading" onKeyDown={(event) => {
      if (event.key === "Escape" && selected !== null && !compact) closeDetails();
    }}>
      <div className="application-content">
        <div className="industry-intro"><h2 id="applications-heading">{copy.applicationsTitle[0]}</h2><p><span className="industry-hint--pointer">{ui.pointerHint}</span><span className="industry-hint--touch">{ui.touchHint}</span></p></div>
        <ul className="industry-list" style={{ overflowAnchor: "none" }}>
          {industries.map((item, index) => {
            const open = selected === index;
            const endOfRow = (index + 1) % columns === 0 || index === industries.length - 1;
            const showArticle = !compact && current && selected !== null && endOfRow && Math.floor(index / columns) === Math.floor(selected / columns);
            return <Fragment key={item.id}>
              <li className="industry-item">
                <button id={`industry-trigger-${item.id}`} type="button" className="industry-choice roll-trigger" aria-expanded={open} aria-controls="industry-detail" aria-haspopup={compact ? "dialog" : undefined} data-preview={preview.visible && preview.index === index}
                  onPointerEnter={(event) => revealPreview(event, index)} onPointerMove={(event) => preview.visible ? followPointer(event, index) : revealPreview(event, index)} onPointerLeave={hidePreview} onFocus={hidePreview}
                  onClick={(event) => {
                    const trigger = event.currentTarget;
                    triggerRef.current = trigger;
                    hidePreview();
                    if (open) {
                      closeDetails();
                      return;
                    }
                    // Moving an expanded panel from an earlier row removes height
                    // above this button. Preserve its exact viewport position.
                    selectionAnchor.current = !compact && selected !== null && Math.floor(selected / columns) < Math.floor(index / columns)
                      ? { trigger, top: trigger.getBoundingClientRect().top }
                      : null;
                    setSelected(index);
                  }}>
                  <RollingText>{item.copy[locale][0]}</RollingText><svg className="industry-disclosure" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M4 10h12" /><path className="industry-disclosure-vertical" d="M10 4v12" /></svg>
                </button>
              </li>
              {showArticle && <li className="industry-expanded"><DesktopIndustryDetail key={current.id} item={current} locale={locale} column={selected! % columns + 1} columns={columns} /></li>}
            </Fragment>;
          })}
        </ul>
        {!current && <div id="industry-detail" hidden />}
      </div>
      {compact && current && <IndustrySheet title={current.copy[locale][0]} closeLabel={reading.close} dragLabel={reading.drag} returnFocusRef={triggerRef} onClose={closeDetails} onModalChange={onModalChange}><IndustryArticle item={current} locale={locale} /></IndustrySheet>}
      <div ref={previewRef} className="industry-preview" data-visible={preview.visible} aria-hidden="true"><div className="industry-preview-reveal">{industries.map((item, index) => <figure className="industry-preview-sheet" key={item.id} data-active={preview.index === index}><div className="industry-preview-photo"><Image src={`/ics/industries/${item.id}.webp`} alt="" fill sizes="380px" loading="eager" /></div><figcaption>{item.copy[locale][1]}</figcaption></figure>)}</div></div>
    </section>
  );
}
