import type { Locale } from "./content";

type Industry = { id: string; path: string; copy: Record<Locale, readonly [title: string, description: string]> };

// Detail-page photographs: public/ics/industries/sources.json records their origins.
export const industries: Industry[] = [
  { id: "manufacturing", path: "/oblasti-pouzitia/strojarsky-priemysel", copy: {
    en: ["Manufacturing", "Lift oil, grease and production build-up from machinery, welding robots and conveyors, with less dismantling."],
    sk: ["Strojárstvo", "Odstránenie olejov, mazív a výrobných nánosov zo strojov, zváracích robotov a dopravníkov s menšou potrebou demontáže."],
    de: ["Maschinenbau", "Öl, Fett und Produktionsablagerungen von Maschinen, Schweißrobotern und Förderanlagen entfernen – mit weniger Demontage."],
    ja: ["機械製造", "機械、溶接ロボット、搬送設備の油やグリース、生産時の付着物を、分解を抑えて除去します。"],
  } },
  { id: "automotive", path: "/oblasti-pouzitia/automobilovy-priemysel", copy: {
    en: ["Automotive", "Clean moulds, paint booths and production lines. Remove oil, plastic residues and carbon deposits from components."],
    sk: ["Automotive", "Čistenie foriem, lakovacích kabín a výrobných liniek. Odstránenie olejov, zvyškov plastov a karbónových nánosov z komponentov."],
    de: ["Automobilindustrie", "Formen, Lackierkabinen und Produktionslinien reinigen. Öl, Kunststoffreste und Kohlenstoffablagerungen von Bauteilen entfernen."],
    ja: ["自動車製造", "金型、塗装ブース、生産ラインを清掃。部品に付着した油、プラスチック残留物、炭素堆積物を除去します。"],
  } },
  { id: "detailing", path: "/cardetailing", copy: {
    en: ["Car detailing", "Reach engine bays, underbodies and interior details with a dry process, including restoration work on classic vehicles."],
    sk: ["Car detailing", "Suché čistenie motorového priestoru, podvozka a detailov interiéru vrátane renovačných prác na veteránoch."],
    de: ["Fahrzeugpflege", "Motorraum, Unterboden und Innenraumdetails trocken reinigen – auch bei der Restaurierung klassischer Fahrzeuge."],
    ja: ["カーディテーリング", "エンジンルーム、車体下部、内装の細部をドライ清掃。クラシックカーのレストアにも活用できます。"],
  } },
  { id: "food", path: "/oblasti-pouzitia/potravinarsky-priemysel", copy: {
    en: ["Food & beverage", "Remove food residues, grease and sugar build-up from conveyors, moulds, mixing equipment and packaging lines."],
    sk: ["Potravinárstvo", "Odstránenie zvyškov potravín, mastnoty a cukrov z dopravníkov, foriem, miešacích zariadení a baliacich liniek."],
    de: ["Lebensmittel & Getränke", "Lebensmittelreste, Fett und Zuckerablagerungen von Förderbändern, Formen, Mischanlagen und Verpackungslinien entfernen."],
    ja: ["食品・飲料", "コンベヤー、金型、混合設備、包装ラインに付着した食品残留物、油脂、糖分を除去します。"],
  } },
  { id: "printing", path: "/oblasti-pouzitia/tlaciarensky-papierensky-priemysel", copy: {
    en: ["Print & paper", "Clear ink, adhesives and paper dust from printing rollers, presses and paper production equipment."],
    sk: ["Tlač a papier", "Čistenie farieb, lepidiel a papierového prachu z tlačiarenských valcov, lisov a zariadení na výrobu papiera."],
    de: ["Druck & Papier", "Farbe, Klebstoff und Papierstaub von Druckwalzen, Pressen und Anlagen zur Papierherstellung entfernen."],
    ja: ["印刷・製紙", "印刷ローラー、プレス、製紙設備に付着したインク、接着剤、紙粉を除去します。"],
  } },
  { id: "healthcare", path: "/cistenie-suchym-ladom-v-zdravotnictve", copy: {
    en: ["Healthcare", "Dry cleaning for technical equipment, laboratory surfaces and pharmaceutical production machinery where moisture is a concern."],
    sk: ["Zdravotníctvo", "Suché čistenie technických zariadení, laboratórnych povrchov a farmaceutických výrobných strojov tam, kde je vlhkosť nežiaduca."],
    de: ["Gesundheitswesen", "Trockene Reinigung technischer Geräte, Laboroberflächen und pharmazeutischer Produktionsanlagen, wo Feuchtigkeit unerwünscht ist."],
    ja: ["医療・製薬", "水分を避けたい技術設備、研究室の表面、医薬品製造機械のドライ清掃に。"],
  } },
  { id: "restoration", path: "/renovacie-/-upratovacie-sluzby", copy: {
    en: ["Restoration & cleaning", "Remove graffiti, soot and surface deposits from masonry, façades and timber during cleaning and restoration."],
    sk: ["Renovácie a upratovanie", "Odstránenie graffiti, sadzí a povrchových nánosov z muriva, fasád a dreva pri čistení a renováciách."],
    de: ["Restaurierung & Reinigung", "Graffiti, Ruß und Oberflächenablagerungen von Mauerwerk, Fassaden und Holz bei Reinigung und Restaurierung entfernen."],
    ja: ["リノベーション・清掃", "清掃や修復時に、壁、外壁、木材の落書き、すす、表面の付着物を除去します。"],
  } },
  { id: "plastics", path: "/plastikarsky-priemysel", copy: {
    en: ["Plastics", "Clean injection moulds in place, removing plastic residues and release agents from intricate mould surfaces."],
    sk: ["Plastikárstvo", "Čistenie vstrekovacích foriem priamo v zariadení. Odstránenie zvyškov plastov a separačných prostriedkov z členitých povrchov."],
    de: ["Kunststoffe", "Spritzgussformen direkt in der Anlage reinigen und Kunststoffreste sowie Trennmittel von komplexen Formflächen entfernen."],
    ja: ["プラスチック", "射出成形金型を取り付けたまま清掃し、複雑な金型表面のプラスチック残留物や離型剤を除去します。"],
  } },
  { id: "rubber", path: "/oblasti-pouzitia/gumarensky-priemysel", copy: {
    en: ["Rubber", "Reach fine mould details and hard-to-access areas in tyre, seal and footwear production, using non-abrasive cleaning."],
    sk: ["Gumárstvo", "Neabrazívne čistenie jemných detailov foriem a ťažko dostupných miest pri výrobe pneumatík, tesnení a obuvi."],
    de: ["Gummi", "Feine Formdetails und schwer zugängliche Bereiche in der Reifen-, Dichtungs- und Schuhproduktion nicht abrasiv reinigen."],
    ja: ["ゴム", "タイヤ、シール、靴底の製造金型の細部や届きにくい部分を、非研磨方式で清掃します。"],
  } },
  { id: "textiles", path: "/textilny-priemysel", copy: {
    en: ["Textiles", "Remove dried dyes, adhesives and fibres from rollers, textile printing units and production equipment."],
    sk: ["Textilný priemysel", "Odstránenie zaschnutých farieb, lepidiel a vlákien z valcov, jednotiek na potlač textilu a výrobných zariadení."],
    de: ["Textilien", "Getrocknete Farben, Klebstoffe und Fasern von Walzen, Textildruckeinheiten und Produktionsanlagen entfernen."],
    ja: ["繊維", "ローラー、捺染設備、生産機械に付着した乾燥染料、接着剤、繊維くずを除去します。"],
  } },
  { id: "marine", path: "/oblasti-pouzitia/lodny-priemysel", copy: {
    en: ["Marine", "Clean hull surfaces, engine rooms and heat exchangers. Lift oil and grease deposits during vessel maintenance."],
    sk: ["Lodný priemysel", "Čistenie lodných plášťov, motorovní a výmenníkov tepla. Odstránenie olejových a mastných usadenín pri údržbe plavidiel."],
    de: ["Schifffahrt", "Rumpfflächen, Maschinenräume und Wärmetauscher reinigen. Öl- und Fettablagerungen bei der Schiffswartung entfernen."],
    ja: ["船舶", "船体表面、機関室、熱交換器を清掃。船舶メンテナンス時の油やグリースの堆積物を除去します。"],
  } },
  { id: "energy", path: "/energeticky-priemysel", copy: {
    en: ["Energy", "Remove deposits from turbines, generators and cooling channels, including maintenance of wind turbine components."],
    sk: ["Energetika", "Odstránenie usadenín z turbín, generátorov a chladiacich kanálov vrátane údržby komponentov veterných turbín."],
    de: ["Energie", "Ablagerungen von Turbinen, Generatoren und Kühlkanälen entfernen, auch bei der Wartung von Windkraftkomponenten."],
    ja: ["エネルギー", "タービン、発電機、冷却流路の堆積物を除去。風力タービン部品のメンテナンスにも活用できます。"],
  } },
];

export const industryInterface: Record<Locale, { pointerHint: string; touchHint: string; explore: string }> = {
  en: { pointerHint: "Move across an industry to discover what we clean.", touchHint: "Select an industry to discover what we clean.", explore: "Explore this application" },
  sk: { pointerHint: "Prejdite myšou po odvetví a objavte, čo čistíme.", touchHint: "Vyberte odvetvie a objavte, čo čistíme.", explore: "Viac o využití" },
  de: { pointerHint: "Entdecken Sie beim Darüberfahren, was wir reinigen.", touchHint: "Wählen Sie eine Branche und entdecken Sie, was wir reinigen.", explore: "Mehr zur Anwendung" },
  ja: { pointerHint: "業界名にカーソルを合わせて、清掃の用途をご覧ください。", touchHint: "業界を選んで、清掃の用途をご覧ください。", explore: "詳しい用途を見る" },
};
