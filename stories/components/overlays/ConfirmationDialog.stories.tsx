import React from 'react';
import { Meta, Story } from '@storybook/react';

import { ConfirmationDialog } from '../../../src';
import { ConfirmationDialogProps } from '../../../src/components/ConfirmationDialog';

const meta: Meta = {
  title: 'Components/Overlays/ConfirmationDialog',
  component: ConfirmationDialog,
};

export default meta;

const Template: Story<ConfirmationDialogProps> = args => {

  const [isOpen, setIsOpen] = React.useState(args.isOpen);

  React.useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open
      </button>
      <ConfirmationDialog
        {...args}
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
      />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  isOpen: true,
  labels: {
    title: 'Are you sure?',
    description: 'This action cannot be undone.',
  },
};


export const RequirePassword = Template.bind({});

RequirePassword.args = {
  isOpen: true,
  requirePassword: true,
  labels: {
    title: 'Are you sure?',
    description: 'This action cannot be undone.',
  },
};

export const RequireConfirmationText = Template.bind({});

RequireConfirmationText.args = {
  isOpen: true,
  requireConfirmationText: true,
  labels: {
    title: 'Are you sure?',
    description: 'This action cannot be undone.',
    confirmationText: 'AMAZING',
  },
  cancelButtonProps: {
    color: 'success',
  },
  confirmButtonProps: {
    color: 'danger',
  },
};
