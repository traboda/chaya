import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import Alert, { AlertProps } from '../../../src/components/Alert';

const meta: Meta<AlertProps> = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj<AlertProps>;

export const Primary: Story = {
  args: {
    title: 'Information',
    description: 'This is an informational alert message.',
    type: 'primary',
    variant: 'solid',
  },
};

export const Colors: Story = {
  name: 'Color Variants',
  tags: ['unlisted'],
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert type="primary" title="Primary" description="Primary alert message." />
      <Alert type="secondary" title="Secondary" description="Secondary alert message." />
      <Alert type="success" title="Success" description="Operation completed successfully." />
      <Alert type="warning" title="Warning" description="Please review before continuing." />
      <Alert type="danger" title="Error" description="Something went wrong." />
    </div>
  ),
};

export const OutlineVariant: Story = {
  tags: ['unlisted'],
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert type="primary" variant="outline" title="Primary" description="Outline style alert." />
      <Alert
        type="success"
        variant="outline"
        title="Success"
        description="Outline style success."
      />
      <Alert type="danger" variant="outline" title="Error" description="Outline style error." />
    </div>
  ),
};

export const WithActions: Story = {
  name: 'With Action Buttons',
  tags: ['unlisted'],
  args: {
    type: 'warning',
    title: 'Unsaved Changes',
    description: 'You have unsaved changes that will be lost.',
    primaryButton: { children: 'Save Changes' },
    secondaryButton: { children: 'Discard' },
  },
};

export const Dismissible: Story = {
  tags: ['unlisted'],
  render: () => {
    const [visible, setVisible] = React.useState(true);
    if (!visible) return <button onClick={() => setVisible(true)}>Show Alert</button>;
    return (
      <Alert
        type="success"
        title="Saved"
        description="Your changes have been saved."
        allowDismissal
        onDismiss={() => setVisible(false)}
      />
    );
  },
};
