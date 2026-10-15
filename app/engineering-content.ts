import type { Locale } from "./content";

export const engineeringSources = {
  development: "https://www.ics-dryice.com/en/development",
  production: "https://www.ics-dryice.com/en/production",
  profile: "https://www.ics-dryice.com/en/profile",
};

const english = {
  title: ["Engineered around", "your process."],
  intro: "From the first design to the final check, ICS develops and builds dry ice technology in Slovakia.",
  imageAlt: "An ICS technician working on the internal components of a dry ice cleaning machine.",
  rows: [
    {
      title: "Developed in-house",
      text: "Our team develops blasting equipment, pelletizers, and pellet grinding and dosing systems to meet specific operating needs.",
    },
    {
      title: "Made with precision",
      text: "CNC machining and assembly are supported by CAD/CAM production planning and 3D dimensional inspection.",
    },
    {
      title: "Tested for your application",
      text: "Every machine receives final quality checks. Cleaning trials on your own samples let you assess the result before choosing a system.",
    },
  ],
  developmentLink: "Explore our development",
  productionLink: "How we manufacture",
};

export type EngineeringCopy = typeof english;

const slovak: EngineeringCopy = {
  title: ["Navrhnuté pre", "vašu výrobu."],
  intro: "Od prvého návrhu po výstupnú kontrolu. Technológie suchého ľadu vyvíjame a vyrábame na Slovensku.",
  imageAlt: "Technik ICS pracuje na vnútorných komponentoch stroja na čistenie suchým ľadom.",
  rows: [
    {
      title: "Vlastný vývoj",
      text: "Náš tím vyvíja čistiace zariadenia, peletizéry aj systémy mletia a dávkovania peliet podľa konkrétnych potrieb prevádzky.",
    },
    {
      title: "Precízna výroba",
      text: "CNC obrábanie a montáž dopĺňa príprava výroby v CAD/CAM systémoch a kontrola rozmerov pomocou 3D merania.",
    },
    {
      title: "Overenie pre vašu aplikáciu",
      text: "Každý stroj prechádza výstupnou kontrolou. Skúšobné čistenie vašich vzoriek vám umožní posúdiť výsledok ešte pred výberom systému.",
    },
  ],
  developmentLink: "Spoznajte náš vývoj",
  productionLink: "Ako vyrábame",
};

const german: EngineeringCopy = {
  title: ["Entwickelt für", "Ihre Prozesse."],
  intro: "Vom ersten Entwurf bis zur Endkontrolle entwickelt und fertigt ICS Trockeneistechnologie in der Slowakei.",
  imageAlt: "Ein ICS Techniker arbeitet an den inneren Komponenten einer Trockeneisreinigungsmaschine.",
  rows: [
    {
      title: "Eigene Entwicklung",
      text: "Unser Team entwickelt Strahlgeräte, Pelletizer sowie Mahl- und Dosiersysteme für Pellets nach konkreten betrieblichen Anforderungen.",
    },
    {
      title: "Präzise gefertigt",
      text: "CNC-Bearbeitung und Montage werden durch CAD/CAM-Fertigungsplanung und dreidimensionale Maßprüfung ergänzt.",
    },
    {
      title: "Für Ihre Anwendung geprüft",
      text: "Jede Maschine durchläuft eine Endkontrolle. Reinigungsversuche an Ihren eigenen Mustern zeigen das Ergebnis vor der Systemauswahl.",
    },
  ],
  developmentLink: "Entwicklung entdecken",
  productionLink: "Unsere Fertigung",
};

const japanese: EngineeringCopy = {
  title: ["現場に合わせた、", "技術を。"],
  intro: "最初の設計から最終検査まで。ICSはスロバキアでドライアイス技術を開発・製造しています。",
  imageAlt: "ドライアイス洗浄装置の内部部品を調整するICSの技術者。",
  rows: [
    {
      title: "自社で開発",
      text: "洗浄装置、ペレタイザー、ペレットの粉砕・供給システムを、現場の要件に合わせて開発しています。",
    },
    {
      title: "精密な製造",
      text: "CNC加工と組み立てに、CAD/CAMによる生産準備と三次元の寸法検査を組み合わせています。",
    },
    {
      title: "用途に合わせて検証",
      text: "すべての装置に最終品質検査を実施。お客様のサンプルを使った洗浄試験で、導入前に仕上がりを確認できます。",
    },
  ],
  developmentLink: "開発について",
  productionLink: "製造について",
};

export const engineeringCopy: Record<Locale, EngineeringCopy> = {
  en: english,
  sk: slovak,
  de: german,
  ja: japanese,
};
