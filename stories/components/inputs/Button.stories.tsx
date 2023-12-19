import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonProps } from '../../../src';

const meta: Meta<ButtonProps> = {
  title: 'Components/Inputs/Button',
  component: Button,
};

export default meta;

export type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    children: 'Button Text',
  },
  render: (args) => <Button {...args} />,
};

const ButtonVariants = ({ variant }: { variant: ButtonProps['variant'] }) => (
  <div
    className="dsr-flex dsr-justify-center dsr-items-center dsr-border-dashed dsr-border dsr-gap-2"
    style={{ padding: '5vh 0', background: 'rgba(200, 200, 200, 0.25)', borderColor: 'rgba(200, 200, 200, 0.8)' }}
  >
    <Button variant={variant} color="primary">
      Primary
    </Button>
    <Button variant={variant} color="secondary">
      Secondary
    </Button>
    <Button variant={variant} color="warning">
      Warning
    </Button>
    <Button variant={variant} color="danger">
      Danger
    </Button>
    <Button variant={variant} color="success">
      Success
    </Button>
    <Button variant={variant} color="contrast">
      Contrast
    </Button>
    <Button variant={variant} color="shade">
      Shade
    </Button>
    <Button variant={variant} color="black">
      Black
    </Button>
    <Button variant={variant} color="white">
      White
    </Button>
  </div>
);

export const SolidVariant: Story = {
  storyName: 'Solid Button Variant',
  tags: ['unlisted'],
  render: () => <ButtonVariants variant="solid" />,
};

export const MinimalVariant: Story = {
  storyName: 'Minimal Button Variant',
  tags: ['unlisted'],
  render: () => <ButtonVariants variant="minimal" />,
};

export const OutlineVariant: Story = {
  storyName: 'Outline Button Variant',
  tags: ['unlisted'],
  render: () => <ButtonVariants variant="outline" />,
};

export const LinkVariant: Story = {
  storyName: 'Link Button Variant',
  tags: ['unlisted'],
  render: () => <ButtonVariants variant="link" />,
};


const ButtonSizesShowcase = ({ variant }: { variant: ButtonProps['variant'] }) => (
  <div
    className="dsr-flex dsr-justify-center dsr-items-end dsr-border-dashed dsr-border dsr-gap-2"
    style={{ padding: '2.5vh 0', background: 'rgba(200, 200, 200, 0.25)', borderColor: 'rgba(200, 200, 200, 0.8)' }}
  >
    <Button variant={variant} color="primary" size="xs">
      xs badge
    </Button>
    <Button variant={variant} color="primary" size="sm">
      sm badge
    </Button>
    <Button variant={variant} color="primary" size="md">
      md badge
    </Button>
    <Button variant={variant} color="primary" size="lg">
      lg badge
    </Button>
    <Button variant={variant} color="primary" size="xl">
      xl badge
    </Button>
  </div>
);

export const ButtonSizes: Story = {
  storyName: 'Button Sizes',
  tags: ['unlisted'],
  render: () => (
    <div className="dsr-flex dsr-flex-col dsr-gap-2">
      <ButtonSizesShowcase variant="solid" />
      <ButtonSizesShowcase variant="minimal" />
      <ButtonSizesShowcase variant="outline" />
      <ButtonSizesShowcase variant="link" />
    </div>
  ),
};
