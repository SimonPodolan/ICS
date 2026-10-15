import type { Locale } from "./content";

type Detail = readonly [context: string, applications: readonly string[]];

// Application examples paraphrase the linked ICS articles; no sterilization,
// live-electrical cleaning or universal material-suitability claims are added.
export const industryDetails: Record<string, Record<Locale, Detail>> = {
  manufacturing: {
    en: ["Production equipment collects lubricants, metal dust and hardened deposits. Dry ice is used for routine maintenance and for preparing surfaces before coating, bonding or welding.", ["CNC machining centres, presses and production moulds", "Hydraulic systems, conveyors and welding equipment", "Removal of oil, release agents and loose surface deposits"]],
    sk: ["Na výrobných zariadeniach sa usádzajú mazivá, kovový prach a stvrdnuté nánosy. Suchý ľad sa využíva pri údržbe aj pri príprave povrchov pred lakovaním, lepením či zváraním.", ["CNC obrábacie centrá, lisy a výrobné formy", "Hydraulické systémy, dopravníky a zváracie zariadenia", "Odstránenie olejov, separátorov a povrchových nánosov"]],
    de: ["Schmierstoffe, Metallstaub und feste Ablagerungen sammeln sich an Produktionsanlagen. Trockeneis unterstützt die Wartung sowie die Oberflächenvorbereitung vor Beschichten, Kleben oder Schweißen.", ["CNC-Bearbeitungszentren, Pressen und Produktionsformen", "Hydraulik, Förderanlagen und Schweißtechnik", "Entfernung von Öl, Trennmitteln und Oberflächenablagerungen"]],
    ja: ["生産設備には潤滑剤、金属粉、固着した汚れが蓄積します。ドライアイスは定期的なメンテナンスや、塗装・接着・溶接前の表面処理に活用されます。", ["CNC加工機、プレス、生産用金型", "油圧設備、搬送設備、溶接装置", "油、離型剤、表面付着物の除去"]],
  },
  automotive: {
    en: ["Applications run from assembly and paint shops to component servicing. Keeping mould details and production tooling clean supports repeatable part quality and easier inspection.", ["Injection and die-casting moulds and assembly fixtures", "Paint booths, robot arms and conveyor systems", "Engine, transmission and hydraulic components"]],
    sk: ["Využitie siaha od montáže a lakovne až po servis komponentov. Čisté detaily foriem a výrobné prípravky pomáhajú udržiavať kvalitu dielov a uľahčujú ich kontrolu.", ["Vstrekovacie a odlievacie formy, montážne prípravky", "Lakovacie kabíny, robotické ramená a dopravníky", "Komponenty motorov, prevodoviek a hydrauliky"]],
    de: ["Die Anwendungen reichen von Montage und Lackierung bis zum Bauteilservice. Saubere Formdetails und Werkzeuge unterstützen gleichbleibende Teilequalität und erleichtern die Inspektion.", ["Spritzguss- und Druckgussformen, Montagevorrichtungen", "Lackierkabinen, Roboterarme und Förderanlagen", "Motor-, Getriebe- und Hydraulikkomponenten"]],
    ja: ["組立・塗装工程から部品整備まで幅広く活用できます。金型の細部や治具を清潔に保つことで、部品品質の安定や点検を支えます。", ["射出・ダイカスト金型と組立治具", "塗装ブース、ロボットアーム、搬送設備", "エンジン、変速機、油圧系の部品"]],
  },
  detailing: {
    en: ["A dry process reaches areas where conventional washing is difficult. The process also supports coating removal and surface preparation during vehicle renovation, alongside detailed cleaning.", ["Engine bays, chassis and underbody components", "Interior plastics, ventilation grilles and small details", "Classic-car renovation and preparation before refinishing"]],
    sk: ["Suchý proces sa dostane aj na miesta, kde je bežné umývanie náročné. Využitie zahŕňa aj odstraňovanie náterov a prípravu povrchov pri renovácii vozidiel.", ["Motorový priestor, podvozok a jeho komponenty", "Plasty interiéru, vetracie mriežky a jemné detaily", "Renovácie veteránov a príprava pred novou povrchovou úpravou"]],
    de: ["Der trockene Prozess erreicht Bereiche, die sich konventionell schwer waschen lassen. Weitere Anwendungen sind Beschichtungsentfernung und Oberflächenvorbereitung bei Fahrzeugrestaurierungen.", ["Motorraum, Fahrwerk und Unterbodenkomponenten", "Innenraumkunststoffe, Lüftungsgitter und kleine Details", "Oldtimer-Restaurierung und Vorbereitung vor dem Lackieren"]],
    ja: ["通常の洗車が難しい箇所にドライ方式で対応します。細部の清掃に加え、車両修復時の塗膜除去や表面処理にも活用できます。", ["エンジンルーム、シャシー、車体下部", "内装樹脂、換気グリル、細かな部品", "クラシックカー修復と再塗装前の処理"]],
  },
  food: {
    en: ["Flour, fats, sugar and food residues build up on production equipment. Applications include bakeries, chocolate production, meat processing, dairies and beverage filling.", ["Ovens, baking trays, chocolate moulds and conveyors", "Mixing, dosing, packaging and filling equipment", "Stainless-steel production surfaces and processing lines"]],
    sk: ["Na zariadeniach sa hromadí múka, tuky, cukry a zvyšky potravín. Využitie zahŕňa pekárne, čokoládovne, mäsovýrobu, mliekarne a plnenie nápojov.", ["Pece, plechy, čokoládové formy a dopravníky", "Miešacie, dávkovacie, baliace a plniace zariadenia", "Nerezové výrobné plochy a spracovateľské linky"]],
    de: ["Mehl, Fett, Zucker und Lebensmittelreste lagern sich an Anlagen ab. Anwendungen umfassen Bäckereien, Schokoladenherstellung, Fleischverarbeitung, Molkereien und Getränkeabfüllung.", ["Öfen, Backbleche, Schokoladenformen und Förderbänder", "Misch-, Dosier-, Verpackungs- und Abfüllanlagen", "Edelstahlflächen und Verarbeitungslinien"]],
    ja: ["設備には小麦粉、油脂、糖分、食品残留物が付着します。パン・チョコレート製造、食肉加工、乳製品、飲料充填などに活用できます。", ["オーブン、天板、チョコレート金型、コンベヤー", "混合、計量、包装、充填設備", "ステンレス製の作業面と加工ライン"]],
  },
  printing: {
    en: ["Print quality depends on clean, precise equipment. The dry process is used on ink-contaminated printing components and on paper machinery carrying pulp, adhesive and dust deposits.", ["Printing and anilox rollers, ink containers and toner reservoirs", "Pressing and drying rollers in paper production", "Cutting, winding, conveying and filtering equipment"]],
    sk: ["Kvalita tlače závisí od čistého a presného zariadenia. Suchý proces sa používa na znečistené tlačové komponenty aj na papierenské stroje s nánosmi buničiny, lepidiel a prachu.", ["Tlačové a aniloxové valce, nádoby na farby a toner", "Lisovacie a sušiace valce pri výrobe papiera", "Rezacie, navíjacie, dopravné a filtračné zariadenia"]],
    de: ["Druckqualität braucht saubere, präzise Anlagen. Der trockene Prozess reinigt Druckkomponenten mit Farbrückständen und Papiermaschinen mit Zellstoff-, Klebstoff- und Staubablagerungen.", ["Druck- und Rasterwalzen, Farbbehälter und Tonerreservoirs", "Press- und Trockenwalzen der Papierproduktion", "Schneid-, Wickel-, Förder- und Filteranlagen"]],
    ja: ["印刷品質には設備の清潔さと精度が大切です。インクが付着した印刷部品や、パルプ・接着剤・紙粉が蓄積した製紙機械の清掃に活用されます。", ["印刷・アニロックスローラー、インク・トナー容器", "製紙工程のプレス・乾燥ローラー", "切断、巻取り、搬送、ろ過設備"]],
  },
  healthcare: {
    en: ["Technical cleaning supports equipment maintenance in hospitals, laboratories and pharmaceutical production. The focus is on equipment surfaces and maintenance applications where introducing moisture is undesirable.", ["Technical and external parts of diagnostic equipment", "Ventilation systems, equipment housings and controls", "Pharmaceutical production machinery and laboratory surfaces"]],
    sk: ["Technické čistenie podporuje údržbu zariadení v nemocniciach, laboratóriách a farmaceutickej výrobe. Ide o povrchy zariadení a údržbu tam, kde je zavádzanie vlhkosti nežiaduce.", ["Technické a vonkajšie časti diagnostických zariadení", "Ventilácia, kryty zariadení a ovládacie prvky", "Farmaceutické výrobné stroje a laboratórne povrchy"]],
    de: ["Technische Reinigung unterstützt die Gerätewartung in Krankenhäusern, Laboren und der Pharmaproduktion. Im Mittelpunkt stehen Geräteoberflächen und Wartungsanwendungen, bei denen Feuchtigkeit unerwünscht ist.", ["Technische und äußere Teile diagnostischer Geräte", "Lüftungssysteme, Gehäuse und Bedienelemente", "Pharmazeutische Produktionsanlagen und Laboroberflächen"]],
    ja: ["病院、研究室、医薬品製造での設備メンテナンスを技術的な清掃で支えます。水分を持ち込みたくない設備表面やメンテナンス用途が中心です。", ["診断装置の技術部・外装部", "換気設備、機器筐体、操作部分", "医薬品製造機械と研究室の表面"]],
  },
  restoration: {
    en: ["Cleaning and restoration require a process matched to the original surface. Remove graffiti, biological deposits and fire residues from building materials and architectural details.", ["Graffiti on stone, brickwork and façades", "Moss, lichens and surface deposits on outdoor structures", "Soot and residues during post-fire restoration"]],
    sk: ["Čistenie a renovácie vyžadujú postup prispôsobený pôvodnému povrchu. Využitie zahŕňa odstraňovanie graffiti, biologických nánosov a zvyškov po požiari zo stavebných materiálov.", ["Graffiti na kameni, tehle a fasádach", "Machy, lišajníky a povrchové nánosy v exteriéri", "Sadze a zvyšky pri renováciách po požiari"]],
    de: ["Reinigung und Restaurierung brauchen einen auf die Oberfläche abgestimmten Prozess. Graffiti, biologische Ablagerungen und Brandrückstände lassen sich an Baustoffen und architektonischen Details bearbeiten.", ["Graffiti auf Stein, Mauerwerk und Fassaden", "Moos, Flechten und Ablagerungen an Außenflächen", "Ruß und Rückstände bei der Brandschadensanierung"]],
    ja: ["清掃・修復では元の表面に合わせた方法が必要です。建材や建築細部の落書き、生物由来の付着物、火災後の残留物の除去に活用されます。", ["石材、レンガ、外壁の落書き", "屋外構造物のコケ、地衣類、表面付着物", "火災修復時のすすと残留物"]],
  },
  plastics: {
    en: ["Plastic residues, release agents and hardened additives accumulate on moulds and processing equipment. Applications include in-place mould maintenance and finishing of complex plastic parts.", ["Injection moulds and finely detailed mould surfaces", "Extruders, nozzles, production tools and conveyors", "Cleaning finished plastic parts, prototypes and models"]],
    sk: ["Na formách a zariadeniach sa usádzajú zvyšky plastov, separátory a stvrdnuté aditíva. Využitie zahŕňa údržbu foriem v zariadení aj dočisťovanie členitých plastových dielov.", ["Vstrekovacie formy a jemné detaily ich povrchu", "Extrudéry, trysky, výrobné nástroje a dopravníky", "Dočisťovanie plastových dielov, prototypov a modelov"]],
    de: ["Kunststoffreste, Trennmittel und ausgehärtete Additive sammeln sich an Formen und Anlagen. Anwendungen umfassen die Formwartung vor Ort und die Nachreinigung komplexer Kunststoffteile.", ["Spritzgussformen und fein strukturierte Formflächen", "Extruder, Düsen, Werkzeuge und Förderanlagen", "Nachreinigung von Kunststoffteilen, Prototypen und Modellen"]],
    ja: ["金型や設備には樹脂残留物、離型剤、固着した添加剤が蓄積します。金型の現場メンテナンスや複雑な樹脂部品の仕上げ清掃に活用されます。", ["射出成形金型と微細な金型表面", "押出機、ノズル、生産工具、搬送設備", "樹脂製品、試作品、モデルの仕上げ清掃"]],
  },
  rubber: {
    en: ["Residues in rubber moulds affect the detail transferred to the finished part. Clean fine vent channels and maintain presses and vulcanization equipment.", ["Tyre moulds and their fine ventilation channels", "Moulds for seals, footwear and technical rubber parts", "Presses, vulcanization equipment and conveyors"]],
    sk: ["Nánosy vo formách ovplyvňujú detaily prenášané do hotového výrobku. Využitie zahŕňa čistenie jemných odvzdušňovacích kanálikov a údržbu lisov či vulkanizačných zariadení.", ["Formy na pneumatiky a jemné odvzdušňovacie kanáliky", "Formy na tesnenia, obuv a technickú gumu", "Lisy, vulkanizačné zariadenia a dopravníky"]],
    de: ["Formrückstände beeinflussen die Details des fertigen Gummiteils. Anwendungen umfassen feine Entlüftungskanäle sowie die Wartung von Pressen und Vulkanisationsanlagen.", ["Reifenformen mit feinen Entlüftungskanälen", "Formen für Dichtungen, Schuhe und technische Gummiteile", "Pressen, Vulkanisationsanlagen und Fördertechnik"]],
    ja: ["ゴム金型の残留物は製品に転写される細部に影響します。微細なベント孔の清掃や、プレス・加硫設備のメンテナンスに活用できます。", ["タイヤ金型と微細なベント孔", "シール、靴底、工業用ゴム部品の金型", "プレス、加硫設備、搬送設備"]],
  },
  textiles: {
    en: ["Dyes, adhesives and fibres collect on textile production and printing equipment. The process reaches engraved roller details and removes deposits during equipment maintenance.", ["Printing, engraved and calender rollers", "Print heads, screen-printing frames and screens", "Conveyors, drying units and textile processing machinery"]],
    sk: ["Na textilných a tlačových zariadeniach sa usádzajú farby, lepidlá a vlákna. Proces čistí aj detaily gravírovaných valcov a odstraňuje nánosy pri údržbe zariadení.", ["Tlačové, gravírované a kalandrové valce", "Tlačové hlavy, rámy a sitá pre sieťotlač", "Dopravníky, sušiace jednotky a textilné stroje"]],
    de: ["Farben, Klebstoffe und Fasern sammeln sich an Textil- und Druckanlagen. Der Prozess erreicht Details gravierter Walzen und entfernt Ablagerungen bei der Anlagenwartung.", ["Druck-, Gravur- und Kalanderwalzen", "Druckköpfe, Siebdruckrahmen und Siebe", "Förderanlagen, Trocknungseinheiten und Textilmaschinen"]],
    ja: ["繊維生産・捺染設備には染料、接着剤、繊維くずが付着します。彫刻ローラーの細部や、設備メンテナンス時の堆積物除去に活用されます。", ["印刷、彫刻、カレンダーローラー", "印刷ヘッド、スクリーン印刷枠、スクリーン", "搬送設備、乾燥装置、繊維加工機械"]],
  },
  marine: {
    en: ["Vessel maintenance includes both external surfaces and technical systems. Applications range from hull cleaning and engine-room maintenance to surface preparation during restoration and repainting.", ["Hull surfaces, propellers and propulsion components", "Engine rooms, cooling systems, pipework and heat exchangers", "Decks and preparation before new coatings"]],
    sk: ["Údržba plavidiel zahŕňa vonkajšie povrchy aj technické systémy. Využitie siaha od čistenia plášťov a motorovní po prípravu povrchov pri renováciách a novom lakovaní.", ["Lodné plášte, vrtule a komponenty pohonu", "Motorovne, chladenie, potrubia a výmenníky tepla", "Paluby a príprava pred novými nátermi"]],
    de: ["Schiffswartung umfasst Außenflächen und technische Systeme. Anwendungen reichen von Rumpfreinigung und Maschinenraumwartung bis zur Oberflächenvorbereitung vor Restaurierung und Neulackierung.", ["Rumpfflächen, Propeller und Antriebskomponenten", "Maschinenräume, Kühlung, Leitungen und Wärmetauscher", "Decks und Vorbereitung vor neuen Beschichtungen"]],
    ja: ["船舶のメンテナンスには外部表面と技術システムの両方が含まれます。船体清掃、機関室整備、修復・再塗装前の処理に活用できます。", ["船体表面、プロペラ、推進系の部品", "機関室、冷却系、配管、熱交換器", "甲板と新しい塗装前の処理"]],
  },
  energy: {
    en: ["Energy equipment works under demanding conditions and accumulates oil, dust and carbon deposits. Maintenance applications span power generation, wind energy and refinery infrastructure.", ["Turbine blades, generators and cooling channels", "Mechanical and hydraulic components in wind turbines", "Refinery equipment and components carrying carbon deposits"]],
    sk: ["Energetické zariadenia pracujú v náročných podmienkach a zanášajú sa olejmi, prachom a uhlíkovými nánosmi. Údržba zahŕňa elektrárne, veterné turbíny aj rafinérsku infraštruktúru.", ["Lopatky turbín, generátory a chladiace kanály", "Mechanické a hydraulické komponenty veterných turbín", "Rafinérske zariadenia a komponenty s uhlíkovými nánosmi"]],
    de: ["Energieanlagen arbeiten unter anspruchsvollen Bedingungen und sammeln Öl, Staub und Kohlenstoffablagerungen. Anwendungen umfassen Stromerzeugung, Windenergie und Raffinerieanlagen.", ["Turbinenschaufeln, Generatoren und Kühlkanäle", "Mechanische und hydraulische Windkraftkomponenten", "Raffinerieanlagen und Teile mit Kohlenstoffablagerungen"]],
    ja: ["エネルギー設備は厳しい環境で稼働し、油、粉じん、炭素堆積物が蓄積します。発電、風力、製油所設備のメンテナンスに活用できます。", ["タービン翼、発電機、冷却流路", "風力タービンの機械・油圧部品", "製油所設備と炭素堆積物が付着した部品"]],
  },
};

