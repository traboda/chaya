import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Dropdown } from '../../../src';
import { DropdownProps } from '../../../src/components/Dropdown';

const meta: Meta = {
  title: 'Components/Overlays/Dropdown',
  component: Dropdown,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const DropdownChildren = (
  <div className="p-4">
    <h2 className="text-xl font-semibold">Heading</h2>
    <p className="mt-2 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolorem fugiat maiores rem? Adipisci consequatur possimus rerum. Aliquam at debitis deserunt dolorem enim et incidunt natus nulla, officia, pariatur rem.</p>
  </div>
);

const DropdownButtonRenderer = (
  <button className="text-lg font-semibold py-2 px-3 rounded-lg" style={{ color: 'white', background: '#333' }}>
    open
  </button>
);

const Template: Story<DropdownProps> = args => {
  return (
    <div className="bg-gray-200 flex pt-10 items-center flex-col" style={{ minHeight: '50vh' }}>
      <Dropdown {...args} buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} />
    </div>
  );
};

export const Default = Template.bind({});

const FiveCorners: Story<DropdownProps> = args => {
  return (
    <div className="flex pt-10 items-center flex-col">
      <div className="fixed top-0 left-0 m-4">
        <Dropdown {...args} buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} />
      </div>
      <div className="fixed top-0 right-0 m-4">
        <Dropdown {...args} buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} />
      </div>
      <div className="fixed bottom-0 left-0 m-4">
        <Dropdown {...args} buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} />
      </div>
      <div className="fixed bottom-0 right-0 m-4">
        <Dropdown {...args} buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} />
      </div>
      <div className="fixed top-1/2 left-1/2">
        <Dropdown {...args} buttonRenderer={DropdownButtonRenderer} children={DropdownChildren} />
      </div>
    </div>
  );
};

export const DynamicPosition = FiveCorners.bind({});