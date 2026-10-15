"use client";
import { useEffect, useRef, type ReactNode } from "react";
import Icon from "./site-icon";

export default function Dialog({ title, closeLabel, onClose, children, wide = false }: { title: string; closeLabel: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={ref} className={`dialog ${wide ? "dialog-wide" : ""}`} aria-labelledby="dialog-heading" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="dialog-inner"><div className="dialog-heading"><h2 id="dialog-heading">{title}</h2><button className="ui-action ui-action--secondary ui-action--icon" aria-label={closeLabel} onClick={onClose}><Icon name="close" /></button></div>{children}</div>
  </dialog>;
}

