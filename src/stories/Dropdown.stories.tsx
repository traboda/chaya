import React from 'react';
import { addDecorator, Meta, Story } from '@storybook/react';

import { Dropdown } from '../index';

import ThemeContextDecorator from './ThemeContextDecorator';

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
              <div className="dsr-text-lg dsr-font-semibold dsr-py-2 dsr-px-3 dsr-rounded-lg" style={{ color: 'white', background: '#333' }}>
                  open
              </div>
          </Dropdown>
      </div>
  );
};

export const Default = Template.bind({});

const FiveCorners: Story = args => {
  return (
      <div className="dsr-bg-gray-200 dsr-flex dsr-pt-10 dsr-items-center dsr-flex-col">
          <div className="dsr-fixed dsr-top-0 dsr-left-0 dsr-m-4">
              <Dropdown {...args}>
                  <div className="dsr-text-lg dsr-font-semibold dsr-py-2 dsr-px-3 dsr-rounded-lg" style={{ color: 'white', background: '#333' }}>
                      open
                  </div>
              </Dropdown>
          </div>
          <div className="dsr-fixed dsr-top-0 dsr-right-0 dsr-m-4">
              <Dropdown {...args}>
                  <div className="dsr-text-lg dsr-font-semibold dsr-py-2 dsr-px-3 dsr-rounded-lg" style={{ color: 'white', background: '#333' }}>
                      open
                  </div>
              </Dropdown>
          </div>
          <div className="dsr-fixed dsr-bottom-0 dsr-left-0 dsr-m-4">
              <Dropdown {...args}>
                  <div className="dsr-text-lg dsr-font-semibold dsr-py-2 dsr-px-3 dsr-rounded-lg" style={{ color: 'white', background: '#333' }}>
                      open
                  </div>
              </Dropdown>
          </div>
          <div className="dsr-fixed dsr-bottom-0 dsr-right-0 dsr-m-4">
              <Dropdown {...args}>
                  <div className="dsr-text-lg dsr-font-semibold dsr-py-2 dsr-px-3 dsr-rounded-lg" style={{ color: 'white', background: '#333' }}>
                      open
                  </div>
              </Dropdown>
          </div>
          <div className="dsr-fixed dsr-top-1/2 dsr-left-1/2">
              <Dropdown {...args}>
                  <div className="dsr-text-lg dsr-font-semibold dsr-py-2 dsr-px-3 dsr-rounded-lg" style={{ color: 'white', background: '#333' }}>
                      open
                  </div>
              </Dropdown>
          </div>
      </div>
  );
};

export const DynamicPosition = FiveCorners.bind({});

Default.args = DynamicPosition.args = {
  showOnHover: false,
  className: '',
  items: [
    {
      'icon': 'times',
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
