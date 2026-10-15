import type { ReactNode } from "react";
import ResourceShell from "../resource-shell";
import "../resources.css";
export default function Layout({ children }: { children: ReactNode }) {
  return <ResourceShell>{children}</ResourceShell>;
}
