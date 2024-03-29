import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { PageHeader, PageHeaderProps } from '../../../src';

const meta: Meta<PageHeaderProps> = {
  title: 'Components/Display/PageHeader',
  component: PageHeader,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<PageHeaderProps>;


const defaultArgs: Partial<PageHeaderProps> = {
  title: 'Page Header',
  description: 'Page header is a component that is used to display the page title and breadcrumbs. It can also optionally have a description like this, buttons and more...',
  homeLink: {
    link: '#/components',
  },
  breadcrumbItems: [
    {
      title: 'Components',
      link: '#/components',
    },
    {
      title: 'Navigation',
      link: '#/components/navigation',
    },
    {
      title: 'Page Header',
      link: '#/components/navigation/page-header',
      isActive: true,
    },
  ],
};


export const Primary: Story = {
  args: defaultArgs,
};

export const FullWidth: Story = {
  storyName: 'Full Width',
  tags: ['unlisted'],
  args: {
    ...defaultArgs,
    fill: true,
  },
  render: (args) => (
    <div className="bg-background-lighten-1" style={{ zoom: 0.4 }}>
      <PageHeader {...args} />
    </div>
  ),
};

export const ContainedHeader: Story = {
  storyName: 'Container Width',
  tags: ['unlisted'],
  args: {
    ...defaultArgs,
  },
  render: (args) => (
    <div className="bg-background-lighten-1" style={{ zoom: 0.4 }}>
      <PageHeader {...args} />
    </div>
  ),
};


export const SmallSize: Story = {
  storyName: 'Small Size',
  tags: ['unlisted'],
  args: {
    ...defaultArgs,
    size: 'sm',
  },
};
