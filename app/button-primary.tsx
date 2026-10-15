import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import RollingText from "./rolling-text";
import Icon from "./site-icon";
import "./action-styles.css";

type SharedProps = {
  children: string;
  className?: string;
  icon?: "arrow" | "diagonal";
};
type ButtonProps = SharedProps & Omit<ComponentPropsWithoutRef<"button">, keyof SharedProps> & { href?: never };
type LinkProps = SharedProps & Omit<ComponentPropsWithoutRef<"a">, keyof SharedProps | "href"> & { href: string };

/** The primary action preset: green surface, character roll and a shared arrow. */
export default function ButtonPrimary({ children, className = "", icon = "arrow", ...props }: ButtonProps | LinkProps) {
  const classes = `button-primary ui-action ui-action--primary roll-trigger${className ? ` ${className}` : ""}`;
  const content = <><RollingText>{children}</RollingText><Icon name={icon} /></>;
  if (props.href !== undefined) {
    const { href, ...attributes } = props;
    return /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)
      ? <a {...attributes} href={href} className={classes}>{content}</a>
      : <Link {...attributes} href={href} className={classes}>{content}</Link>;
  }
  const { type = "button", ...attributes } = props;
  return <button {...attributes} type={type} className={classes}>{content}</button>;
}
