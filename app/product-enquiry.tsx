"use client";
import ButtonPrimary from "./button-primary";
import { useSiteUI } from "./site-ui";

export default function ProductEnquiry({ product, children }: { product?: string; children: string }) {
  const { openContact } = useSiteUI();
  return <ButtonPrimary icon="diagonal" onClick={() => openContact(product ? {
    name: "", email: "", company: "", interest: product,
    message: `I would like to know more about ${product}.`,
  } : undefined)}>{children}</ButtonPrimary>;
}
