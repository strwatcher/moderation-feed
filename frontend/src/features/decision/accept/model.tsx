import type {
	DeclineBriefDecision,
	EscalateBriefDecision,
} from "@/shared/api/brief";
import { voidFunction } from "@/shared/lib/function";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import type { PropsWithChildren, ReactNode } from "react";

export type CommentableDecision = EscalateBriefDecision | DeclineBriefDecision;

export type CommentableDecisionData = {
	decisionPayload: CommentableDecision | null;
	message: string;
	isAcceptDisabled: boolean;
};

export type CommentableDecisionActions = {
	setMessage: (message: string) => void;
	setDecisionPayload: (decisionPayload: CommentableDecision | null) => void;
	reset: () => void;
};

const initialCommentableDecisionData: CommentableDecisionData = {
	decisionPayload: null,
	message: "",
	isAcceptDisabled: true,
};

const initialCommentableDecisionActions: CommentableDecisionActions = {
	setMessage: voidFunction,
	setDecisionPayload: voidFunction,
	reset: voidFunction,
};

export const CommentableDecisionDataContext = createContext(
	initialCommentableDecisionData,
);
export const CommentableDecisionActionsContext = createContext(
	initialCommentableDecisionActions,
);

export const CommentableDecisionModelProvider = ({
	children,
}: PropsWithChildren): ReactNode => {
	const [decisionPayload, setDecisionPayload] =
		useState<CommentableDecision | null>(null);
	const [message, setMessage] = useState("");
	const isAcceptDisabled = useMemo(() => message.length === 0, [message]);

	const reset = useCallback(() => {
		setDecisionPayload(null);
	}, []);

	useEffect(() => {
		setMessage(decisionPayload?.message ?? "");
	}, [decisionPayload]);

	return (
		<CommentableDecisionActionsContext.Provider
			value={{ setDecisionPayload, setMessage, reset }}
		>
			<CommentableDecisionDataContext.Provider
				value={{ message, decisionPayload, isAcceptDisabled }}
			>
				{children}
			</CommentableDecisionDataContext.Provider>
		</CommentableDecisionActionsContext.Provider>
	);
};

export const useCommentableDecisionModel = () => {
	return {
		data: useContext(CommentableDecisionDataContext),
		actions: useContext(CommentableDecisionActionsContext),
	};
};
