import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./index";

const meta: Meta<typeof Link> = {
  title: "shared/link",
  component: Link,
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Defatult: Story = {
  args: {
    href: "#",
    children: "Link",
  },
};
