export const categories = [
  { slug: "cleaning", action: "Clean.", title: "Dry ice cleaning machines", intro: "From delicate surfaces to demanding industrial work. Find the right combination of pressure, pellet size and control.", id: "930", image: "/ics/catalog/fbc39930c3e1b635.webp" },
  { slug: "production", action: "Produce.", title: "Dry ice production systems", intro: "Explore ICS pelletizers and integrated production equipment. Find the machine that fits your operation.", id: "859", image: "/ics/pelletizer.webp" },
  { slug: "automation", action: "Automate.", title: "Robotization & automation", intro: "A connected process, from pellet production to packaging. Purpose-built systems designed around your operation.", id: "926", image: "/ics/catalog/ef0459b0aa09ee44.webp" },
  { slug: "accessories", action: "Accessories.", title: "Accessories", intro: "Nozzles, hoses, guns and everything around the machine. Explore the equipment that completes your setup.", id: "871", image: "/ics/catalog/54c39305a110086a.webp" },
] as const;
export type Category = typeof categories[number];
