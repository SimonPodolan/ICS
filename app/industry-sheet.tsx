"use client";

import { useCallback, useLayoutEffect, useRef, type PointerEvent, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

type IndustrySheetProps = {
  title: string;
  closeLabel: string;
  dragLabel: string;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onModalChange?: (open: boolean) => void;
  children: ReactNode;
};
type Drag = { id: number; startX: number; startY: number; y: number; time: number; velocity: number; delta: number; offset: number };

function shouldAnimate() {
  return document.documentElement.dataset.input !== "keyboard" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function IndustrySheet({ title, closeLabel, dragLabel, returnFocusRef, onClose, onModalChange, children }: IndustrySheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dragRef = useRef<Drag | null>(null);
  const closingRef = useRef(false);
  const callbacksRef = useRef({ onClose, onModalChange });

  useLayoutEffect(() => {
    callbacksRef.current = { onClose, onModalChange };
  }, [onClose, onModalChange]);

  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const panel = panelRef.current;
    if (!panel || !shouldAnimate()) { callbacksRef.current.onClose(); return; }
    gsap.killTweensOf(panel);
    gsap.to(panel, { y: panel.offsetHeight + 24, duration: .24, ease: "power3.out", onComplete: () => callbacksRef.current.onClose() });
  }, []);

  const settleDrag = useCallback((delta: number, velocity: number, cancelled = false) => {
    const panel = panelRef.current;
    if (!panel || closingRef.current) return;
    if (!cancelled && (delta > Math.min(110, panel.offsetHeight * .16) || (delta > 28 && velocity > .55))) {
      requestClose();
    } else {
      gsap.to(panel, { y: 0, duration: shouldAnimate() ? .25 : 0, ease: "power3.out", overwrite: true });
    }
  }, [requestClose]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    const scroller = scrollRef.current;
    if (!dialog || !panel || !scroller) return;
    const returnFocus = returnFocusRef.current;
    closingRef.current = false;
    dragRef.current = null;
    const root = document.documentElement;
    const body = document.body;
    const scrollPosition = { left: window.scrollX, top: window.scrollY };
    const lockedElements = [root, body].map((element) => ({
      element,
      overflow: element.style.getPropertyValue("overflow"),
      overflowPriority: element.style.getPropertyPriority("overflow"),
      overscroll: element.style.getPropertyValue("overscroll-behavior"),
      overscrollPriority: element.style.getPropertyPriority("overscroll-behavior"),
    }));
    const restoreScroll = () => {
      if (Math.abs(window.scrollY - scrollPosition.top) > 1 || Math.abs(window.scrollX - scrollPosition.left) > 1) {
        window.scrollTo({ ...scrollPosition, behavior: "instant" });
      }
    };

    // Keep the panel's reading height stable while browser toolbars settle,
    // but always anchor its wrapper to the current visible viewport bottom.
    const viewport = window.visualViewport;
    let viewportWidth = window.innerWidth;
    const sizeViewport = (resizePanel = false) => {
      const height = viewport?.height ?? window.innerHeight;
      dialog.style.setProperty("--industry-sheet-height", `${height}px`);
      dialog.style.setProperty("--industry-sheet-top", `${viewport?.offsetTop ?? 0}px`);
      if (resizePanel) dialog.style.setProperty("--industry-panel-height", `${Math.min(height * .92, 960)}px`);
    };
    const resizeViewport = () => {
      const widthChanged = Math.abs(window.innerWidth - viewportWidth) >= 2;
      viewportWidth = window.innerWidth;
      sizeViewport(widthChanged);
    };
    sizeViewport(true);
    for (const { element } of lockedElements) {
      element.style.setProperty("overflow", "hidden");
      element.style.setProperty("overscroll-behavior", "none");
    }
    const modalChange = callbacksRef.current.onModalChange;
    modalChange?.(true);
    // Focus the stationary wrapper, not a control moving up from off-screen.
    // Set the native attribute explicitly: React only applies autoFocus to form controls.
    dialog.setAttribute("autofocus", "");
    dialog.showModal();
    dialog.scrollTop = 0;
    scroller.scrollTop = 0;
    dialog.focus({ preventScroll: true });
    restoreScroll();
    const animate = shouldAnimate();
    const entrance = gsap.context(() => {
      // Use pixel offsets once measured so dragging can interrupt the entrance.
      gsap.fromTo(panel, { yPercent: 0, y: animate ? panel.offsetHeight + 24 : 0 }, {
        y: 0,
        duration: animate ? .28 : 0,
        ease: "power3.out",
        onComplete: () => {
          if (!closingRef.current && dialog.open && document.activeElement === dialog) {
            closeButtonRef.current?.focus({ preventScroll: true });
          }
        },
      });
    });
    window.addEventListener("resize", resizeViewport, { passive: true });
    viewport?.addEventListener("resize", resizeViewport, { passive: true });
    viewport?.addEventListener("scroll", resizeViewport, { passive: true });

    // Downward gestures on content dismiss only when its own scroll is at the top.
    // Upward gestures and gestures started partway down remain native scrolling.
    let touch: (Drag & { dragging: boolean }) | null = null;
    const startTouch = (event: TouchEvent) => {
      if (closingRef.current || touch || event.touches.length !== 1 || scroller.scrollTop > 1) return;
      const point = event.touches[0];
      touch = { id: point.identifier, startX: point.clientX, startY: point.clientY, y: point.clientY, time: event.timeStamp, velocity: 0, delta: 0, offset: 0, dragging: false };
    };
    const moveTouch = (event: TouchEvent) => {
      if (!touch) return;
      if (event.touches.length !== 1) {
        if (touch.dragging) settleDrag(touch.delta, 0, true);
        touch = null;
        return;
      }
      const point = event.touches[0];
      if (point.identifier !== touch.id || !event.cancelable) {
        if (touch.dragging) settleDrag(touch.delta, 0, true);
        touch = null;
        return;
      }
      const delta = point.clientY - touch.startY;
      const horizontal = Math.abs(point.clientX - touch.startX);
      if (!touch.dragging && (delta < -7 || horizontal > Math.max(10, Math.abs(delta)) || scroller.scrollTop > 1)) { touch = null; return; }
      if (!touch.dragging && delta < 7) return;
      if (!touch.dragging) {
        touch.offset = Number(gsap.getProperty(panel, "y")) || 0;
        gsap.killTweensOf(panel);
      }
      touch.dragging = true;
      event.preventDefault();
      touch.velocity = (point.clientY - touch.y) / Math.max(1, event.timeStamp - touch.time);
      touch.y = point.clientY;
      touch.time = event.timeStamp;
      touch.delta = Math.max(0, delta);
      gsap.set(panel, { y: touch.offset + touch.delta });
    };
    const endTouch = (event: TouchEvent) => {
      if (touch?.dragging) settleDrag(touch.delta, event.timeStamp - touch.time < 120 ? touch.velocity : 0);
      touch = null;
    };
    const cancelTouch = () => {
      if (touch?.dragging) settleDrag(touch.delta, 0, true);
      touch = null;
    };
    scroller.addEventListener("touchstart", startTouch, { passive: true });
    scroller.addEventListener("touchmove", moveTouch, { passive: false });
    scroller.addEventListener("touchend", endTouch, { passive: true });
    scroller.addEventListener("touchcancel", cancelTouch, { passive: true });
    return () => {
      gsap.killTweensOf(panel);
      scroller.removeEventListener("touchstart", startTouch);
      scroller.removeEventListener("touchmove", moveTouch);
      scroller.removeEventListener("touchend", endTouch);
      scroller.removeEventListener("touchcancel", cancelTouch);
      window.removeEventListener("resize", resizeViewport);
      viewport?.removeEventListener("resize", resizeViewport);
      viewport?.removeEventListener("scroll", resizeViewport);
      dialog.close();
      // Restore the CSS starting pose too; killing a tween leaves its transform behind.
      entrance.revert();
      for (const { element, overflow, overflowPriority, overscroll, overscrollPriority } of lockedElements) {
        if (overflow) element.style.setProperty("overflow", overflow, overflowPriority);
        else element.style.removeProperty("overflow");
        if (overscroll) element.style.setProperty("overscroll-behavior", overscroll, overscrollPriority);
        else element.style.removeProperty("overscroll-behavior");
      }
      modalChange?.(false);
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
      restoreScroll();
    };
  }, [returnFocusRef, settleDrag]);

  function startPointer(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || !event.isPrimary || dragRef.current || closingRef.current || (event.target instanceof Element && event.target.closest("button"))) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
    gsap.killTweensOf(panelRef.current);
    dragRef.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, y: event.clientY, time: event.timeStamp, velocity: 0, delta: 0, offset: Number(gsap.getProperty(panelRef.current, "y")) || 0 };
  }
  function movePointer(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId || !panelRef.current) return;
    drag.velocity = (event.clientY - drag.y) / Math.max(1, event.timeStamp - drag.time);
    drag.y = event.clientY;
    drag.time = event.timeStamp;
    drag.delta = Math.max(0, event.clientY - drag.startY);
    gsap.set(panelRef.current, { y: drag.offset + drag.delta });
  }
  function endPointer(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    dragRef.current = null;
    settleDrag(drag.delta, event.timeStamp - drag.time < 120 ? drag.velocity : 0, event.type !== "pointerup");
  }

  return createPortal(
    <dialog ref={dialogRef} id="industry-detail" className="industry-sheet" aria-labelledby="industry-detail-title" onCancel={(event) => { event.preventDefault(); requestClose(); }} onClick={(event) => { if (event.target === event.currentTarget) requestClose(); }} data-lenis-prevent>
      <div ref={panelRef} className="industry-sheet-panel">
        <div className="industry-sheet-header" onPointerDown={startPointer} onPointerMove={movePointer} onPointerUp={endPointer} onPointerCancel={endPointer} onLostPointerCapture={endPointer}>
          <div className="industry-sheet-grip" aria-hidden="true"><span /></div>
          <div className="industry-detail-heading"><h2 id="industry-detail-title">{title}</h2><button ref={closeButtonRef} type="button" className="ui-action ui-action--secondary ui-action--icon" aria-label={closeLabel} onClick={requestClose}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg></button></div>
          <span className="rolling-text__accessible">{dragLabel}</span>
        </div>
        <div ref={scrollRef} className="industry-sheet-scroll" role="region" aria-label={title} tabIndex={0} data-lenis-prevent>{children}</div>
      </div>
    </dialog>, document.body,
  );
}
