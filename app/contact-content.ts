import type { Locale } from "./content";
import countries from "./contact-countries.json";

// Country choices from the original ICS contact form. Obsolete aliases for
// American Samoa, Timor-Leste and metropolitan France use their ISO codes.
export function contactCountries(locale: Locale) {
  const names = new Intl.DisplayNames([locale], { type: "region", fallback: "none" });
  return countries.map(country => ({ code: country.code, name: names.of(country.code) || country.name }))
    .sort((a, b) => a.name.localeCompare(b.name, locale));
}

export const contactCopy = {
  en: {
    address: "Address", city: "City", country: "Country", chooseCountry: "Choose your country", chooseInterest: "Choose an area", selectedProduct: "Selected product",
    groups: ["Products", "Services & support", "Other enquiries"],
    interests: { "dry-ice": "Dry ice", machines: "Machines & equipment", accessories: "Accessories & spare parts", rental: "Equipment rental", financing: "Financing", demonstration: "Free demonstration", service: "Service", training: "Training", other: "Other" },
  },
  sk: {
    address: "Adresa", city: "Mesto", country: "Krajina", chooseCountry: "Vyberte krajinu", chooseInterest: "Vyberte oblasť", selectedProduct: "Vybraný produkt",
    groups: ["Produkty", "Služby a podpora", "Ostatné dopyty"],
    interests: { "dry-ice": "Suchý ľad", machines: "Stroje a zariadenia", accessories: "Príslušenstvo a náhradné diely", rental: "Prenájom zariadení", financing: "Financovanie", demonstration: "Bezplatná prezentácia", service: "Servis", training: "Školenie", other: "Ostatné" },
  },
  de: {
    address: "Adresse", city: "Stadt", country: "Land", chooseCountry: "Land auswählen", chooseInterest: "Bereich auswählen", selectedProduct: "Ausgewähltes Produkt",
    groups: ["Produkte", "Service & Support", "Weitere Anfragen"],
    interests: { "dry-ice": "Trockeneis", machines: "Maschinen & Anlagen", accessories: "Zubehör & Ersatzteile", rental: "Gerätevermietung", financing: "Finanzierung", demonstration: "Kostenlose Vorführung", service: "Service", training: "Schulung", other: "Sonstiges" },
  },
  ja: {
    address: "住所", city: "市区町村", country: "国・地域", chooseCountry: "国・地域を選択", chooseInterest: "お問い合わせ内容を選択", selectedProduct: "選択した製品",
    groups: ["製品", "サービス・サポート", "その他のお問い合わせ"],
    interests: { "dry-ice": "ドライアイス", machines: "機械・装置", accessories: "アクセサリー・交換部品", rental: "機器レンタル", financing: "ファイナンス", demonstration: "無料デモンストレーション", service: "保守サービス", training: "トレーニング", other: "その他" },
  },
} satisfies Record<Locale, unknown>;
export type ContactInterest = keyof typeof contactCopy.en.interests;
export const interestGroups: ContactInterest[][] = [
  ["dry-ice", "machines", "accessories"],
  ["rental", "financing", "demonstration", "service", "training"],
  ["other"],
];
