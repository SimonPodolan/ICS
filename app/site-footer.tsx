"use client";
import Image from "next/image";
import Link from "next/link";
import { translations } from "./translations";
import { journeyCopy } from "./journey-content";
import { useSiteUI } from "./site-ui";

export default function SiteFooter() {
 const { locale, openContact } = useSiteUI();
 const copy = translations[locale];
 const journey = journeyCopy[locale];
 return <footer className="footer section-pad"><div className="footer-top"><Link className="brand" href="/" aria-label="ICS — Ice Cleaning Systems"><Image src="/ics/logo.svg" alt="ICS Ice Cleaning Systems" width={175} height={40} /></Link><nav aria-label="Footer"><Link href="/products">{copy.footerLinks[0]}</Link><Link href="/#applications">{copy.footerLinks[1]}</Link><Link href="/#services">{copy.footerLinks[2]}</Link><button className="ui-action ui-action--secondary" onClick={() => openContact()}>{copy.footerLinks[3]}</button></nav><div className="footer-address"><a href="mailto:sales@ics-dryice.com">sales@ics-dryice.com</a><a href="tel:+421424261135">+421 42 426 11 35</a><p>Považská Bystrica, Slovakia</p></div></div><div className="footer-bottom"><span>© 2026 ICS ice cleaning systems</span><nav className="footer-resources" aria-label={copy.footerLinks[2]}><Link href="/downloads">{journey.resourceLinks[0]}</Link><Link href="/partners">{journey.resourceLinks[1]}</Link></nav><Link href="/privacy">{copy.privacy}</Link></div></footer>;
}
