import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Switch, { SwitchProps } from '../../../src/components/Switch';

const meta: Meta<SwitchProps> = {
  title: 'Components/Inputs/Switch',
  component: Switch,
};

export default meta;

export type Story = StoryObj<SwitchProps>;

const BaseSwitchTemplate = (props: Partial<SwitchProps>) => {
  const [isChecked, setIsChecked] = React.useState(props.value || false);

  return (
    <div>
      <Switch {...props} value={isChecked} onChange={setIsChecked} />
    </div>
  );
};

export const Primary: Story = {
  args: {
    label: 'Should we send you notifications?',
  },
  render: (args) => (
    <div>
      <BaseSwitchTemplate {...args} />
    </div>
  ),
};


const SwitchColors = () => (
  <div
    className="flex justify-center items-center border-dashed border gap-4"
    style={{ padding: '5vh 0', background: 'rgba(200, 200, 200, 0.25)', borderColor: 'rgba(200, 200, 200, 0.8)' }}
  >
    <BaseSwitchTemplate value color="primary" label="Primary" />
    <BaseSwitchTemplate value color="secondary" label="Secondary" />
    <BaseSwitchTemplate value color="warning" label="Warning" />
    <BaseSwitchTemplate value color="danger" label="Danger" />
    <BaseSwitchTemplate value color="success" label="Success" />
    <BaseSwitchTemplate value color="transparent" label="Transparent" />
  </div>
);

export const Colors: Story = {
  name: 'Switch Colors',
  tags: ['unlisted'],
  render: () => <SwitchColors />,
};