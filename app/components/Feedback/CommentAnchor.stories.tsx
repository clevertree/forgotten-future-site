import type { Meta, StoryObj } from '@storybook/react';
import { CommentAnchor } from './CommentAnchor';

const meta = {
  title: 'Components/Feedback/CommentAnchor',
  component: CommentAnchor,
  tags: ['autodocs'],
  argTypes: {
    onOpenComment: { action: 'opened comment' },
    isActive: { control: 'boolean' },
  },
} satisfies Meta<typeof CommentAnchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    children: <p className="text-white">Hover over me to comment</p>,
    path: '/manuscript/chapter_01.md',
    anchorId: 'scene-1',
    isActive: true,
    onOpenComment: () => {},
  },
};

export const Inactive: Story = {
  args: {
    children: <p className="text-white">Comments disabled</p>,
    path: '/manuscript/chapter_01.md',
    anchorId: 'scene-1',
    isActive: false,
    onOpenComment: () => {},
  },
};

export const WithLongText: Story = {
  args: {
    children: (
      <p className="text-white">
        This is a longer passage that you might want to comment on. It contains multiple sentences and allows users to leave feedback about specific story elements.
      </p>
    ),
    path: '/manuscript/chapter_02.md',
    anchorId: 'dialogue-1',
    isActive: true,
    onOpenComment: () => {},
  },
};
