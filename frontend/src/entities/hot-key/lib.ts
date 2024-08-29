import type { IndicatorColor } from "@/shared/ui/indicator";

export type HotKey = {
	id: number;
	title: string;
	legend: string;

	color?: IndicatorColor;
};
