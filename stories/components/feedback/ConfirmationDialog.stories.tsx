import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import React from 'react';

import ConfirmationDialog, { ConfirmationDialogProps } from '../../../src/components/ConfirmationDialog';
import Button from '../../../src/components/Button';

const meta: Meta<ConfirmationDialogProps> = {
  title: 'Components/Feedback/ConfirmationDialog',
  component: ConfirmationDialog,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<ConfirmationDialogProps>;

export const Primary: Story = {
  name: 'Story',
  args: {
    labels: {
      title: 'Delete All Photos',
      description: 'Are you sure you want to delete all photos? This is permanent action.',
      confirmationText: 'Delete',
    },
    confirmButtonProps: {
      color: 'danger',
    },
  },
  render: (story) => {

    const [isOpen, setOpen] = useState(false);

    return (
      <div>
        <Button color="danger" onClick={() => setOpen(true)}>
          Delete
        </Button>
        <ConfirmationDialog
          {...story}
          isOpen={isOpen}
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </div>
    );

  },
};
