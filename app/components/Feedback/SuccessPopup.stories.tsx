import type { Meta, StoryObj } from '@storybook/react';
import { SuccessPopup } from './SuccessPopup';

const meta = {
  title: 'Components/Feedback/SuccessPopup',
  component: SuccessPopup,
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof SuccessPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    prUrl: 'https://github.com/clevertree/forgotten-future-site/pull/123',
    onClose: () => {},
  },
};

export const AnotherPR: Story = {
  args: {
    prUrl: 'https://github.com/clevertree/forgotten-future-site/pull/456',
    onClose: () => {},
  },
};
