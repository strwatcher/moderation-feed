import { t } from "elysia";

export type Brief = {
  id: number;
  publishDate: number;
  publishDateString: string;
  ownerId: number;
  ownerLogin: string;
  bulletinSubject: string;
  bulletinText: string;
  bulletinImages: string[];
};

export const AcceptBriefDecisionSchema = t.Object({
  id: t.Integer(),
  status: t.Literal("accept"),
});

export const DeclineBriefDecisionSchema = t.Object({
  id: t.Integer(),
  status: t.Literal("decline"),
});

export const EscalateBriefDecisionSchema = t.Object({
  id: t.Integer(),
  status: t.Literal("escalate"),
});

export const BriefDecisionSchema = t.Union([
  AcceptBriefDecisionSchema,
  DeclineBriefDecisionSchema,
  EscalateBriefDecisionSchema,
]);
