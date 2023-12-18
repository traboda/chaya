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
    className="dsr-flex dsr-justify-center dsr-items-center dsr-border-dashed dsr-border dsr-gap-2"
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
    className="dsr-flex dsr-justify-center dsr-items-end dsr-border-dashed dsr-border dsr-gap-2"
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
    <div className="dsr-flex dsr-flex-col dsr-gap-2">
      <BadgeSizesShowcase variant="solid" />
      <BadgeSizesShowcase variant="minimal" />
      <BadgeSizesShowcase variant="outline" />
    </div>
  ),
};


//
// const Template: Story = args => (
//   <div className="dsr-flex dsr-justify-center dsr-items-center">
//     <Badge {...args}>
//       Badge
//     </Badge>
//   </div>
// );
//
// export const Default = Template.bind({});
//
//
// const Vars: Story<BadgeProps> = args => (
//   <div className="dsr-flex dsr-flex-col dsr-justify-center dsr-items-center dsr-gap-2 dsr-py-2">
//     <div className="dsr-flex dsr-gap-2">
//       <Badge {...args} variant="solid" color="primary" />
//       <Badge {...args} variant="solid" color="secondary" />
//       <Badge {...args} variant="solid" color="success" />
//       <Badge {...args} variant="solid" color="warning" />
//       <Badge {...args} variant="solid" color="danger" />
//       <Badge {...args} variant="solid" color="contrast" />
//       <Badge {...args} variant="solid" color="shade" />
//     </div>
//     <div className="dsr-flex dsr-gap-2">
//       <Badge {...args} variant="outline" color="primary" />
//       <Badge {...args} variant="outline" color="secondary" />
//       <Badge {...args} variant="outline" color="success" />
//       <Badge {...args} variant="outline" color="warning" />
//       <Badge {...args} variant="outline" color="danger" />
//       <Badge {...args} variant="outline" color="contrast" />
//       <Badge {...args} variant="outline" color="shade" />
//     </div>
//
//     <div className="dsr-flex dsr-gap-2">
//       <Badge {...args} variant="minimal" color="primary" />
//       <Badge {...args} variant="minimal" color="secondary" />
//       <Badge {...args} variant="minimal" color="success" />
//       <Badge {...args} variant="minimal" color="warning" />
//       <Badge {...args} variant="minimal" color="danger" />
//       <Badge {...args} variant="minimal" color="contrast" />
//       <Badge {...args} variant="minimal" color="shade" />
//     </div>
//
//   </div>
// );
//
// export const ColorVariants = Vars.bind({});
//
// ColorVariants.args = {
//   children: 'Hey',
//   size: 'md',
// };
//
// const SizeVars: Story<BadgeProps> = args => (
//   <div className="dsr-flex dsr-justify-center dsr-items-center dsr-gap-4 dsr-py-4" style={{ minHeight: '25vh' }}>
//     <Badge {...args} size="xs" />
//     <Badge {...args} size="sm" />
//     <Badge {...args} size="md" />
//     <Badge {...args} size="lg" />
//     <Badge {...args} size="xl" />
//   </div>
// );
//
// export const SizeVariants = SizeVars.bind({});
//
// SizeVariants.args = {
//   children: 'New',
//   leftIcon: 'home',
//   rightIcon: 'info',
// };
//
// export const WithIcons = Template.bind({});
//
// WithIcons.args = {
//   leftIcon: 'home',
//   rightIcon: 'info',
// };
