import type { ClassNamesMap } from "@/shared/lib/react";
import clsx from "clsx";
import type { ReactNode } from "react";
import s from "./indicator.module.scss";

export type IndicatorColor = "green" | "orange" | "blue";
export type IndicatorProps = {
	color?: IndicatorColor;
	className?: string;
};

export const mapIndicatorColorToClassName: ClassNamesMap<IndicatorColor> = {
	green: s.hasGreenColor,
	orange: s.hasOrangeColor,
	blue: s.hasBlueColor,
};

export const Indicator = ({ color, className }: IndicatorProps): ReactNode => (
	<div
		className={clsx(
			s.root,
			color && mapIndicatorColorToClassName[color],
			className,
		)}
	/>
);
