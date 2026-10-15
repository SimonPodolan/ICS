import type { CSSProperties } from "react";
import "./rolling-text.css";

type RollingTextProps = {
  children: string;
  className?: string;
  mode?: "characters" | "phrase" | "words";
};

/** Masked duplicate-line roll adapted from portfoliomato's Navbar/type-link roll.
 * Put `roll-trigger` on the containing link or button. No client JS is needed.
 */
export default function RollingText({ children, className = "", mode = "characters" }: RollingTextProps) {
  const segments = mode === "phrase" ? [children] : children.normalize("NFC").split(/(\s+)/);
  const characterCount = Array.from(children.normalize("NFC")).length;
  const segmentOffsets = segments.map((_, index) => Array.from(segments.slice(0, index).join("")).length);

  const renderMask = (text: string, key: number, delay: number) => (
    <span key={key} className="rolling-text__mask" style={{ "--roll-delay": `${delay}ms` } as CSSProperties}>
      <span className="rolling-text__line">{text}</span>
      <span className="rolling-text__line rolling-text__line--clone" aria-hidden="true">{text}</span>
    </span>
  );

  return (
    <span className={`rolling-text rolling-text--${mode}${className ? ` ${className}` : ""}`}>
      <span className="rolling-text__accessible">{children}</span>
      <span aria-hidden="true">
        {segments.map((segment, index) => {
          if (/^\s+$/.test(segment)) return segment;
          if (mode !== "characters") return renderMask(segment, index, mode === "words" ? Math.min(Math.floor(index / 2) * 25, 100) : 0);
          return <span key={index} className="rolling-text__word">{Array.from(segment).map((character, letterIndex) => {
            const delay = Math.round((segmentOffsets[index] + letterIndex) / Math.max(characterCount - 1, 1) * 100);
            return renderMask(character, letterIndex, delay);
          })}</span>;
        })}
      </span>
    </span>
  );
}
