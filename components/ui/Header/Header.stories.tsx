import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from '../Navigation/Navigation';

import { Header } from './Header';

const meta = {
  title: 'UI/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    titel: 'Header',
    children: (
      <Navigation
        nav={[
          { label: 'Offers', link: '/offers' },
          { label: 'Add Offer', link: '/add' },
          { label: 'About', link: '/about' },
        ]}
      />
    ),
  },
};
