import type { Meta, StoryObj } from "@storybook/react";

import { MobileNavigation } from "./MobileNavigation";

const meta = {
  title: "UI/MobileNavigation",
  component: MobileNavigation,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MobileNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Mobile: Story = {
  args: {
    nav: [
      { label: "Home", link: "/" },
      { label: "About", link: "/about" },
      { label: "Contact", link: "/contact" },
    ],
    isOpen: true,
    handleHamburger: () => {},
  },
};
