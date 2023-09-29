import type { Meta, StoryObj } from '@storybook/react';

import { Navigation } from './Navigation';

const meta = {
  title: 'UI/Navigation',
  component: Navigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    nav: [
      { label: 'Offers', link: '/offers' },
      { label: 'Add Offer', link: '/add' },
      { label: 'About', link: '/about' },
    ],
    style: { width: '600px' },
  },
};
