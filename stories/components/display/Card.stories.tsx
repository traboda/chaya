import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Card, { CardProps } from '../../../src/components/Card';
import Button from '../../../src/components/Button';

const meta: Meta<CardProps> = {
  title: 'Components/Display/Card',
  component: Card,
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

type Story = StoryObj<CardProps>;

export const Primary: Story = {
  args: {
    title: 'Add Members',
    description: 'Add members to your team, and collaborate with them on projects.',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl',
  },
};


export const AsPaper: Story = {
  name: 'AsPaper',
  tags: ['unlisted'],
  args: {
    children: (
      <div className="border-2 border-dashed p-3" style={{ borderColor: 'rgba(200, 200, 200, 0.8)' }}>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Some Title</h1>
          <div className="flex justify-between gap-3">
            <img src="https://picsum.photos/seed/picsum/200/200" alt="Some Image" width={200} />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies,
              nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam
              nisl nunc vitae nisl Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl
            </p>
          </div>
          <div className="flex justify-end">
            <Button>
              Some Button
            </Button>
          </div>
        </div>
      </div>
    ),
  },
};

export const NestedCards: Story = {
  name: 'Nested Cards',
  tags: ['unlisted'],
  args: {
    title: 'Appearance',
    description: 'Customize the appearance of your storefront.',
    children: (
      <Card title="Theme" description="Set theme for your store.">
        <div className="flex flex-col gap-3">
          <p>child card content goes here</p>
          <Card title="Colors" description="Set your brand colors to make your store truly yours.">
            <p>grand child card content goes here</p>
          </Card>
          <Card title="Font" description="Set font for your store. We support Google Fonts, and custom fonts.">
            <p>grand child card content goes here</p>
          </Card>
        </div>

      </Card>
    ),
  },
};

export const NestedCardsWithCustomContent: Story = {
  name: 'Nested Cards With Custom Content',
  tags: ['unlisted'],
  args: {
    children: (
      <div>
        <p className="mb-2">parent card content goes here</p>
        <Card>
          <p className="mb-2">child card content goes here</p>
          <Card>
            <p>Grand child card content goes here</p>
          </Card>
        </Card>
      </div>

    ),
  },
};

export const OutlineVariant: Story = {
  name: 'Outline Variant',
  tags: ['unlisted'],
  args: {
    title: 'Add Members',
    description: 'Add members to your team, and collaborate with them on projects.',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl',
    variant: 'outline',
  },
  render: (args) => (
    <div
      className="flex justify-center items-center border-dashed border-2"
      style={{ background: 'rgba(200,200,200,0.2)', padding: '5vh 2vw', borderColor: 'rgba(200, 200, 200, 0.8)' }}
    >
      <Card {...args} />
    </div>
  ),
};