export const industryReading: Record<Locale, { applications: string; method: string; methodText: string; setupText: string; close: string; drag: string }> = {
  en: {
    applications: "Where it makes a difference", method: "A dry process. A precise approach.",
    methodText: "Compressed air accelerates solid CO₂ pellets towards the surface. Impact, rapid cooling and sublimation work together to release deposits. The dry ice turns into gas; the removed contamination remains for collection.",
    setupText: "The surface, deposit and access to the equipment shape the cleaning setup. ICS can test your own samples and arrange a demonstration, helping you assess the result before choosing a system.",
    close: "Close application details", drag: "Drag down to close",
  },
  sk: {
    applications: "Kde prináša výsledok", method: "Suchý proces. Presný prístup.",
    methodText: "Stlačený vzduch zrýchľuje pelety pevného CO₂ smerom k povrchu. Náraz, rýchle ochladenie a sublimácia spoločne uvoľňujú nánosy. Suchý ľad sa mení na plyn; odstránené nečistoty zostávajú na zozbieranie.",
    setupText: "Nastavenie čistenia závisí od povrchu, nánosu aj prístupu k zariadeniu. ICS môže otestovať vaše vzorky a dohodnúť ukážku, aby ste výsledok posúdili ešte pred výberom systému.",
    close: "Zavrieť detail využitia", drag: "Potiahnite nadol a zatvorte",
  },
  de: {
    applications: "Wo es einen Unterschied macht", method: "Trockenes Verfahren. Präziser Ansatz.",
    methodText: "Druckluft beschleunigt feste CO₂-Pellets zur Oberfläche. Aufprall, schnelle Abkühlung und Sublimation lösen gemeinsam Ablagerungen. Das Trockeneis wird gasförmig; die entfernten Verunreinigungen bleiben zur Aufnahme zurück.",
    setupText: "Oberfläche, Ablagerung und Zugänglichkeit bestimmen die Reinigungseinstellung. ICS kann Ihre eigenen Proben testen und eine Vorführung vereinbaren, damit Sie das Ergebnis vor der Systemwahl beurteilen können.",
    close: "Anwendungsdetails schließen", drag: "Zum Schließen nach unten ziehen",
  },
  ja: {
    applications: "具体的な用途", method: "ドライ方式で、精密に。",
    methodText: "圧縮空気が固体CO₂ペレットを表面へ加速させます。衝撃、急冷、昇華が組み合わさって付着物を取り除きます。ドライアイスは気体に変わり、除去した汚れは回収します。",
    setupText: "表面、付着物、設備へのアクセスに応じて清掃条件を決めます。ICSではお客様のサンプル試験やデモを通じて、システム選定前に結果をご確認いただけます。",
    close: "用途の詳細を閉じる", drag: "下にドラッグして閉じる",
  },
};
