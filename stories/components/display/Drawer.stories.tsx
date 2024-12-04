import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Drawer, { DrawerProps } from '../../../src/components/Drawer';
import Button from '../../../src/components/Button';
import TextInput from '../../../src/components/TextInput';

const meta: Meta<DrawerProps> = {
  title: 'Components/Display/Drawer',
  component: Drawer,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<DrawerProps>;

const IssueReportForm = () => {
  const [data, setData] = React.useState({
    name: '',
    email: '',
    issue: '',
  });

  return (
    <form className="py-4 px-2">
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

export const Primary: Story = {
  args: {
    isOpen: false,
    title: 'Report an Error',
    description: 'We are sorry to hear that you are facing an issue. Please fill out the form below to report the error.',
  },
  decorators: (Story, context) => {
    const [isOpen, setIsOpen] = React.useState(context.args.isOpen);

    return (
      <div>
        <Button
          onClick={() => setIsOpen(true)}
        >
          Open Drawer
        </Button>
        {Story({ ...context, args: {
          ...context.args,
          isOpen,
          onClose: () => setIsOpen(false),
          children: <IssueReportForm />,
        } })}
      </div>
    );
  },
};
