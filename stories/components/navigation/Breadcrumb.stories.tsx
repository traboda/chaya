import { Meta, StoryObj } from '@storybook/react';

import Breadcrumb, { BreadcrumbProps } from '../../../src/components/Breadcrumb';

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
      { link:'#/components', title:'Components' },
      { link:'#/components/navigation', title:'Navigation' },
      { link:'#/components/navigation/breadcrumb', title:'Breadcrumb', isActive:true },
    ],
  },
};
