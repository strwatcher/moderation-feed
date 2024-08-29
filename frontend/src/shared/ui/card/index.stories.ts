import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./index";

const meta: Meta<typeof Card> = {
  title: "shared/card",
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Defatult: Story = {
  args: {
    header: "Card header",
    children: "Card content",
  },
};
