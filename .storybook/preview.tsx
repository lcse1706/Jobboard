import React from "react";

import type { Preview } from "@storybook/react";
import { SessionProvider } from "next-auth/react";

import "../app/globals.css";

const mockSession = {
  expires: "2023-01-01T00:00:00Z",
  user: {
    name: "Storybook User",
    email: "storybook@mySite.com",
  },
};

export const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const decorators = [
  (Story) => (
    <SessionProvider session={mockSession}>
      <Story />
    </SessionProvider>
  ),
];
