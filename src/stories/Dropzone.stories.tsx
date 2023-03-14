import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { Dropzone } from '../index';

const meta: Meta = {
  title: 'User Inputs/Dropzone',
  component: Dropzone,
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
      <Dropzone
          {...args}
          value={files}
          onChange={setFiles}
          icon="info"
          labels={{
            label: 'Select Photos',
            text: 'Drag and drop photos here or click to upload',
            hint: 'Only .jpg and .png files. Max size is 5MB',
          }}
      />
  );
};

export const Default = Template.bind({});

Default.args = {
  allowMultiple: true,
  accept: ['*/*'],
};