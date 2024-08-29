import type { Meta, StoryObj } from "@storybook/react";
import { Indicator } from "./index";

const meta: Meta<typeof Indicator> = {
	title: "shared/indicator",
	component: Indicator,
};

export default meta;

type Story = StoryObj<typeof Indicator>;

export const Green: Story = {
	args: {
		color: "green",
	},
};

export const Orange: Story = {
	args: {
		color: "orange",
	},
};

export const Blue: Story = {
	args: {
		color: "blue",
	},
};
