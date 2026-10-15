import type { ReactNode } from "react";

type IconName = "arrow" | "diagonal" | "play" | "globe" | "chevron" | "close" | "menu" | "shield" | "leaf" | "clock" | "pin" | "plus" | "pause";
export default function Icon({ name = "arrow" }: { name?: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
    diagonal: <path d="M6 18 18 6M6 6h12v12" />,
    play: <path d="m9 5 11 7-11 7Z" />,
    globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M4 8h16M4 16h16" />,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" /><path d="m8 12 3 3 5-6" /></>,
    leaf: <><path d="M20 4c-11-2-17 4-15 11 7 5 16 0 15-11Z" /><path d="m4 21 11-11" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
    pause: <path d="M9 5v14M15 5v14" />,
    plus: <path d="M5 12h14M12 5v14" />,
  };
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

