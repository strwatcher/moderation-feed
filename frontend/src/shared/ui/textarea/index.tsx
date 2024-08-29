import type { ClassNamesMap } from "@/shared/lib/react";
import clsx from "clsx";
import type { ChangeEvent, ReactNode } from "react";
import s from "./textarea.module.scss";

export type TextareaClassNames = "label" | "textarea";
export type TextareaProps = {
	value: string;
	onChange: (value: string) => void;
	label: string;
	classes?: ClassNamesMap<TextareaClassNames>;
};
export const Textarea = (props: TextareaProps): ReactNode => {
	const { value, label, classes, onChange } = props;
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		onChange(e.target.value);
	};

	return (
		<label className={clsx(s.label, classes?.label)}>
			{label}
			<textarea
				className={clsx(s.textarea, classes?.textarea)}
				value={value}
				onChange={handleChange}
			/>
		</label>
	);
};
