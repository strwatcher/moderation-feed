import { arr, num, obj, or, str, val, nothing } from "@withease/contracts";
import type { UnContract } from "@withease/contracts";
import { createRequest } from "./lib";

export const briefContract = obj({
	id: num,
	publishDate: num,
	publishDateString: str,
	ownerId: num,
	ownerLogin: str,
	bulletinSubject: str,
	bulletinText: str,
	bulletinImages: arr(str),
});

export type Brief = UnContract<typeof briefContract>;

export const getBriefsResponseContract = obj({
	items: arr(briefContract),
});

export const getBriefs = createRequest({
	url: "/api/briefs",
	method: "GET",
	contract: getBriefsResponseContract,
});

export type AcceptBriefDecision = {
	id: number;
	status: "accept";
};

export type DeclineBriefDecision = {
	id: number;
	status: "decline";
	message: string;
};

export type EscalateBriefDecision = {
	id: number;
	status: "escalate";
	message: string;
};

export type BriefDecision =
	| AcceptBriefDecision
	| DeclineBriefDecision
	| EscalateBriefDecision;

export type ApproveBriefsDecisionsRequest = {
	decisions: BriefDecision[];
};

export const approveBriefsDecisionsResponseContract = obj({
	status: or(val("ok"), nothing),
});

export type ApproveBriefsDecisionsResponse = UnContract<
	typeof approveBriefsDecisionsResponseContract
>;

export const approveBriefsDecisions = createRequest<
	ApproveBriefsDecisionsRequest,
	ApproveBriefsDecisionsResponse
>({
	url: "/api/briefs/approve",
	method: "POST",
	contract: approveBriefsDecisionsResponseContract,
});
