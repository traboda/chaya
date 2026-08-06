import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import TagSelector from '../../../src/components/TagSelector';

const meta: Meta = {
  title: 'Components/Inputs/TagSelector',
  component: TagSelector,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj;

const tagOptions = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Nuxt', value: 'nuxt' },
];

export const Primary: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('react');
    return <TagSelector options={tagOptions} value={value} onChange={setValue} />;
  },
};

export const MultiSelect: Story = {
  tags: ['unlisted'],
  render: () => {
    const [value, setValue] = React.useState<string[]>(['react', 'nextjs']);
    return <TagSelector options={tagOptions} value={value} onChange={setValue} isMulti />;
  },
};

export const WithLabels: Story = {
  tags: ['unlisted'],
  render: () => {
    const [value, setValue] = React.useState<string[]>(['react']);
    return (
      <TagSelector
        options={tagOptions}
        value={value}
        onChange={setValue}
        isMulti
        labels={{ title: 'Frameworks', helpText: 'Select the frameworks you use' }}
      />
    );
  },
};
