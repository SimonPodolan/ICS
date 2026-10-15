"use client";
import ButtonPrimary from "./button-primary";
import { createContext, Fragment, useContext, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import type { Locale } from "./content";
import { translations } from "./translations";
import { contactCopy, contactCountries, interestGroups, type ContactInterest } from "./contact-content";
import Dialog from "./site-dialog";
import "./action-styles.css";

type Enquiry = { name: string; email: string; company: string; address: string; city: string; country: string; interest: string; message: string };
type SiteUI = { locale: Locale; setLocale: (locale: Locale) => void; contactOpen: boolean; openContact: (draft?: Partial<Enquiry>) => void };
const SiteContext = createContext<SiteUI | null>(null);
export function useSiteUI() {
  const value = useContext(SiteContext);
  if (!value) throw new Error("Site UI provider is missing");
  return value;
}
export default function SiteUIProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [contactOpen, setContactOpen] = useState(false);
  const [draft, setDraft] = useState<Partial<Enquiry> | null>(null);
  const [enquiry, setEnquiry] = useState<Enquiry | null>(null);
  const copy = translations[locale];
  const formCopy = contactCopy[locale];
  const countries = useMemo(() => contactCountries(locale), [locale]);
  const customInterest = draft?.interest && !Object.hasOwn(formCopy.interests, draft.interest) ? draft.interest : null;
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  useEffect(() => {
    const keyboard = () => { document.documentElement.dataset.input = "keyboard"; };
    const pointer = () => { document.documentElement.dataset.input = "pointer"; };
    document.addEventListener("keydown", keyboard);
    document.addEventListener("pointerdown", pointer);
    return () => { document.removeEventListener("keydown", keyboard); document.removeEventListener("pointerdown", pointer); };
  }, []);
  function openContact(initialDraft?: Partial<Enquiry>) {
    setEnquiry(null); setDraft(initialDraft ?? null); setContactOpen(true);
  }
  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget)) as Enquiry;
    setDraft(fields); setEnquiry(fields);
  }
  const interestLabel = enquiry ? formCopy.interests[enquiry.interest as ContactInterest] || enquiry.interest : "";
  const countryLabel = countries.find(country => country.code === enquiry?.country)?.name || enquiry?.country || "";
  const reviewFields = enquiry ? [
    [copy.name, enquiry.name], [copy.email, enquiry.email], [copy.company, enquiry.company],
    [formCopy.address, enquiry.address], [formCopy.city, enquiry.city], [formCopy.country, countryLabel],
    [copy.interest, interestLabel], [copy.message, enquiry.message],
  ] : [];
  const mailBody = reviewFields.map(([label, value]) => `${label}: ${value}`).join("\n\n");

  return <SiteContext.Provider value={{ locale, setLocale, contactOpen, openContact }}>{children}
    {contactOpen && <Dialog title={copy.dialogTitle} closeLabel={copy.close} onClose={() => setContactOpen(false)}>
      {!enquiry ? <form onSubmit={prepareEnquiry} className="enquiry-form">
        <p>{copy.dialogText}</p>
        <div className="form-row">
          <label>{copy.name} *<input name="name" autoComplete="name" required defaultValue={draft?.name} /></label>
          <label>{copy.email} *<input name="email" type="email" autoComplete="email" required defaultValue={draft?.email} /></label>
        </div>
        <label>{copy.company} *<input name="company" autoComplete="organization" required defaultValue={draft?.company} /></label>
        <label>{formCopy.address} *<input name="address" autoComplete="street-address" required defaultValue={draft?.address} /></label>
        <div className="form-row">
          <label>{formCopy.city} *<input name="city" autoComplete="address-level2" required defaultValue={draft?.city} /></label>
          <label>{formCopy.country} *<select name="country" autoComplete="country" required defaultValue={draft?.country || ""}>
            <option value="" disabled>{formCopy.chooseCountry}</option>
            {countries.map(country => <option key={country.code} value={country.code}>{country.name}</option>)}
          </select></label>
        </div>
        <label>{copy.interest} *<select name="interest" required defaultValue={draft?.interest || ""}>
          <option value="" disabled>{formCopy.chooseInterest}</option>
          {customInterest && <optgroup label={formCopy.selectedProduct}><option value={customInterest}>{customInterest}</option></optgroup>}
          {interestGroups.map((group, index) => <optgroup key={index} label={formCopy.groups[index]}>
            {group.map(interest => <option key={interest} value={interest}>{formCopy.interests[interest]}</option>)}
          </optgroup>)}
        </select></label>
        <label>{copy.message} *<textarea name="message" rows={3} required maxLength={2000} defaultValue={draft?.message} /></label>
        <div className="form-bottom"><span>* {copy.required}</span><ButtonPrimary type="submit">{copy.send}</ButtonPrimary></div>
      </form> : <div className="enquiry-ready" role="status">
        <span className="ready-check">✓</span><h3>{copy.prepared}</h3><p>{copy.preparedText}</p>
        <dl>{reviewFields.map(([label, value]) => <Fragment key={label}><dt>{label}</dt><dd>{value}</dd></Fragment>)}</dl>
        <div className="ready-actions"><ButtonPrimary icon="diagonal" href={`mailto:sales@ics-dryice.com?subject=${encodeURIComponent(`ICS — ${interestLabel}`)}&body=${encodeURIComponent(mailBody)}`}>{copy.openEmail}</ButtonPrimary><button className="ui-action ui-action--secondary" onClick={() => setEnquiry(null)}>{copy.edit}</button></div>
      </div>}
    </Dialog>}
  </SiteContext.Provider>;
}
