import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { FileUploader } from '../index';

const meta: Meta = {
  title: 'User Inputs/File Uploader',
  component: FileUploader,
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

const Template: Story = args => {
  const [files, setFiles] = useState<FileList | File[]>([]);
  return (
      <FileUploader {...args} value={files} onChange={setFiles} />
  );
};

export const Default = Template.bind({});

Default.args = {
  acceptMultiple: true,
  acceptMimes: ['*/*'],
};