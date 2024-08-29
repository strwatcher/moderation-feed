import type { Meta, StoryObj } from "@storybook/react";
import { HotKeys } from "./index";
import { hotKeys } from "../lib";

const meta: Meta<typeof HotKeys> = {
	title: "widgets/hot-keys",
	component: HotKeys,
};

export default meta;

type Story = StoryObj<typeof HotKeys>;

export const Defatult: Story = {
	args: {
		hotKeys,
	},
};
