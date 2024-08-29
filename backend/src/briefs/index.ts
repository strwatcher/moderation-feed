import Elysia, { t } from "elysia";
import { createBrief } from "./repository";
import { BriefDecisionSchema } from "./domain";

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
export const briefs = new Elysia().group("/briefs", (group) =>
  group
    .get("/", () => ({
      items: Array.from({ length: 10 }).map(() => createBrief()),
    }))
    .post(
      "/approve",
      ({ body }) => {
        if (body.decisions.length === 10) {
          return { status: "ok" };
        }

        return Response.json({ status: "not-ok" }, { status: 400 });
      },
      {
        body: t.Object({
          decisions: t.Array(BriefDecisionSchema),
        }),
      },
    ),
);
