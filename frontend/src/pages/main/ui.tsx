import { CommentableDecisionModelProvider } from "@/features/decision/accept/model";
import { Layout } from "@/shared/ui/layout";
import { BriefsModelProvider } from "@/widgets/briefs-list/model";
import { BriefsList } from "@/widgets/briefs-list/ui";
import { HotKeys } from "@/widgets/hot-keys/ui";

export const Page = () => {
	return (
		<BriefsModelProvider>
			<CommentableDecisionModelProvider>
				<Layout aside={<HotKeys />}>
					<BriefsList />
				</Layout>
			</CommentableDecisionModelProvider>
		</BriefsModelProvider>
	);
};
