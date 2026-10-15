import Image from "next/image";
import type { Locale } from "./content";
import { engineeringCopy } from "./engineering-content";
import "./engineering-story.css";

export default function EngineeringStory({ locale }: { locale: Locale }) {
  const copy = engineeringCopy[locale];

  return (
    <section id="engineering" className="engineering-story" aria-labelledby="engineering-title">
      <div className="engineering-photo">
        <Image src="/ics/engineering-production.jpg" alt={copy.imageAlt} fill sizes="(max-width: 900px) 100vw, 50vw" />
      </div>
      <div className="engineering-copy">
        <h2 id="engineering-title">{copy.title[0]}<br /><span>{copy.title[1]}</span></h2>
        <p className="engineering-intro">{copy.intro}</p>
        <div className="engineering-details">
          {copy.rows.map((row, index) => (
            <details className="engineering-row" key={index} name="engineering-details">
              <summary>{row.title}<span aria-hidden="true">+</span></summary>
              <p>{row.text}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
