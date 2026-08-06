import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import VisualPicker from '../../../src/components/VisualPicker';

const meta: Meta = {
  title: 'Components/Inputs/VisualPicker',
  component: VisualPicker,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj;

const planItems = [
  { value: 'free', title: 'Free', description: 'For personal projects', icon: 'ri-user-line' as const },
  { value: 'pro', title: 'Pro', description: 'For professionals', icon: 'ri-vip-crown-line' as const },
  { value: 'team', title: 'Team', description: 'For growing teams', icon: 'ri-team-line' as const },
  { value: 'enterprise', title: 'Enterprise', description: 'For large orgs', icon: 'ri-building-line' as const },
];

export const Primary: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('pro');
    return <VisualPicker items={planItems} value={value} onChange={setValue} label="Select a plan" />;
  },
};

export const Vertical: Story = {
  name: 'Vertical Layout',
  tags: ['unlisted'],
  render: () => {
    const [value, setValue] = React.useState<string>('pro');
    return <VisualPicker items={planItems} value={value} onChange={setValue} isVertical label="Select a plan" />;
  },
};

export const MultiSelect: Story = {
  tags: ['unlisted'],
  render: () => {
    const [value, setValue] = React.useState<string[]>(['pro']);
    return <VisualPicker items={planItems} value={value} onChange={setValue} isMulti label="Select plans" />;
  },
};
