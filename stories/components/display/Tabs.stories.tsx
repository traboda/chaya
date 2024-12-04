import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Tabs, { TabsProps } from '../../../src/components/Tabs';

const meta: Meta<TabsProps> = {
  title: 'Components/Display/Tabs',
  component: Tabs,
  parameters: {
    controls: { expanded: true },

  },
};

export default meta;

type Story = StoryObj<TabsProps>;


const TabsTemplate = (args: TabsProps) => {
  
  return (
    <Tabs
      {...args}
      items={[
        {
          label: 'About',
          renderer: (
            <div>
              <p>Tab</p>
            </div>
          ),
        },
        {
          label: 'Contact',
          renderer: (
            <div>
              <p>Tab 2</p>
            </div>
          ),
        },
      ]}
    />
  );

};

export const Primary: Story = {
  args: {
    onChange: () => {},
  },
  render: (args) => (
    <div>
      <TabsTemplate {...args} />
    </div>
  ),
};