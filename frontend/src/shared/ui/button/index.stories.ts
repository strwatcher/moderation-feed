import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

const meta: Meta<typeof Button> = {
	title: "shared/button",
	component: Button,

	args: {
		children: "Button",
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Defatult: Story = {};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
