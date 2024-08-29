import clsx from "clsx";
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import s from "./button.module.scss";

export type ButtonProps = DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export const Button = (props: ButtonProps): ReactNode => {
	const { className, ...rest } = props;
	return <button {...rest} className={clsx(s.root, className)} />;
};
