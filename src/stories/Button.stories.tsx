import React from 'react';

import { Meta, Story, addDecorator } from '@storybook/react';
import { Button } from '../index';
import ThemeContextDecorator from './ThemeContextDecorator';

addDecorator(ThemeContextDecorator);

const meta: Meta = {
  title: 'Basic Elements/Button',
  component: Button,
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
    <div className="dsr-flex dsr-justify-center dsr-items-center">
        <Button {...args} />
    </div>
);

export const Default = Template.bind({});

Default.args = {
  children: 'Press here',
};


const Vars: Story = args => (
    <div className="dsr-flex dsr-flex-col dsr-justify-center dsr-items-center dsr-gap-1 dsr-py-1">
        <div className="dsr-flex dsr-gap-2 dsr-py-1">
            <Button {...args} variant="solid" color="primary" />
            <Button {...args} variant="solid" color="secondary" />
            <Button {...args} variant="solid" color="success" />
            <Button {...args} variant="solid" color="warning" />
            <Button {...args} variant="solid" color="danger" />
            <Button {...args} variant="solid" color="contrast" />
            <Button {...args} variant="solid" color="shade" />
        </div>
        <div className="dsr-flex dsr-gap-2 dsr-py-1">
            <Button {...args} variant="outline" color="primary" />
            <Button {...args} variant="outline" color="secondary" />
            <Button {...args} variant="outline" color="success" />
            <Button {...args} variant="outline" color="warning" />
            <Button {...args} variant="outline" color="danger" />
            <Button {...args} variant="outline" color="contrast" />
            <Button {...args} variant="outline" color="shade" />
        </div>
        <div className="dsr-flex dsr-gap-2 dsr-py-1">
            <Button {...args} variant="minimal" color="primary" />
            <Button {...args} variant="minimal" color="secondary" />
            <Button {...args} variant="minimal" color="success" />
            <Button {...args} variant="minimal" color="warning" />
            <Button {...args} variant="minimal" color="danger" />
            <Button {...args} variant="minimal" color="contrast" />
            <Button {...args} variant="minimal" color="shade" />
        </div>
        <div className="dsr-flex dsr-gap-2 dsr-py-1">
            <Button {...args} variant="link" color="primary" />
            <Button {...args} variant="link" color="secondary" />
            <Button {...args} variant="link" color="success" />
            <Button {...args} variant="link" color="warning" />
            <Button {...args} variant="link" color="danger" />
            <Button {...args} variant="link" color="contrast" />
            <Button {...args} variant="link" color="shade" />
        </div>
    </div>
);

export const ColorVariants = Vars.bind({});


ColorVariants.args = {
  size: 'lg',
  children: 'Press here',
};

const SizeVars: Story = args => (
    <div className="dsr-flex dsr-justify-center dsr-items-center" style={{ minHeight: '25vh', columnGap: '0.25rem' }}>
        <div>
            <Button {...args} size="xs" />
            <Button {...args} size="sm" />
            <Button {...args} size="md" />
            <Button {...args} size="lg" />
            <Button {...args} size="xl" />
        </div>
    </div>
);

export const SizeVariants = SizeVars.bind({});


SizeVariants.args = {
  children: 'Press here',
  style: { margin: '0.25rem', marginLeft: '1rem' },
};