import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Dropdown } from '../index';

const meta: Meta = {
  title: 'Content Handlers/Dropdown',
  component: Dropdown,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const DropdownChildren = (
    <div className="dsr-p-4">
        <h2 className="dsr-text-xl dsr-font-semibold">Heading</h2>
        <p className="dsr-mt-2 dsr-text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolorem fugiat maiores rem? Adipisci consequatur possimus rerum. Aliquam at debitis deserunt dolorem enim et incidunt natus nulla, officia, pariatur rem.</p>
    </div>
);

const DropdownButtonRenderer = (
    <button className="dsr-text-lg dsr-font-semibold dsr-py-2 dsr-px-3 dsr-rounded-lg" style={{ color: 'white', background: '#333' }}>
        open
    </button>
);

const Template: Story = args => {
  return (
      <div className="dsr-bg-gray-200 dsr-flex dsr-pt-10 dsr-items-center dsr-flex-col" style={{ minHeight: '50vh' }}>
          <Dropdown buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} {...args} />
      </div>
  );
};

export const Default = Template.bind({});

const FiveCorners: Story = args => {
  return (
      <div className="dsr-flex dsr-pt-10 dsr-items-center dsr-flex-col">
          <div className="dsr-fixed dsr-top-0 dsr-left-0 dsr-m-4">
              <Dropdown buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} {...args} />
          </div>
          <div className="dsr-fixed dsr-top-0 dsr-right-0 dsr-m-4">
              <Dropdown buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} {...args} />
          </div>
          <div className="dsr-fixed dsr-bottom-0 dsr-left-0 dsr-m-4">
              <Dropdown buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} {...args} />
          </div>
          <div className="dsr-fixed dsr-bottom-0 dsr-right-0 dsr-m-4">
              <Dropdown buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} {...args} />
          </div>
          <div className="dsr-fixed dsr-top-1/2 dsr-left-1/2">
              <Dropdown buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} {...args} />
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
