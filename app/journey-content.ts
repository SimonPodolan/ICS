import type { Locale } from "./content";

const english = {
  title: ["A little ice.", "A different kind of clean."],
  intro: "Discover what happens when dry ice meets the surface.",
  steps: [
    {
      title: "Impact",
      text: "Compressed air accelerates dry ice pellets towards the surface. Their impact helps break up and lift contamination.",
    },
    {
      title: "Thermal shock",
      text: "The intense cold makes contamination brittle and helps loosen its bond with the surface.",
    },
    {
      title: "Sublimation",
      text: "Solid CO₂ turns directly into gas. Removed dirt remains for collection, with no secondary blasting-media waste.",
    },
  ],
  diagramLabels: {
    ice: "Dry ice",
    surface: "Surface",
    dirt: "Contamination",
    gas: "CO₂ gas",
  },
  next: "Next step",
  replay: "Start again",
  scrollHint: "Scroll to see it happen",
  skipJourney: "Continue to the systems",
  temperatureLabel: "Dry ice at −78.5°C",
  serviceTitle: "Services",
  serviceText: "Practical training, expert support and a demonstration on your equipment.",
  services: [
    { id: "training", title: "Training", text: "Learn to operate ICS equipment at the training and demonstration centre. Get practical guidance on machine settings and the right technology for your application." },
    { id: "service", title: "Service", text: "Warranty and post-warranty support through ICS service centres and partners worldwide. Get help with technical maintenance, phone support and replacement equipment during servicing." },
    { id: "demonstration", title: "Demonstration", text: "See an ICS machine working on your own equipment. Arrange a free demonstration at your workplace with the ICS team." },
  ],
  serviceAction: "Talk to the team",
  allApplications: "Explore all applications",
  learnMore: "How dry ice cleaning works",
  resourceLinks: ["Downloads", "Become a partner"],
};

export type JourneyCopy = typeof english;

const slovak: JourneyCopy = {
  title: ["Trocha ľadu.", "Iný spôsob čistenia."],
  intro: "Pozrite sa, čo sa deje, keď suchý ľad narazí na povrch.",
  steps: [
    {
      title: "Náraz",
      text: "Stlačený vzduch urýchľuje pelety suchého ľadu smerom k povrchu. Ich náraz pomáha narušiť a odstrániť nečistoty.",
    },
    {
      title: "Teplotný šok",
      text: "Intenzívny chlad spôsobuje krehnutie nečistôt a pomáha oslabiť ich spojenie s povrchom.",
    },
    {
      title: "Sublimácia",
      text: "Pevný CO₂ sa mení priamo na plyn. Odstránené nečistoty zostávajú na zozbieranie, no nevzniká ďalší odpad z tryskacieho média.",
    },
  ],
  diagramLabels: {
    ice: "Suchý ľad",
    surface: "Povrch",
    dirt: "Nečistoty",
    gas: "Plynný CO₂",
  },
  next: "Ďalší krok",
  replay: "Spustiť znova",
  scrollHint: "Posúvajte a sledujte čistenie",
  skipJourney: "Prejsť na systémy",
  temperatureLabel: "Suchý ľad pri −78,5 °C",
  serviceTitle: "Služby",
  serviceText: "Praktické školenia, odborný servis a ukážka na vašom zariadení.",
  services: [
    { id: "training", title: "Školenia", text: "Naučte sa obsluhovať stroje ICS v školiacom a predvádzacom centre. Získajte praktické rady k nastaveniam stroja a výberu technológie pre svoju aplikáciu." },
    { id: "service", title: "Servis", text: "Záručný aj pozáručný servis cez servisné centrá ICS a partnerov po celom svete. Technická údržba, telefonická podpora a náhradné zariadenie počas servisu." },
    { id: "demonstration", title: "Predvádzanie", text: "Pozrite si stroj ICS pri práci na vašom zariadení. Dohodnite si s tímom ICS bezplatnú ukážku priamo vo svojej prevádzke." },
  ],
  serviceAction: "Spojte sa s nami",
  allApplications: "Všetky možnosti využitia",
  learnMore: "Ako funguje čistenie suchým ľadom",
  resourceLinks: ["Na stiahnutie", "Staňte sa partnerom"],
};

