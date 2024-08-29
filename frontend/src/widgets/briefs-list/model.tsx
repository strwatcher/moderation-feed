import {
	approveBriefsDecisions,
	ApproveBriefsDecisionsRequest,
	getBriefs,
	type Brief,
	type BriefDecision,
} from "@/shared/api/brief";
import { RequestParams } from "@/shared/api/lib";
import { useResource } from "@/shared/api/use-resource";
import { voidFunction } from "@/shared/lib/function";
import { useNotification } from "@/shared/lib/snackbar";
import { createContext, useContext, useState, useCallback } from "react";
import type { PropsWithChildren } from "react";

type BriefsData = {
	currentBrief: number | null; // brief id
	briefs: Brief[];
	decisions: BriefDecision[];
	loading: boolean;
	approveStatus: null | "ok";
};

type BriefsActions = {
	triggerBriefsRequest: () => void;
	triggerDecisionsApprove: (
		params: RequestParams<ApproveBriefsDecisionsRequest>,
	) => void;
	setCurrentBrief: (id: number | null) => void;
	addDecision: (decision: BriefDecision) => void;
};

const briefsDataInitial: BriefsData = {
	currentBrief: null,
	briefs: [],
	decisions: [],
	loading: false,
	approveStatus: null,
};

const briefsActionsInitial: BriefsActions = {
	triggerBriefsRequest: voidFunction,
	triggerDecisionsApprove: voidFunction,
	setCurrentBrief: voidFunction,
	addDecision: voidFunction,
};

export const BriefsDataContext = createContext<BriefsData>(briefsDataInitial);

export const BriefsActionsContext =
	createContext<BriefsActions>(briefsActionsInitial);

export const BriefsModelProvider = ({ children }: PropsWithChildren) => {
	const {
		data: { items: briefs },
		loading,
		triggerRequest: triggerBriefsRequest,
	} = useResource({ request: getBriefs, initial: { items: [] } });

	const [currentBrief, setCurrentBrief] = useState<number | null>(null);
	const [decisions, setDecisions] = useState<BriefDecision[]>([]);

	const showNotification = useNotification();
	const { data: approveStatus, triggerRequest: triggerDecisionsApprove } =
		useResource({
			request: approveBriefsDecisions,
			params: { body: { decisions } },
			initial: null,
			onSuccess: () => {
				setDecisions([]);
				triggerBriefsRequest();
				showNotification({ message: "Принятые решения успешно сохранены" });
			},
			onFailure: () => {
				showNotification({
					message: "Не удалось сохранить принятые решения",
					variant: "error",
				});
			},
		});

	const addDecision = useCallback(
		(decision: BriefDecision) => {
			let result: BriefDecision[];
			if (decisions.some(({ id }) => id === decision.id)) {
				result = decisions.map((oldDecision) =>
					oldDecision.id === decision.id ? { ...decision } : oldDecision,
				);
			} else {
				result = decisions.concat({ ...decision });
			}

			setDecisions(result);
			setCurrentBrief(
				briefs.find((brief) => result.every(({ id }) => id !== brief.id))?.id ??
				null,
			);
		},
		[decisions, briefs],
	);

	return (
		<BriefsActionsContext.Provider
			value={{
				setCurrentBrief,
				triggerBriefsRequest,
				addDecision,
				triggerDecisionsApprove,
			}}
		>
			<BriefsDataContext.Provider
				value={{
					currentBrief,
					briefs,
					loading,
					decisions,
					approveStatus: approveStatus?.status ?? null,
				}}
			>
				{children}
			</BriefsDataContext.Provider>
		</BriefsActionsContext.Provider>
	);
};

export const useBriefsModel = () => {
	return {
		data: useContext(BriefsDataContext),
		actions: useContext(BriefsActionsContext),
	};
};
