import type { Meta, StoryObj } from "@storybook/react";
import { HotKeyDescription } from "./index";

const meta: Meta<typeof HotKeyDescription> = {
  title: "entities/hot-key/description",
  component: HotKeyDescription,
};

export default meta;

type Story = StoryObj<typeof HotKeyDescription>;

export const Default: Story = {
  args: {
    hotKey: {
      title: "Одобрить",
      legend: "Пробел",
      color: "green",
    },
  },
};
