import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Dialog } from "./index";
import { SK } from "@/shared/lib/function";

const meta: Meta<typeof Dialog> = {
	title: "shared/dialog",
	component: Dialog,
	args: {
		onOpenChange: fn(),
		isOpen: true,
		title: "title",
		children: "content",
	},
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
	args: {},
};

export const WithScroll: Story = {
	args: {
		children: Array.from({ length: 30 })
			.map(SK)
			.map((key) => <div key={key}>content {key}</div>),
	},
};
