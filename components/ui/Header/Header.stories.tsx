import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { DesktopNavigation } from "../Navigation/DesktopNavigation";
import { Header } from "./Header";

const meta = {
  title: "UI/Header",
  component: Header,
  parameters: {
    layout: "",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const nav = [
  { label: "Offers", link: "/dashboard" },
  { label: "Add Offer", link: "/add" },
  { label: "Contact", link: "/contact" },
];

// export const Primary: Story = {
//   args: {
//     children: <DesktopNavigation nav={nav} />,
//   },
// };
export const Primary: Story = {
  args: {
    children: "Navigation",
  },
};