const german: JourneyCopy = {
  title: ["Ein wenig Eis.", "Reinigung neu gedacht."],
  intro: "Entdecken Sie, was passiert, wenn Trockeneis auf die Oberfläche trifft.",
  steps: [
    {
      title: "Aufprall",
      text: "Druckluft beschleunigt Trockeneispellets auf die Oberfläche. Ihr Aufprall hilft, Verschmutzungen aufzubrechen und abzulösen.",
    },
    {
      title: "Thermischer Schock",
      text: "Die intensive Kälte macht Verschmutzungen spröde und hilft, ihre Haftung an der Oberfläche zu lösen.",
    },
    {
      title: "Sublimation",
      text: "Festes CO₂ geht direkt in Gas über. Der entfernte Schmutz bleibt zur Aufnahme zurück, ohne zusätzlichen Abfall durch Strahlmittel.",
    },
  ],
  diagramLabels: {
    ice: "Trockeneis",
    surface: "Oberfläche",
    dirt: "Verschmutzung",
    gas: "CO₂-Gas",
  },
  next: "Nächster Schritt",
  replay: "Erneut starten",
  scrollHint: "Scrollen und Reinigung erleben",
  skipJourney: "Weiter zu den Systemen",
  temperatureLabel: "Trockeneis bei −78,5 °C",
  serviceTitle: "Services",
  serviceText: "Praktische Schulung, technischer Service und eine Vorführung an Ihrer Anlage.",
  services: [
    { id: "training", title: "Schulung", text: "Lernen Sie die Bedienung von ICS Geräten im Schulungs- und Vorführzentrum. Erhalten Sie praktische Tipps zu Einstellungen und zur passenden Technologie für Ihre Anwendung." },
    { id: "service", title: "Service", text: "Garantie- und Nachgarantieservice über ICS Servicezentren und Partner weltweit. Unterstützung bei Wartung, telefonischer Beratung und Ersatzgeräten während des Services." },
    { id: "demonstration", title: "Vorführung", text: "Erleben Sie eine ICS Maschine an Ihrer eigenen Anlage. Vereinbaren Sie mit dem ICS Team eine kostenlose Vorführung vor Ort." },
  ],
  serviceAction: "Mit dem Team sprechen",
  allApplications: "Alle Anwendungen entdecken",
  learnMore: "So funktioniert Trockeneisreinigung",
  resourceLinks: ["Downloads", "Partner werden"],
};

const japanese: JourneyCopy = {
  title: ["小さな粒で、", "洗浄が変わる。"],
  intro: "ドライアイスが表面に触れると、何が起こるのでしょうか。",
  steps: [
    {
      title: "衝撃",
      text: "圧縮空気でドライアイスペレットを加速し、表面に吹き付けます。その衝撃が汚れを砕き、剥がす働きをします。",
    },
    {
      title: "熱衝撃",
      text: "強い冷却によって汚れがもろくなり、表面との結合が弱まることで、汚れが剥がれやすくなります。",
    },
    {
      title: "昇華",
      text: "固体のCO₂は直接気体に変わります。剥がれた汚れは回収が必要ですが、投射材による二次廃棄物は残りません。",
    },
  ],
  diagramLabels: {
    ice: "ドライアイス",
    surface: "表面",
    dirt: "汚れ",
    gas: "気体のCO₂",
  },
  next: "次のステップ",
  replay: "もう一度見る",
  scrollHint: "スクロールで洗浄を見る",
  skipJourney: "システム紹介へ進む",
  temperatureLabel: "−78.5°Cのドライアイス",
  serviceTitle: "サービス",
  serviceText: "実践的なトレーニング、技術サポート、お客様の設備でのデモンストレーション。",
  services: [
    { id: "training", title: "トレーニング", text: "研修・デモンストレーションセンターでICS装置の操作を学べます。装置の設定や用途に適した技術について、実践的にご案内します。" },
    { id: "service", title: "メンテナンス", text: "世界各地のICSサービスセンターとパートナーが、保証期間内・期間終了後のメンテナンスに対応。電話相談や整備中の代替機についてもご相談いただけます。" },
    { id: "demonstration", title: "デモンストレーション", text: "お客様の設備でICS装置の性能をお確かめください。現地での無料デモンストレーションをICSチームにご相談いただけます。" },
  ],
  serviceAction: "チームに相談する",
  allApplications: "すべての用途を見る",
  learnMore: "ドライアイス洗浄の仕組み",
  resourceLinks: ["ダウンロード", "パートナーになる"],
};

export const journeyCopy: Record<Locale, JourneyCopy> = {
  en: english,
  sk: slovak,
  de: german,
  ja: japanese,
};
