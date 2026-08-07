import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import SearchResults, { SearchResultsProps } from '../../../src/components/SearchResults';

const meta: Meta<SearchResultsProps> = {
  title: 'Components/Display/SearchResults',
  component: SearchResults,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<SearchResultsProps>;

export const Primary: Story = {
  render: () => (
    <SearchResults
      results={[
        { title: 'Button', description: 'A versatile button component with multiple variants.' },
        { title: 'TextInput', description: 'A text input field with label and validation support.' },
        { title: 'Modal', description: 'A dialog overlay for focused user interactions.' },
      ]}
    />
  ),
};

export const WithLinks: Story = {
  render: () => (
    <SearchResults
      results={[
        { title: 'Getting Started', description: 'Installation and setup guide.', link: '#' },
        { title: 'Theming', description: 'Customize colors, fonts, and styles.', link: '#' },
        { title: 'Components', description: 'Browse all available components.', link: '#' },
      ]}
    />
  ),
};

export const GroupedResults: Story = {
  render: () => (
    <SearchResults
      results={[
        {
          title: 'Components',
          results: [
            { title: 'Button', description: 'Interactive button element.' },
            { title: 'Card', description: 'Container for related content.' },
          ],
        },
        {
          title: 'Hooks',
          results: [
            { title: 'useClipboard', description: 'Copy text to clipboard.' },
            { title: 'useCountUp', description: 'Animated number counter.' },
          ],
        },
      ]}
    />
  ),
};

export const WithIcons: Story = {
  render: () => (
    <SearchResults
      results={[
        {
          title: 'Dashboard',
          description: 'View your project dashboard.',
          iconRenderer: <i className="ri-dashboard-line text-lg" />,
        },
        {
          title: 'Settings',
          description: 'Configure your preferences.',
          iconRenderer: <i className="ri-settings-3-line text-lg" />,
        },
        {
          title: 'Profile',
          description: 'Manage your account details.',
          iconRenderer: <i className="ri-user-line text-lg" />,
        },
      ]}
    />
  ),
};
