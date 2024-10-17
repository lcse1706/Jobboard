import type { Meta, StoryObj } from "@storybook/react";

import { DesktopNavigation } from "./DesktopNavigation";

const meta = {
  title: "UI/DesktopNavigation",
  component: DesktopNavigation,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DesktopNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    nav: [
      { label: "Home", link: "/" },
      { label: "About", link: "/about" },
      { label: "Contact", link: "/contact" },
    ],
  },
};
