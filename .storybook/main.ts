import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    // "@storybook/addon-styling-webpack",
    "@storybook/addon-themes",
    // {
    //   name: "@storybook/addon-styling",
    //   options: {
    //     postCss: {
    //       implementation: require.resolve("postcss"),
    //     },
    //   },
    // },
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
