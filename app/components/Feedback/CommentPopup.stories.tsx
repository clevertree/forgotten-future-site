import type { Meta, StoryObj } from '@storybook/react';
import { SessionProvider } from 'next-auth/react';
import { CommentPopup } from './CommentPopup';

const meta = {
  title: 'Components/Feedback/CommentPopup',
  component: CommentPopup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SessionProvider>
        <Story />
      </SessionProvider>
    ),
  ],
  argTypes: {
    onClose: { action: 'closed' },
    onSuccess: { action: 'success' },
  },
} satisfies Meta<typeof CommentPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Anonymous: Story = {
  args: {
    path: '/manuscript/chapter_01.md',
    anchorId: 'scene-1',
    onClose: () => {},
    onSuccess: () => {},
  },
};

export const Default: Story = {
  args: {
    path: '/manuscript/chapter_02.md',
    anchorId: 'dialogue-1',
    onClose: () => {},
    onSuccess: () => {},
  },
  parameters: {
    nextauth: {
      enabled: false,
    },
  },
};
