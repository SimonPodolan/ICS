import type { ReactNode } from "react";
import CatalogShell from "../catalog-shell";
import "../action-styles.css";
import "../catalog.css";
export default function Layout({ children }: { children: ReactNode }) { return <CatalogShell>{children}</CatalogShell>; }
