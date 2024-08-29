import type { PropsWithChildren, ReactNode } from "react";
import s from "./layout.module.scss";

export type LayoutProps = {
  aside: ReactNode;
};
export const Layout = (props: PropsWithChildren<LayoutProps>): ReactNode => {
  const { aside, children } = props;
  return (
    <div className={s.root}>
      <section className={s.main}>{children}</section>
      <aside className={s.aside}>{aside}</aside>
    </div>
  );
};
