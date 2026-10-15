import type { Locale } from "./content";

// Public partner list from https://www.ics-dryice.com/en/.
// These are the brands shown by ICS, not a directory of distributors.
export const partnerBrands = [
  { file: "globus.png", name: "Globus" },
  { file: "hyundai-dymos.png", name: "Hyundai Dymos" },
  { file: "matador.png", name: "Matador Group" },
  { file: "mitell.png", name: "Mittel" },
  { file: "nemak.png", name: "Nemak" },
  { file: "toyoda-gose.png", name: "Toyoda Gosei" },
  { file: "tridas.png", name: "Tridas" },
  { file: "atalian.png", name: "Atalian" },
  { file: "bosh.png", name: "Bosch Service" },
  { file: "cleancat.png", name: "HPF CleanCat" },
  { file: "continental.png", name: "Continental" },
];
export const partnerCopy: Record<Locale, { nav: string; title: string; text: string; action: string; pause: string; play: string }> = {
  en: { nav: "Partners", title: "Our partners.", text: "Local knowledge. Shared expertise. Our business partners help customers choose the right ICS equipment and put it to work, worldwide.", action: "Become our business partner", pause: "Pause partner logos", play: "Resume partner logos" },
  sk: { nav: "Partneri", title: "Naši partneri.", text: "Znalosť trhu. Spoločné skúsenosti. Naši obchodní partneri pomáhajú zákazníkom po celom svete vybrať správne zariadenie ICS a využiť ho v praxi.", action: "Staňte sa naším obchodným partnerom", pause: "Pozastaviť pohyb log", play: "Spustiť pohyb log" },
  de: { nav: "Partner", title: "Unsere Partner.", text: "Lokale Marktkenntnis. Gemeinsames Wissen. Unsere Geschäftspartner helfen Kunden weltweit, die passende ICS Technik auszuwählen und einzusetzen.", action: "Werden Sie unser Geschäftspartner", pause: "Partnerlogos anhalten", play: "Partnerlogos fortsetzen" },
  ja: { nav: "パートナー", title: "私たちのパートナー。", text: "地域への理解と、共有する専門知識。世界各地のビジネスパートナーが、お客様に適したICS機器の選定と活用をサポートします。", action: "ビジネスパートナーになる", pause: "ロゴの動きを停止", play: "ロゴの動きを再開" },
};
