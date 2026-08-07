import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import UploadStatusIndicator, {
  UploadStatusIndicatorProps,
} from '../../../src/components/UploadStatusIndicator';

const createMockFile = (name: string, size: number, type: string): File => {
  const file = new File(['x'.repeat(size)], name, { type });
  return file;
};

const sampleFiles = [
  createMockFile('report.pdf', 1024 * 500, 'application/pdf'),
  createMockFile('photo.jpg', 1024 * 1200, 'image/jpeg'),
  createMockFile('data.csv', 1024 * 50, 'text/csv'),
];

const meta: Meta<UploadStatusIndicatorProps> = {
  title: 'Components/Feedback/UploadStatusIndicator',
  component: UploadStatusIndicator,
  parameters: {
    controls: { expanded: true },
    actions: { disable: true },
  },
};

export default meta;

type Story = StoryObj<UploadStatusIndicatorProps>;

export const Primary: Story = {
  render: () => <UploadStatusIndicator files={sampleFiles} removeFile={() => {}} />,
};

export const WithProgress: Story = {
  render: () => (
    <UploadStatusIndicator
      files={sampleFiles}
      statuses={[
        { loading: false, success: true, progress: 100 },
        { loading: true, progress: 65 },
        { loading: true, progress: 30 },
      ]}
      removeFile={() => {}}
    />
  ),
};

export const WithErrors: Story = {
  render: () => (
    <UploadStatusIndicator
      files={sampleFiles}
      statuses={[
        { loading: false, success: true, progress: 100 },
        { loading: false, error: true },
        { loading: true, progress: 45 },
      ]}
      removeFile={() => {}}
    />
  ),
};

export const AllComplete: Story = {
  render: () => (
    <UploadStatusIndicator
      files={sampleFiles}
      statuses={[
        { loading: false, success: true, progress: 100 },
        { loading: false, success: true, progress: 100 },
        { loading: false, success: true, progress: 100 },
      ]}
      removeFile={() => {}}
    />
  ),
};

export const HiddenTitle: Story = {
  render: () => <UploadStatusIndicator files={sampleFiles} hideTitle removeFile={() => {}} />,
};
