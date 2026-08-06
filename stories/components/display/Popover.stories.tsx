import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import Popover from '../../../src/components/Popover';
import Button from '../../../src/components/Button';

const meta: Meta = {
  title: 'Components/Display/Popover',
  component: Popover,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: () => (
    <div className="flex justify-center py-20">
      <Popover
        cardRenderer={
          <div className="p-4 w-64">
            <h3 className="font-semibold mb-2">Popover Content</h3>
            <p className="text-sm opacity-80">This is a popover with some helpful information.</p>
          </div>
        }
      >
        <Button>Click me</Button>
      </Popover>
    </div>
  ),
};

export const Sides: Story = {
  tags: ['unlisted'],
  render: () => (
    <div className="flex justify-center items-center gap-4 py-20">
      {(['top', 'bottom', 'left', 'right'] as const).map(side => (
        <Popover
          key={side}
          side={side}
          cardRenderer={
            <div className="p-3 text-sm">Popover on {side}</div>
          }
        >
          <Button variant="minimal">{side}</Button>
        </Popover>
      ))}
    </div>
  ),
};
