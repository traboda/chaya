import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Dropdown } from '../../../index';
import { DropdownProps } from '../../../components/Dropdown';

const meta: Meta = {
  title: 'Components/Overlays/Dropdown',
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

const Template: Story<DropdownProps> = args => {
  return (
    <div className="dsr-bg-gray-200 dsr-flex dsr-pt-10 dsr-items-center dsr-flex-col" style={{ minHeight: '50vh' }}>
      <Dropdown {...args} buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} />
    </div>
  );
};

export const Default = Template.bind({});

const FiveCorners: Story<DropdownProps> = args => {
  return (
    <div className="dsr-flex dsr-pt-10 dsr-items-center dsr-flex-col">
      <div className="dsr-fixed dsr-top-0 dsr-left-0 dsr-m-4">
        <Dropdown {...args} buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} />
      </div>
      <div className="dsr-fixed dsr-top-0 dsr-right-0 dsr-m-4">
        <Dropdown {...args} buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} />
      </div>
      <div className="dsr-fixed dsr-bottom-0 dsr-left-0 dsr-m-4">
        <Dropdown {...args} buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} />
      </div>
      <div className="dsr-fixed dsr-bottom-0 dsr-right-0 dsr-m-4">
        <Dropdown {...args} buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} />
      </div>
      <div className="dsr-fixed dsr-top-1/2 dsr-left-1/2">
        <Dropdown {...args} buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} />
      </div>
    </div>
  );
};

export const DynamicPosition = FiveCorners.bind({});