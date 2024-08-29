import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Textarea } from "./index";

const meta: Meta<typeof Textarea> = {
	title: "shared/textarea",
	component: Textarea,
	args: {
		onChange: fn(),
		value: "value",
		label: "label",
	},
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
	args: {},
};
