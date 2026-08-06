import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import Dropzone, { DropzoneProps } from '../../../src/components/Dropzone';

const meta: Meta<DropzoneProps> = {
  title: 'Components/Inputs/Dropzone',
  component: Dropzone,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj<DropzoneProps>;

export const Primary: Story = {
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);
    return (
      <Dropzone
        value={files}
        onChange={(f) => setFiles([...f])}
        accept={['image/*']}
        labels={{ label: 'Upload Image', text: 'Drag and drop an image here or click to upload', hint: 'Max 5MB' }}
      />
    );
  },
};

export const MultipleFiles: Story = {
  tags: ['unlisted'],
  render: () => {
    const [files, setFiles] = React.useState<File[]>([]);
    return (
      <Dropzone
        value={files}
        onChange={(f) => setFiles([...f])}
        accept={['image/*', 'application/pdf']}
        allowMultiple
        maxCount={5}
        labels={{ label: 'Upload Files', text: 'Drag and drop files here', hint: 'Images and PDFs, max 5 files' }}
      />
    );
  },
};

export const Disabled: Story = {
  tags: ['unlisted'],
  render: () => (
    <Dropzone
      value={[]}
      onChange={() => {}}
      accept={['image/*']}
      isDisabled
      labels={{ label: 'Upload', text: 'Upload is currently disabled', hint: '' }}
    />
  ),
};
