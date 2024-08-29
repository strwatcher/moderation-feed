import { HumanIcon } from "@/assets/icons";
import type { Brief, BriefDecision } from "@/shared/api/brief";
import { Card } from "@/shared/ui/card";
import { Indicator, type IndicatorColor } from "@/shared/ui/indicator";
import { Link } from "@/shared/ui/link";
import { useCallback, useEffect, useRef } from "react";
import type { KeyboardEventHandler, ReactNode } from "react";
import s from "./brief-card.module.scss";
import clsx from "clsx";

export type BriefCardProps = {
	brief: Brief;
	hasFocus: boolean;
	decision?: BriefDecision["status"];
	onFocus: () => void;
	onKeyDown: KeyboardEventHandler;
};

const mapDecisionStatusToIndicatorColor: Record<
	BriefDecision["status"],
	IndicatorColor
> = {
	accept: "green",
	decline: "orange",
	escalate: "blue",
};

type BriefCardHeaderContentProps = Pick<
	Brief,
	"id" | "publishDateString" | "ownerLogin"
>;

const BriefCardHeaderContent = ({
	id,
	publishDateString,
	ownerLogin,
}: BriefCardHeaderContentProps): ReactNode => (
	<>
		<span className={s.info}>
			<Link href={"#"}>{id}</Link> — <span>{publishDateString}</span>
		</span>
		<span className={s.info}>
			<HumanIcon />
			<Link href={"#"}>{ownerLogin}</Link>
		</span>
	</>
);

export const BriefCard = (props: BriefCardProps): ReactNode => {
	const { brief, hasFocus, decision, ...rest } = props;
	const ref = useRef<HTMLElement | null>(null);

	const focus = useCallback(() => {
		if (ref.current) {
			ref.current.focus();
		}
	}, []);

	useEffect(() => {
		hasFocus && focus();
	}, [hasFocus, focus]);

	return (
		<Card
			ref={ref}
			tabIndex={-1}
			classes={{
				root: clsx(s.root, s.focused),
				header: s.header,
				content: s.content,
			}}
			header={<BriefCardHeaderContent {...brief} />}
			{...rest}
		>
			<>
				<h2 className={s.subject}>{brief.bulletinSubject}</h2>
				<div className={s.sections}>
					<section className={s.textSection}>
						<p className={s.text}>{brief.bulletinText}</p>
					</section>
					<section className={s.imagesSection}>
						{brief.bulletinImages.map((image, index) => (
							<img
								className={s.image}
								// biome-ignore lint/suspicious/noArrayIndexKey: images don't have id's and their order will not change
								key={index}
								src={image}
								alt={`image-${index}`}
							/>
						))}
					</section>
				</div>
				{decision && (
					<Indicator
						className={s.indicator}
						color={mapDecisionStatusToIndicatorColor[decision]}
					/>
				)}
			</>
		</Card>
	);
};
