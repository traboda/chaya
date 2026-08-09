import { useState } from 'react';
import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import Button from '../../../src/components/Button';
import ConfirmationDialog, {
  ConfirmationDialogProps,
} from '../../../src/components/ConfirmationDialog';

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

export const RequirePassword: Story = {
  render: () => {
    const [isOpen, setOpen] = useState(false);

    return (
      <div>
        <Button color="danger" onClick={() => setOpen(true)}>
          Delete Account
        </Button>
        <ConfirmationDialog
          labels={{
            title: 'Delete Account',
            description: 'Enter your password to confirm account deletion.',
          }}
          requirePassword
          confirmButtonProps={{ color: 'danger' }}
          isOpen={isOpen}
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </div>
    );
  },
};

export const RequireConfirmationText: Story = {
  render: () => {
    const [isOpen, setOpen] = useState(false);

    return (
      <div>
        <Button color="danger" onClick={() => setOpen(true)}>
          Delete Repository
        </Button>
        <ConfirmationDialog
          labels={{
            title: 'Delete Repository',
            description: 'This action cannot be undone. Type CONFIRM to proceed.',
          }}
          requireConfirmationText
          confirmButtonProps={{ color: 'danger' }}
          isOpen={isOpen}
          onConfirm={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </div>
    );
  },
};
