"use client";

import { useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

// Keep the smooth-scroll setup available for comparison; use browser scrolling for now.
const SMOOTH_SCROLL_ENABLED = false;
let activeLenis: Lenis | null = null;

/** Share the page's scroll owner with pointer-operated walkthrough controls. */
export function scrollToPosition(top: number, options: { immediate?: boolean; duration?: number } = {}): void {
  if (typeof window === "undefined" || !Number.isFinite(top)) return;
  const immediate = options.immediate === true
    || options.duration === 0
    || document.documentElement.dataset.input === "keyboard"
    || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (activeLenis) {
    if (activeLenis.isStopped) return;
    activeLenis.scrollTo(top, {
      immediate,
      duration: options.duration ?? 0.65,
      lerp: 0,
      easing: (progress) => 1 - Math.pow(1 - progress, 3),
    });
    return;
  }
  window.scrollTo({ top, behavior: immediate || !SMOOTH_SCROLL_ENABLED ? "instant" : "smooth" });
}

export function useSmoothScroll(disabled: boolean) {
  const instanceRef = useRef<Lenis | null>(null);
  const disabledRef = useRef(disabled);

  useLayoutEffect(() => {
    disabledRef.current = disabled;
    const instance = instanceRef.current;
    if (!instance) return;
    if (disabled) instance.stop();
    else {
      instance.start();
      instance.resize();
    }
  }, [disabled]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!SMOOTH_SCROLL_ENABLED) return;
    const media = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine) and (hover: hover)");
    let removeInstance = () => {};
    let syncFrame = 0;

    const configure = () => {
      removeInstance();
      removeInstance = () => {};
      if (!media.matches) return;

      const instance = new Lenis({
        autoRaf: false,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.14,
        anchors: false,
        stopInertiaOnNavigate: true,
        // Lenis checks this before its stopped state, so open dialogs scroll natively.
        prevent: (node) => node.matches("dialog, textarea, select, [data-lenis-prevent]"),
      });
      instanceRef.current = instance;
      activeLenis = instance;
      instance.on("scroll", ScrollTrigger.update);
      const tick = (seconds: number) => instance.raf(seconds * 1000);
      gsap.ticker.add(tick);
      if (disabledRef.current) instance.stop();

      removeInstance = () => {
        gsap.ticker.remove(tick);
        instance.off("scroll", ScrollTrigger.update);
        instance.destroy();
        if (instanceRef.current === instance) instanceRef.current = null;
        if (activeLenis === instance) activeLenis = null;
      };
    };

    const cancelInertia = () => {
      const instance = instanceRef.current;
      if (!instance) return;
      // stop/start resets the animation even when its target equals the native position.
      instance.stop();
      if (!disabledRef.current) instance.start();
    };
    const syncNativePosition = () => {
      // Stop before the next GSAP tick can overwrite a native hash/history jump.
      cancelInertia();
      cancelAnimationFrame(syncFrame);
      syncFrame = requestAnimationFrame(() => {
        instanceRef.current?.resize();
        ScrollTrigger.update();
      });
    };
    const onKeyDown = () => {
      if (disabledRef.current) return;
      cancelInertia();
      // Cancel a native smooth fallback too, then allow the key's normal browser action.
      window.scrollTo({ top: window.scrollY, behavior: "instant" });
      syncNativePosition();
    };
    const onFocus = () => {
      if (disabledRef.current) return;
      cancelInertia();
      instanceRef.current?.resize();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") cancelInertia();
    };
    const onAnchorClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== location.origin || destination.pathname !== location.pathname || destination.search !== location.search || !anchor.href.includes("#")) return;
      // Preserve the browser's hash, history and focus behavior; only discard old inertia.
      cancelInertia();
      syncNativePosition();
    };

    configure();
    media.addEventListener("change", configure);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("click", onAnchorClick, true);
    window.addEventListener("hashchange", syncNativePosition);
    window.addEventListener("popstate", syncNativePosition);

    return () => {
      cancelAnimationFrame(syncFrame);
      media.removeEventListener("change", configure);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("click", onAnchorClick, true);
      window.removeEventListener("hashchange", syncNativePosition);
      window.removeEventListener("popstate", syncNativePosition);
      removeInstance();
    };
  }, []);
}
