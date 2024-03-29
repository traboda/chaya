import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Badge, BadgeProps } from '../../../src';

const meta: Meta<BadgeProps> = {
  title: 'Components/Display/Badge',
  component: Badge,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<BadgeProps>;

export const Primary: Story = {
  args: {
    children: 'Badge Text',
  },
};

const BadgeVariants = ({ variant }: { variant: BadgeProps['variant'] }) => (
  <div
    className="flex justify-center items-center border-dashed border gap-2"
    style={{ padding: '5vh 0', background: 'rgba(200, 200, 200, 0.25)', borderColor: 'rgba(200, 200, 200, 0.8)' }}
  >
    <Badge variant={variant} color="primary">
      Primary
    </Badge>
    <Badge variant={variant} color="secondary">
      Secondary
    </Badge>
    <Badge variant={variant} color="warning">
      Warning
    </Badge>
    <Badge variant={variant} color="danger">
      Danger
    </Badge>
    <Badge variant={variant} color="success">
      Success
    </Badge>
    <Badge variant={variant} color="contrast">
      Contrast
    </Badge>
    <Badge variant={variant} color="shade">
      Shade
    </Badge>
    <Badge variant={variant} color="black">
      Black
    </Badge>
    <Badge variant={variant} color="white">
      White
    </Badge>
  </div>
);

export const SolidVariant: Story = {
  storyName: 'Solid Variant',
  tags: ['unlisted'],
  render: () => <BadgeVariants variant="solid" />,
};

export const MinimalVariant: Story = {
  storyName: 'Minimal Variant',
  tags: ['unlisted'],
  render: () => <BadgeVariants variant="minimal" />,
};

export const OutlineVariant: Story = {
  storyName: 'Outline Variant',
  tags: ['unlisted'],
  render: () => <BadgeVariants variant="outline" />,
};

const BadgeSizesShowcase = ({ variant }: { variant: BadgeProps['variant'] }) => (
  <div
    className="flex justify-center items-end border-dashed border gap-2"
    style={{ padding: '2.5vh 0', background: 'rgba(200, 200, 200, 0.25)', borderColor: 'rgba(200, 200, 200, 0.8)' }}
  >
    <Badge variant={variant} color="primary" size="xs">
      xs badge
    </Badge>
    <Badge variant={variant} color="primary" size="sm">
      sm badge
    </Badge>
    <Badge variant={variant} color="primary" size="md">
      md badge
    </Badge>
    <Badge variant={variant} color="primary" size="lg">
      lg badge
    </Badge>
    <Badge variant={variant} color="primary" size="xl">
      xl badge
    </Badge>
  </div>
);

export const BadgeSizes: Story = {
  storyName: 'Badge Sizes',
  tags: ['unlisted'],
  render: () => (
    <div className="flex flex-col gap-2">
      <BadgeSizesShowcase variant="solid" />
      <BadgeSizesShowcase variant="minimal" />
      <BadgeSizesShowcase variant="outline" />
    </div>
  ),
};

export const BadgeWithIcon: Story = {
  storyName: 'Badge with Icon',
  tags: ['unlisted'],
  render: () => (
    <div className="flex justify-center items-center border-dashed border gap-2" style={{ padding: '5vh 0', background: 'rgba(200, 200, 200, 0.25)', borderColor: 'rgba(200, 200, 200, 0.8)' }}>
      <Badge variant="solid" size="md" color="primary" leftIcon="info">
        Information
      </Badge>
      <Badge variant="solid" size="md" color="warning" rightIcon="alert-triangle">
        Warning
      </Badge>
      <Badge variant="minimal" size="md" color="primary" leftIcon="info">
        Information
      </Badge>
      <Badge variant="minimal" size="md" color="warning" rightIcon="alert-triangle">
        Warning
      </Badge>
      <Badge variant="outline" size="md" color="primary" leftIcon="info">
        Information
      </Badge>
      <Badge variant="outline" size="md" color="warning" rightIcon="alert-triangle">
        Warning
      </Badge>
    </div>
  ),
};