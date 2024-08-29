import type { PropsWithChildren, ReactNode } from "react";
import {
	Root,
	Close,
	Title,
	Content,
	Overlay,
	Portal,
} from "@radix-ui/react-dialog";
import { CrossIcon } from "@/assets/icons";
import s from "./dialog.module.scss";

export type DialogProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	title: string;
};

export const Dialog = (props: PropsWithChildren<DialogProps>): ReactNode => {
	const { children, title, isOpen, onOpenChange } = props;
	return (
		<Root open={isOpen} onOpenChange={onOpenChange}>
			<Portal>
				<Overlay className={s.overlay}>
					<Content className={s.content}>
						<Title>{title}</Title>
						{children}
						<Close className={s.close}>
							<CrossIcon />
						</Close>
					</Content>
				</Overlay>
			</Portal>
		</Root>
	);
};
