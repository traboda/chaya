import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import SearchBox, { SearchBoxProps } from '../../../src/components/SearchBox';

const meta: Meta<SearchBoxProps> = {
  title: 'Components/Inputs/SearchBox',
  component: SearchBox,
  parameters: {
    controls: { expanded: true },
    actions: { disable: true },
  },
};

export default meta;

type Story = StoryObj<SearchBoxProps>;

const SearchBoxTemplate = (props: Partial<SearchBoxProps>) => {
  const [keyword, setKeyword] = React.useState('');
  return <SearchBox keyword={keyword} setKeyword={setKeyword} {...props} />;
};

export const Primary: Story = {
  render: () => <SearchBoxTemplate />,
};

export const WithCustomPlaceholder: Story = {
  render: () => (
    <SearchBoxTemplate labels={{ label: 'Find Components', placeholder: 'Search components...' }} />
  ),
};

export const HiddenButton: Story = {
  render: () => <SearchBoxTemplate hideButton />,
};

export const HiddenLabel: Story = {
  render: () => <SearchBoxTemplate hideLabel />,
};

export const Disabled: Story = {
  render: () => <SearchBoxTemplate isDisabled />,
};

export const Loading: Story = {
  render: () => <SearchBoxTemplate isLoading />,
};

export const AutoFocused: Story = {
  render: () => <SearchBoxTemplate autoFocus />,
};
