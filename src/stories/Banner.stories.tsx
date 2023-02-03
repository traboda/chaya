import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Banner } from '../index';

const meta: Meta = {
  title: 'Content Handlers/Banner',
  component: Banner,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => (
    <div style={{ maxWidth: '100%', height: '1000px' }}>
        <Banner {...args} >
            <button className="dsr-bg-indigo-500 dsr-px-5 dsr-py-2 dsr-text-white dsr-rounded-md hover:dsr-bg-indigo-700 focus:dsr-outline-none">Button</button>
        </Banner>
    </div>
);

export const Default = Template.bind({});

Default.args = {
  variant: 'full-width',
  position: 'bottom',
  learnMore: {
    link: '',
    text: 'Learn More',
  },
  className: 'dsr-w-full',
  allowDismissal: true,
  icon: 'chevronUp',
  color: 'danger',
  text: 'This is example text for the banner. Give your own text here.',
};