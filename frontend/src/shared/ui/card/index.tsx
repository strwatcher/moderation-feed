import clsx from "clsx";
import { forwardRef } from "react";
import type { PropsWithChildren, ReactNode, KeyboardEvent } from "react";
import s from "./card.module.scss";
import type { ClassNamesMap } from "@/shared/lib/react";

export type CardClassNames = "root" | "header" | "content";

export type CardProps = PropsWithChildren<{
  classes?: ClassNamesMap<CardClassNames>;
  header?: ReactNode;
  tabIndex?: number;
  onClick?: () => void;
  onFocus?: () => void;
  onKeyDown?: (event: KeyboardEvent) => void;
}>;
export const Card = forwardRef<HTMLElement, CardProps>((props, ref) => {
  const { children, header, classes, ...rest } = props;
  return (
    <article {...rest} className={clsx(s.root, classes?.root)} ref={ref}>
      <header className={clsx(s.header, classes?.header)}>{header}</header>
      <div className={clsx(s.content, classes?.content)}>{children}</div>
    </article>
  );
});
