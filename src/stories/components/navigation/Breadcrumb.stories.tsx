import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Breadcrumb, BreadcrumbProps } from '../../../index';

const meta: Meta<BreadcrumbProps> = {
  title: 'Components/Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<BreadcrumbProps>;

export const Primary: Story = {
  args: {
    items: [
      { link:'#/abc/asdjh', title:'This is my long title' },
      { link:'#/abc/efg/sadkl', title:'Home Page', isActive:true },
    ],
  },
};
