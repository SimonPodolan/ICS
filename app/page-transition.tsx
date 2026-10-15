import { ViewTransition, type ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  return <ViewTransition default="none" enter="page-arrive" exit="page-leave">{children}</ViewTransition>;
}
