import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Button from '../../../src/components/Button';
import Modal, { ModalProps } from '../../../src/components/Modal';
import TextInput from '../../../src/components/TextInput';

const meta: Meta<ModalProps> = {
  title: 'Components/Display/Modal',
  component: Modal,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<ModalProps>;

const IssueReportForm = () => {
  const [data, setData] = React.useState({
    name: '',
    email: '',
    issue: '',
  });

  return (
    <form className="px-2 py-4">
      <div className="flex flex-col gap-4">
        <div>
          <TextInput
            label="Name"
            name="name"
            value={data.name}
            onChange={(name) => setData({ ...data, name })}
          />
        </div>
        <div>
          <TextInput
            label="Email"
            name="email"
            value={data.email}
            onChange={(email) => setData({ ...data, email })}
          />
        </div>
        <div>
          <TextInput
            label="Issue"
            name="issue"
            value={data.issue}
            type="textarea"
            onChange={(issue) => setData({ ...data, issue })}
          />
        </div>
      </div>
    </form>
  );
};

export const CustomHeaderBackground: Story = {
  args: {
    isOpen: false,
    title: 'Report an Error',
    description:
      'We are sorry to hear that you are facing an issue. Please fill out the form below to report the error.',
    maxWidth: 480,
    headerClassName: 'bg-blue-500 text-white',
  },
  decorators: (Story, context) => {
    const [isOpen, setIsOpen] = React.useState(context.args.isOpen);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        {Story({
          ...context,
          args: {
            ...context.args,
            isOpen,
            onClose: () => setIsOpen(false),
            children: <IssueReportForm />,
          },
        })}
      </div>
    );
  },
};

export const Primary: Story = {
  args: {
    isOpen: false,
    title: 'Report an Error',
    description:
      'We are sorry to hear that you are facing an issue. Please fill out the form below to report the error.',
    maxWidth: 480,
    primaryButton: {
      children: 'Submit',
      onClick: () => fn(),
    },
    secondaryButton: {
      children: 'Cancel',
      color: 'danger',
      onClick: () => fn(),
    },
  },
  decorators: (Story, context) => {
    const [isOpen, setIsOpen] = React.useState(context.args.isOpen);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        {Story({
          ...context,
          args: {
            ...context.args,
            isOpen,
            onClose: () => setIsOpen(false),
            children: <IssueReportForm />,
          },
        })}
      </div>
    );
  },
};
