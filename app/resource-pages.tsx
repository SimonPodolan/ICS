"use client";
import ButtonPrimary from "./button-primary";
import Link from "next/link";
import { useSiteUI } from "./site-ui";
import Icon from "./site-icon";
import { resourceCopy } from "./resource-content";
import documents from "./download-documents.json";
import originalPolicy from "./privacy-original.json";

function Breadcrumb({ title }: { title: string }) {
  const { locale } = useSiteUI();
  return <nav className="resource-breadcrumb" aria-label={resourceCopy[locale].home}><Link href="/">{resourceCopy[locale].home}</Link><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>;
}
function PageTitle({ text }: { text: string }) {
  return <h1>{text.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h1>;
}
export function DownloadsPage() {
  const { locale, openContact } = useSiteUI();
  const t = resourceCopy[locale];
  return <>
    <header className="resource-intro section-pad"><Breadcrumb title={t.downloads} /><div className="resource-title-row"><PageTitle text={t.downloadTitle} /><p>{t.downloadIntro}</p></div></header>
    <div className="document-library section-pad">
      <nav className="resource-index" aria-label={t.downloads}>{t.groups.map((group, i) => <a key={group} href={`#documents-${i}`}>{group}<span>{String(documents.filter(d => d.group === i).length).padStart(2, "0")}</span></a>)}</nav>
      <div className="document-groups"><p className="resource-note">{t.filesNote}</p>{t.groups.map((group, i) => <section id={`documents-${i}`} key={group} className="document-group"><h2>{group}</h2><ul>{documents.filter(d => d.group === i).map(file => <li key={file.url}><a href={file.url} target="_blank" rel="noreferrer"><span lang="en">{file.title}</span><span className="document-meta">PDF · {new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(file.bytes / (file.bytes < 1048576 ? 1024 : 1048576))} {file.bytes < 1048576 ? "KB" : "MB"}<Icon name="diagonal" /></span></a></li>)}</ul></section>)}</div>
    </div>
    <section className="resource-outro section-pad"><h2>{t.needHelp}</h2><div><p>{t.helpText}</p><ButtonPrimary onClick={() => openContact()}>{t.contact}</ButtonPrimary></div></section>
  </>;
}
function PartnerDiagram({ labels }: { labels: string[] }) {
  return <div className="partner-diagram">
    <svg viewBox="0 0 720 340" fill="none" aria-hidden="true">
      <g className="diagram-orbits"><ellipse cx="360" cy="170" rx="302" ry="128" /><ellipse cx="360" cy="170" rx="302" ry="80" /><path d="M58 170h604M360 42v256" /><ellipse cx="360" cy="170" rx="175" ry="128" /></g>
      <path className="diagram-route" d="M130 170Q245 12 360 170T590 170" />
      <path className="diagram-route-secondary" d="M130 170Q245 328 360 170T590 170" />
      {[130,360,590].map(x => <g key={x}><circle cx={x} cy="170" r="38" className="diagram-node" /><circle cx={x} cy="170" r="4" className="diagram-point" /></g>)}
    </svg>
    <div className="diagram-labels">{labels.slice(0,3).map(label => <span key={label}>{label}</span>)}</div>
    <div className="diagram-caption"><span>{labels[3]}</span><span>{labels[4]}</span></div>
  </div>;
}
export function PartnersPage() {
  const { locale, openContact } = useSiteUI();
  const t = resourceCopy[locale];
  const enquire = () => openContact({ interest: "other", message: t.partnerMessage });
  return <>
    <header className="resource-intro partner-intro section-pad"><Breadcrumb title={t.partners} /><div className="resource-title-row"><PageTitle text={t.partnerTitle} /><div className="resource-intro-aside"><p>{t.partnerIntro}</p><ButtonPrimary onClick={enquire}>{t.partnerAction}</ButtonPrimary></div></div><PartnerDiagram labels={t.diagram} /></header>
    <section className="partner-support section-pad"><div className="resource-title-row"><h2>{t.partnerHeading}</h2><p>{t.partnerText}</p></div><div className="partner-benefits">{t.benefits.map(([title,text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="resource-outro partner-outro section-pad"><h2>{t.partnerEnd}</h2><div><p>{t.partnerEndText}</p><ButtonPrimary onClick={enquire}>{t.partnerAction}</ButtonPrimary></div></section>
  </>;
}
export function PrivacyPage() {
  const { locale } = useSiteUI();
  const t = resourceCopy[locale];
  return <>
    <header className="resource-intro privacy-intro section-pad"><Breadcrumb title={t.privacy} /><div className="resource-title-row"><PageTitle text={t.privacy} /><p>{t.privacyIntro}</p></div></header>
    <div className="privacy-layout section-pad"><aside className="privacy-contact"><h2>{t.privacyContact}</h2><a href="mailto:info@ics-dryice.com">info@ics-dryice.com<Icon name="diagonal" /></a><a href="tel:+421424261135">+421 42 426 11 35</a><p>ICS ice cleaning systems s. r. o.<br />Robotnícka 2192<br />017 01 Považská Bystrica<br />Slovakia</p></aside><div className="privacy-body"><p className="resource-note">{t.privacyNote}</p>{t.privacySections.map(([title,text]) => <section className="privacy-section" key={title}><h2>{title}</h2><p>{text}</p></section>)}<details className="privacy-original" open={locale === "sk"} key={locale}><summary>{t.original}<span aria-hidden="true">+</span></summary><div lang="sk" className="privacy-original-copy">{originalPolicy.map((block,i) => block.heading ? <h3 key={i}>{block.text}</h3> : <p key={i}>{block.text}</p>)}</div></details></div></div>
  </>;
}
