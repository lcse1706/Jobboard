import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Button",
    type: "button",
  },
};

export const Blue: Story = {
  args: {
    label: "Button",
    type: "button",
    bgColor: "midnight",
  },
};

export const Green: Story = {
  args: {
    label: "Button",
    type: "button",
    bgColor: "green-sea",
  },
};

export const Delete: Story = {
  args: {
    label: "Delete",
    type: "button",
    className: "bg-red-600 hover:bg-red-700",
  },
};
