import { Indicator } from "@/shared/ui/indicator";
import type { ReactNode } from "react";
import s from "./hot-key-description.module.scss";
import type { HotKey } from "../../lib";

export type HotKeyDescriptionProps = {
  hotKey: HotKey;
};
export const HotKeyDescription = ({
  hotKey: { title, legend, color },
}: HotKeyDescriptionProps): ReactNode => (
  <div className={s.root}>
    <dt className={s.title}>{title}</dt>
    <Indicator color={color} />
    <dd className={s.legend}>{legend}</dd>
  </div>
);
