import { Meta, StoryObj } from '@storybook/react-vite';

import PageHeader, { PageHeaderProps } from '../../../src/components/PageHeader';

const meta: Meta<PageHeaderProps> = {
  title: 'Components/Navigation/PageHeader',
  component: PageHeader,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<PageHeaderProps>;

export const Primary: Story = {
  args: {
    title: 'Breadcrumb',
    description:
      'A breadcrumb is a secondary navigation scheme that reveals the user’s location in a website or web application.',
    breadcrumbItems: [
      { link: '#/components', title: 'Components' },
      { link: '#/components/navigation', title: 'Navigation' },
      { link: '#/components/navigation/breadcrumb', title: 'Breadcrumb', isActive: true },
    ],
  },
};
