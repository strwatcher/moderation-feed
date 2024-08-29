import clsx from "clsx";
import type { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from "react";
import { useCallback } from "react";
import s from "./form.module.scss";

export type FormProps = DetailedHTMLProps<
	FormHTMLAttributes<HTMLFormElement>,
	HTMLFormElement
>;

export const Form = (props: FormProps): ReactNode => {
	const { onSubmit, onReset, className, ...rest } = props;
	const handleSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			onSubmit?.(event);
		},
		[onSubmit],
	);
	const handleReset = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			onReset?.(event);
		},
		[onReset],
	);
	return (
		<form
			{...rest}
			onSubmit={handleSubmit}
			onReset={handleReset}
			className={clsx(s.root, className)}
		/>
	);
};
