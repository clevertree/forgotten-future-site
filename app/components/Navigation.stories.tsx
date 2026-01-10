import type { Meta, StoryObj } from '@storybook/react';
import Navigation from './Navigation';

const meta = {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="bg-black">
      <Navigation />
    </div>
  ),
};

export const Desktop: Story = {
  render: () => (
    <div className="bg-black">
      <Navigation />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const Mobile: Story = {
  render: () => (
    <div className="bg-black">
      <Navigation />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
};
