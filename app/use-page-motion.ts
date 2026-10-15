"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Locale } from "./content";

type Entrance = { animation: gsap.core.Tween; elements: HTMLElement[] };

/** Page-level motion only; the cleaning walkthrough and map own their timelines. */
export function usePageMotion(ref: RefObject<HTMLElement | null>, locale: Locale) {
  const entered = useRef(new Set<string>());
  const keyboardNavigation = useRef(false);
  const [resumeRevision, setResumeRevision] = useState(0);

  useLayoutEffect(() => {
    const resumeForPointer = (event: MouseEvent | WheelEvent) => {
      if (event instanceof WheelEvent && event.ctrlKey) return;
      if (!(event instanceof WheelEvent) && event.detail === 0) return;
      const wasKeyboard = keyboardNavigation.current || document.documentElement.dataset.input === "keyboard";
      document.documentElement.dataset.input = "pointer";
      if (!wasKeyboard) return;
      keyboardNavigation.current = false;
      setResumeRevision((revision) => revision + 1);
    };
    // Resume after the target's click handler so interaction takes priority over
    // decorative motion. These listeners also stay active in keyboard mode.
    document.addEventListener("click", resumeForPointer, { passive: true });
    document.addEventListener("wheel", resumeForPointer, { capture: true, passive: true });
    return () => {
      document.removeEventListener("click", resumeForPointer);
      document.removeEventListener("wheel", resumeForPointer, true);
    };
  }, []);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || keyboardNavigation.current || document.documentElement.dataset.input === "keyboard") return;

    gsap.registerPlugin(ScrollTrigger);
    // matchMedia creates a scoped GSAP context and restores original styles on revert.
    const media = gsap.matchMedia(root);
    const entrances: Entrance[] = [];
    let disposed = false;
    let refreshFrame = 0;

    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (keyboardNavigation.current) return;

      const enter = (
        key: string,
        triggerSelector: string,
        targetSelector: string,
        from: gsap.TweenVars = {},
      ) => {
        if (entered.current.has(key)) return;
        const trigger = root.querySelector<HTMLElement>(triggerSelector);
        const elements = Array.from(root.querySelectorAll<HTMLElement>(targetSelector));
        if (!trigger || !elements.length) return;

        const animation = gsap.from(elements, {
          y: 0,
          opacity: 0.85,
          duration: 0.28,
          stagger: 0.065,
          ease: "power3.out",
          ...from,
          // The server-rendered page stays readable until its entrance starts.
          immediateRender: false,
          clearProps: "transform,opacity",
          onStart: () => { entered.current.add(key); },
          scrollTrigger: {
            trigger,
            start: "top 88%",
            once: true,
            toggleActions: "play none none none",
          },
        });
        entrances.push({ animation, elements });
      };

      enter("hero", ".hero", ".hero-copy > h1", { y: 0, duration: 0.4, stagger: 0 });
      enter("application-copy", ".industry-intro", ".industry-intro > h2, .industry-intro > p");

      return () => { entrances.length = 0; };
    });

    const stopForKeyboard = () => {
      if (keyboardNavigation.current) return;
      keyboardNavigation.current = true;
      media.revert();
    };

    const finishFocusedEntrance = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      // Keyboard/programmatic focus immediately restores the static page.
      if (target.matches(":focus-visible")) {
        stopForKeyboard();
        return;
      }
      // A pointer can also focus a service button during its brief row entrance.
      for (const { animation, elements } of entrances) {
        if (!elements.some((element) => element.contains(target))) continue;
        animation.progress(1);
        animation.scrollTrigger?.kill();
        animation.kill();
      }
    };

    document.addEventListener("keydown", stopForKeyboard, true);
    root.addEventListener("focusin", finishFocusedEntrance);

    const refreshWhenIdle = () => {
      if (disposed || keyboardNavigation.current) return;
      // A refresh can reset scroll geometry while a walkthrough button is moving
      // the page. Wait for that movement (including Lenis inertia) to finish.
      if (ScrollTrigger.isScrolling()) {
        refreshFrame = requestAnimationFrame(refreshWhenIdle);
        return;
      }
      ScrollTrigger.refresh();
    };
    const refresh = () => {
      if (disposed || keyboardNavigation.current) return;
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(refreshWhenIdle);
    };
    // Allow sibling scroll scenes to finish mounting; fonts/localization can reflow copy.
    refreshFrame = requestAnimationFrame(refresh);
    void document.fonts.ready.then(refresh);
    const sizes = new WeakMap<Element, { width: number; height: number }>();
    const layoutResize = new ResizeObserver((entries) => {
      let changed = false;
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const previous = sizes.get(entry.target);
        if (!previous || Math.abs(previous.width - width) > 0.5 || Math.abs(previous.height - height) > 0.5) {
          sizes.set(entry.target, { width, height });
          changed = true;
        }
      }
      if (changed) refresh();
    });
    // Observe changing content dimensions without watching the whole page.
    root.querySelectorAll(".services-section, .technology-section, .system-stage")
      .forEach((element) => layoutResize.observe(element));

    return () => {
      disposed = true;
      cancelAnimationFrame(refreshFrame);
      layoutResize.disconnect();
      document.removeEventListener("keydown", stopForKeyboard, true);
      root.removeEventListener("focusin", finishFocusedEntrance);
      media.revert();
    };
  }, [ref, locale, resumeRevision]);
}
