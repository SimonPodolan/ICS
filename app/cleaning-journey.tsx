"use client";

import ButtonPrimary from "./button-primary";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "./content";
import { journeyCopy } from "./journey-content";
import { scrollToPosition } from "./smooth-scroll";
import "./cleaning-journey.css";

gsap.registerPlugin(ScrollTrigger);
// Mobile browser chrome changes height without changing the page layout.
ScrollTrigger.config({ ignoreMobileResize: true });

export default function CleaningJourney({ locale }: { locale: Locale }) {
  const [step, setStep] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const rootRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const currentStep = useRef(0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const select = gsap.utils.selector(root);
      const scene = root.querySelector<HTMLElement>(".journey-scene")!;
      root.dataset.scroll = "true";
      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: "none" },
        onUpdate: () => {
          const progress = timeline.progress();
          const active = progress < .34 ? 0 : progress < .67 ? 1 : 2;
          if (active !== currentStep.current) { currentStep.current = active; setStep(active); }
        },
      });
      timelineRef.current = timeline;
      gsap.set(select(".diagram-cold, .diagram-gas, .gas-label, .dirt-label, .impact-flash"), { opacity: 0 });
      gsap.set(select(".diagram-cold"), { scale: .8, transformOrigin: "center" });
      gsap.set(select(".diagram-gas"), { y: 42 });
      gsap.set(select(".journey-progress"), { scaleX: 0, transformOrigin: "left" });
      timeline
        .fromTo(select(".diagram-pellets"), { x: -70, y: -84, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: .72 }, .04)
        .to(select(".diagram-pellets"), { x: 50, y: 65, scale: .5, opacity: .25, transformOrigin: "center", duration: .58 }, .76)
        .fromTo(select(".impact-flash"), { scale: .9 }, { scale: 1.08, opacity: .8, transformOrigin: "center", duration: .2 }, .82)
        .to(select(".impact-flash"), { opacity: 0, duration: .2 }, 1.02)
        .to(select(".diagram-cold"), { scale: 1, opacity: 1, duration: .5 }, 1)
        .to(select(".dirt-a"), { x: -4, y: -4, rotation: -2, transformOrigin: "center", duration: .4 }, 1.22)
        .to(select(".dirt-b"), { y: -8, rotation: 1, transformOrigin: "center", duration: .4 }, 1.27)
        .to(select(".dirt-c"), { x: 5, y: -3, rotation: 2, transformOrigin: "center", duration: .4 }, 1.32)
        .to(select(".diagram-pellets"), { x: 65, y: 95, scale: .3, opacity: 0, duration: .45 }, 1.85)
        .to(select(".diagram-cold"), { scale: 1.08, opacity: 0, duration: .4 }, 1.9)
        .to(select(".diagram-gas"), { y: 0, opacity: 1, duration: .65 }, 2)
        .to(select(".dirt-a"), { x: 355, y: -58, scale: .22, rotation: 18, opacity: .7, duration: .6 }, 2)
        .to(select(".dirt-b"), { x: 218, y: -56, scale: .23, rotation: -14, opacity: .7, duration: .6 }, 2.08)
        .to(select(".dirt-c"), { x: 97, y: -39, scale: .25, rotation: 25, opacity: .7, duration: .6 }, 2.16)
        .to(select(".gas-label, .dirt-label"), { opacity: 1, duration: .25 }, 2.4)
        .to(select(".ice-label"), { opacity: 0, duration: .25 }, 1.9)
        .to(select(".journey-progress"), { scaleX: 1, duration: 3 }, 0);
      const trigger = ScrollTrigger.create({
        trigger: root,
        animation: timeline,
        start: () => `top ${getComputedStyle(scene).top}`,
        end: () => `+=${root.offsetHeight - scene.offsetHeight}`,
        scrub: .25,
        // All illustration coordinates are fixed SVG units. Invalidating them
        // would capture mid-animation transforms as new starting values.
        invalidateOnRefresh: false,
        onRefresh: (self) => {
          // CSS owns the sticky position; synchronize the illustration after layout changes.
          self.getTween()?.progress(1);
          timeline.progress(self.progress);
          const progress = self.progress;
          const active = progress < .34 ? 0 : progress < .67 ? 1 : 2;
          currentStep.current = active;
          setStep(active);
        },
        onLeave: (self) => { self.getTween()?.progress(1); timeline.progress(1); },
        onLeaveBack: (self) => { self.getTween()?.progress(1); timeline.progress(0); },
        onUpdate: (self) => {
          if (document.documentElement.dataset.input === "keyboard") {
            self.getTween()?.progress(1);
            timeline.progress(self.progress);
          }
        },
      });
      triggerRef.current = trigger;
      // Text wrapping/font changes can alter the natural scene height. Only
      // refresh for a real content resize, never for an address-bar animation.
      let refreshFrame = 0;
      let measuredHeight = -1;
      const measureScene = new ResizeObserver(() => {
        const height = scene.offsetHeight;
        if (height === measuredHeight) return;
        measuredHeight = height;
        root.style.setProperty("--journey-content-height", `${height}px`);
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => trigger.refresh());
      });
      measureScene.observe(scene);
      return () => {
        cancelAnimationFrame(refreshFrame);
        measureScene.disconnect();
        root.style.removeProperty("--journey-content-height");
        delete root.dataset.scroll;
        triggerRef.current = null;
        timelineRef.current = null;
      };
    }, root);
    // Page motion refreshes font/layout changes after scrolling has settled.
    return () => media.revert();
  }, []);

  function selectStep(index: number, keyboard: boolean) {
    document.documentElement.dataset.input = keyboard ? "keyboard" : "pointer";
    setAnnouncement(`${journeyCopy[locale].steps[index].title}. ${journeyCopy[locale].steps[index].text}`);
    const trigger = triggerRef.current;
    const timeline = timelineRef.current;
    if (!trigger || !timeline) {
      currentStep.current = index;
      setStep(index);
      return;
    }
    const progress = [.23, .55, .94][index];
    const immediate = keyboard || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scrollToPosition(trigger.start + (trigger.end - trigger.start) * progress, { immediate, duration: .45 });
    if (immediate) {
      trigger.update();
      trigger.getTween()?.progress(1);
      timeline.progress(progress);
    }
  }
  const copy = journeyCopy[locale];
  return <section ref={rootRef} id="introduction" className="cleaning-journey" aria-labelledby="journey-title">
    <p className="journey-announcement" role="status">{announcement}</p>
    <div className="journey-scene section-pad">
    <div className="journey-copy">
      <h2 id="journey-title">{copy.title[0]}<br /><span>{copy.title[1]}</span></h2>
      <div id="journey-explanation" className="journey-explanation" aria-live="off">{copy.steps.map((item, i) => <div id={`journey-panel-${i}`} key={i} className="journey-text-panel" data-active={step === i} aria-hidden={step !== i} inert={step !== i}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
      <ButtonPrimary className="journey-next" aria-controls="journey-explanation" onClick={(event) => selectStep((step + 1) % 3, event.detail === 0)}>{step === 2 ? copy.replay : copy.next}</ButtonPrimary>
      <div className="journey-static-steps">{copy.steps.map((item) => <div key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
    </div>
    <div className="journey-experiment" data-step={step}>
      <div className="experiment-temperature" aria-label={copy.temperatureLabel}>−78.5<span>°C</span></div>
      <svg className="cleaning-diagram" viewBox="0 0 650 350" role="img" aria-label={`${copy.steps[step].title}: ${copy.steps[step].text}`}>
        <defs><pattern id="surface-grain" width="9" height="9" patternUnits="userSpaceOnUse"><path d="m0 9 9-9" stroke="#cad2c2" strokeWidth=".65" /></pattern></defs>
        <g className="diagram-surface"><path d="M105 249H588L558 280H75Z" fill="#e0e5d9" /><path d="M75 280h483v24H75Z" fill="url(#surface-grain)" /><path d="M558 280l30-31v24l-30 31Z" fill="#d3dccb" /><path d="M75 280h483l30-31" fill="none" stroke="#aab79f" /></g>
        <g className="diagram-dirt" fill="#7c8873" stroke="#fff" strokeWidth="1.5">
          <path className="dirt-piece dirt-a" d="m105 246 30-22 36 4 34-7 31 10 19 15-24 17h-79l-44 11-33 3Z" />
          <path className="dirt-piece dirt-b" d="m236 230 31-10 25 7 35-6 29 11 30-4 18 18-25 29h-70l-29-10-49-2 24-17Z" />
          <path className="dirt-piece dirt-c" d="m386 228 36-9 27 7 38-4 33 8 30-3 38 19-30 31-39-10-41 5-35-8-37 10-27 1 25-29Z" />
        </g>
        <g className="diagram-pellets" fill="#65a64b">
          <rect x="196" y="60" width="11" height="27" rx="5" transform="rotate(-35 201 73)" />
          <rect x="253" y="80" width="10" height="24" rx="5" transform="rotate(-35 258 92)" />
          <rect x="235" y="126" width="13" height="30" rx="6" transform="rotate(-35 241 141)" />
          <rect x="300" y="130" width="10" height="24" rx="5" transform="rotate(-35 305 142)" />
          <rect x="282" y="180" width="12" height="27" rx="5" transform="rotate(-35 288 193)" />
          <rect x="344" y="190" width="10" height="24" rx="5" transform="rotate(-35 349 202)" />
        </g>
        <g className="impact-flash" fill="none" stroke="#6d9c60" strokeWidth="1.5"><path d="m290 238-8-12m24 10 2-17m44 17 9-12m-35 17 1-16" /></g>
        <g className="diagram-cold" fill="none" stroke="#6d9c60" strokeWidth="1"><ellipse cx="335" cy="253" rx="111" ry="27" /><ellipse cx="335" cy="253" rx="145" ry="36" opacity=".4" /><path d="m272 238 11 11-7 15m52-36 7 17-8 17m48-25-8 12 12 12" /></g>
        <g className="diagram-gas" fill="none" stroke="#6c9a5d" strokeWidth="1.4">
          <g className="gas-a"><circle cx="305" cy="163" r="9" /><circle cx="322" cy="163" r="6" /><circle cx="288" cy="163" r="6" /></g>
          <g className="gas-b"><circle cx="375" cy="114" r="9" /><circle cx="392" cy="114" r="6" /><circle cx="358" cy="114" r="6" /></g>
          <g className="gas-c"><circle cx="445" cy="172" r="9" /><circle cx="462" cy="172" r="6" /><circle cx="428" cy="172" r="6" /></g>
        </g>
        <g className="diagram-labels" fontSize="11" fill="#69765e"><path className="ice-label" d="M160 90h-45" stroke="#a4b198" /><text className="ice-label" x="100" y="93" textAnchor="end">{copy.diagramLabels.ice}</text><path d="M492 320h45" stroke="#a4b198" /><text x="481" y="324" textAnchor="end">{copy.diagramLabels.surface}</text></g>
        <g className="gas-label" fontSize="11" fill="#537c41"><text x="456" y="100">{copy.diagramLabels.gas}</text></g>
        <g className="dirt-label" fontSize="11" fill="#69765e"><text x="520" y="168" textAnchor="middle">{copy.diagramLabels.dirt}</text></g>
      </svg>
      <div className="journey-steps" role="group" aria-label={copy.intro}><span className="journey-progress" aria-hidden="true" />{copy.steps.map((item, i) => <button key={i} aria-pressed={step === i} aria-controls={`journey-panel-${i}`} onClick={(event) => selectStep(i, event.detail === 0)}><span className="journey-step-dot" aria-hidden="true" />{item.title}</button>)}</div>
    </div>
    </div>
  </section>;
}
