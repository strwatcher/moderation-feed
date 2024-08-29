import clsx from "clsx";
import type { PropsWithChildren, ReactNode } from "react";
import s from "./link.module.scss";

export type LinkProps = {
	href: string;

	className?: string;
	target?: "_blank" | "_self";
};

export const Link = (props: PropsWithChildren<LinkProps>): ReactNode => {
	const { className, ...rest } = props;
	return <a {...rest} className={clsx(s.root, className)} />;
};
