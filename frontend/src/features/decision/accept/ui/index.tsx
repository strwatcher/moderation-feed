import { Button } from "@/shared/ui/button";
import { Dialog } from "@/shared/ui/dialog";
import { Form } from "@/shared/ui/form";
import { Textarea } from "@/shared/ui/textarea";
import type { ReactNode } from "react";
import { useCallback } from "react";
import {
	type CommentableDecision,
	useCommentableDecisionModel,
} from "../model";
import s from "./accept-decision-dialog.module.scss";

export type AcceptDecisionDialogProps = {
	onSubmit: (decision: Exclude<CommentableDecision, null>) => void;
	onClose: (briefId: number | null) => void;
};

export const AcceptDecisionDialog = ({
	onSubmit,
	onClose,
}: AcceptDecisionDialogProps): ReactNode => {
	const { data, actions } = useCommentableDecisionModel();

	const handleSubmit = useCallback(() => {
		if (data.decisionPayload === null) return;
		onSubmit({ ...data.decisionPayload, message: data.message });
		actions.reset();
	}, [onSubmit, data.decisionPayload, actions.reset, data.message]);

	const handleOpenChange = useCallback(
		(isOpen: boolean) => {
			if (!isOpen) {
				onClose(data.decisionPayload?.id ?? null);
				actions.setDecisionPayload(null);
			}
		},
		[actions.setDecisionPayload, data.decisionPayload],
	);

	return (
		<Dialog
			title="Подтвердите свое решение"
			isOpen={data.decisionPayload !== null}
			onOpenChange={handleOpenChange}
		>
			<Form onSubmit={handleSubmit} className={s.form}>
				<Textarea
					classes={{ textarea: s.textarea }}
					label="Комментарий"
					value={data.message}
					onChange={actions.setMessage}
				/>
				<Button disabled={data.isAcceptDisabled} type="submit">
					Подтвердить
				</Button>
			</Form>
		</Dialog>
	);
};
