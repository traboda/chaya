import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import ThemeContextDecorator from './ThemeContextDecorator';
import { Dropdown } from '../index';

addDecorator(ThemeContextDecorator);

const meta: Meta = {
  title: 'Content Handlers/Dropdown',
  component: Dropdown,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => {
  return (
      <div className="dsr-bg-gray-200 dsr-flex dsr-pt-10 dsr-items-center dsr-flex-col" style={{ minHeight: '50vh' }}>
          <Dropdown {...args}>
              <div className="dsr-text-lg dsr-font-semibold dsr-py-2 dsr-px-3" style={{ color: 'white', background: '#333' }}>
                  open
              </div>
          </Dropdown>
      </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  showOnHover: false,
  className: '',
  items: [
    {
      'icon': 'fa fa-wallet',
      'title': 'Item 1 with click',
      onClick: () => {
        // setIsOpen(false);
      },
    },
    {
      'icon': 'fa fa-edit',
      'title': 'Item 2 with link',
      'link': '#/item/link',
    },
    {
      'icon': 'fa fa-cog',
      'title': 'Item 3 with renderer',
      renderer: () => (
          <div>
              Custom renderer based component
          </div>
      ),
    },
    {
      'icon': 'fa fa-edit',
      'title': 'Item 4 custom styling',
      'className': 'dsr-bg-red-300',
      'link': '#/item/link',
    },
  ],
};
