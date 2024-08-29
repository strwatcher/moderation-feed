import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Textarea } from "../textarea";
import { Form } from "./index";
import { Button } from "../button";

const meta: Meta<typeof Form> = {
	title: "shared/form",
	component: Form,
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Defatult: Story = {
	args: {
		children: (
			<>
				<Textarea label="Textarea label" value={""} onChange={fn()} />
				<Button type="submit">Submit</Button>
			</>
		),
		onSubmit: fn(),
	},
};
