import type { BriefDecision } from "@/shared/api/brief";

export function extractDecisionMessage(decision?: BriefDecision) {
	if (decision && "message" in decision) {
		return decision.message;
	}
	return "";
}
