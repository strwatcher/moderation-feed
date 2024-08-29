import { BriefCard } from "@/entities/brief/ui/card";
import { useCommentableDecisionModel } from "@/features/decision/accept/model";
import { AcceptDecisionDialog } from "@/features/decision/accept/ui";
import {
	handleDel,
	handleEnter,
	handleF7,
	handleShiftEnter,
	handleSpace,
	compose,
} from "@/shared/lib/keyboard";
import { extractDecisionMessage } from "../lib";
import { useBriefsModel } from "../model";
import s from "./briefs-list.module.scss";
import { useEffect } from "react";
import { Loader } from "@/shared/ui/loader";

export const BriefsList = () => {
	const {
		data: { loading, briefs, currentBrief, decisions },
		actions: {
			setCurrentBrief,
			addDecision,
			triggerDecisionsApprove,
			triggerBriefsRequest,
		},
	} = useBriefsModel();
	const {
		data: { decisionPayload },
		actions: { setDecisionPayload },
	} = useCommentableDecisionModel();

	useEffect(() => {
		if (decisionPayload !== null) return;

		const handleGlobalKeyboardEvents = (e: KeyboardEvent) => {
			compose(
				handleEnter(() => {
					if (briefs.length > 0) return;
					triggerBriefsRequest();
				}),
				handleF7(() => triggerDecisionsApprove({ body: { decisions } })),
			)(e);
		};

		window.addEventListener("keydown", handleGlobalKeyboardEvents);

		return () => {
			window.removeEventListener("keydown", handleGlobalKeyboardEvents);
		};
	}, [briefs, decisionPayload, decisions]);

	useEffect(() => {
		setCurrentBrief(briefs[0]?.id ?? null);
	}, [briefs]);

	if (loading) {
		return <Loader />;
	}

	if (!loading && briefs.length === 0) {
		return (
			<p className={s.caption}>Нажмите Enter, чтобы загрузить объявления</p>
		);
	}

	return (
		<div tabIndex={0} className={s.root}>
			<AcceptDecisionDialog onClose={setCurrentBrief} onSubmit={addDecision} />
			{briefs.map((brief) => {
				return (
					<BriefCard
						onKeyDown={compose(
							handleSpace(() =>
								addDecision({ status: "accept", id: brief.id }),
							),
							handleDel(() => {
								setDecisionPayload({
									status: "decline",
									id: brief.id,
									message: extractDecisionMessage(
										decisions.find(({ id }) => id === brief.id),
									),
								});
								setCurrentBrief(null);
							}),
							handleShiftEnter(() => {
								setDecisionPayload({
									status: "escalate",
									id: brief.id,
									message: extractDecisionMessage(
										decisions.find(({ id }) => id === brief.id),
									),
								});
								setCurrentBrief(null);
							}),
						)}
						brief={brief}
						hasFocus={currentBrief === brief.id}
						onFocus={() => setCurrentBrief(brief.id)}
						key={brief.id}
						decision={
							decisions.find((decision) => decision.id === brief.id)?.status
						}
					/>
				);
			})}
		</div>
	);
};
