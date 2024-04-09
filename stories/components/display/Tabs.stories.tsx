import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Tabs, Card, TabsProps } from '../../../src';

const meta: Meta = {
  title: 'Components/Display/Tabs',
  component: Tabs,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;


const defaultItems: TabsProps['items'] = [
  {
    label: 'Item 1',
    rendererFunc: () => (
      <Card>
        Item 1 is here
        <div style={{ width: '100%', height: '100vh' }}>
          s
        </div>
        <div style={{ width: '100%', height: '100vh' }}>
          s
        </div>
      </Card>
    ),
    badge: 3,
    key: 'item-1',
  },
  {
    label: 'Item 2',
    rendererFunc: () => 'tab 2',
    badge: 5,
    key: 'item-2',
  },
  {
    label: 'Item 3',
    rendererFunc: () => 'tab 3',
    key: 'item-3',
  },
  {
    label: 'Item 4',
    rendererFunc: () => 'tab 4',
    key: 'item-4',
  },
];

export const Primary: Story = {
  args: {
    items: defaultItems,
  },
};

export const LineVariant: Story = {
  storyName: 'Line Variant',
  tags: ['unlisted'],
  args: {
    items: defaultItems,
    variant: 'line',
  },
};

export const BoxedVariant: Story = {
  storyName: 'Boxed Variant',
  tags: ['unlisted'],
  args: {
    items: defaultItems,
    variant: 'boxed',
  },
};

export const Vertical: Story = {
  storyName: 'Vertical Tabs',
  tags: ['unlisted'],
  args: {
    items: defaultItems,
    isVertical: true,
  },
};

export const VerticalLineVariant: Story = {
  storyName: 'Vertical Line Variant',
  tags: ['unlisted'],
  args: {
    items: defaultItems,
    isVertical: true,
    variant: 'line',
  },
};

export const VerticalBoxedVariant: Story = {
  storyName: 'Vertical Boxed Variant',
  tags: ['unlisted'],
  args: {
    items: defaultItems,
    variant: 'boxed',
    isVertical: true,
  },
};

export const ResponsiveView: Story = {
  storyName: 'Responsive Tabs',
  tags: ['unlisted'],
  args: {
    items: defaultItems,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphoneSE',
    },
  },
};

export const ResponsiveLineView: Story = {
  storyName: 'Responsive Line Tabs',
  tags: ['unlisted'],
  args: {
    items: defaultItems,
    variant: 'line',
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphoneSE',
    },
  },
};

export const ResponsiveDisabledView: Story = {
  storyName: 'Responsive Disabled Tabs',
  tags: ['unlisted'],
  args: {
    items: defaultItems,
    variant: 'line',
    disableResponsive: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphoneSE',
    },
  },
};


export const ResponsivePreview: Story = {
  storyName: 'Responsive Preview Tabs',
  tags: ['unlisted'],
  args: {
    items: defaultItems,
  },
  render: () => (
    <div style={{ minHeight: '45vh' }} className="flex justify-center items-center gap-2">
      <div>
        <div>
          Pill Variant
        </div>
        <iframe
          src="/iframe.html?id=components-display-tabs--responsive-view"
          style={{ height: '45vh' }}
        />
      </div>
      <div>
        <div>
          Line Variant
        </div>
        <iframe
          src="/iframe.html?id=components-display-tabs--responsive-line-view"
          style={{ height: '45vh' }}
        />
      </div>
    </div>
  ),
};

export const DisableResponsivePreview: Story = {
  storyName: 'Responsive Disabled Preview Tabs',
  tags: ['unlisted'],
  args: {
    items: defaultItems,
  },
  render: () => (
    <div style={{ minHeight: '45vh' }} className="flex justify-center items-center gap-2">
      <iframe
        src="/iframe.html?id=components-display-tabs--responsive-disabled-view"
        style={{ height: '45vh' }}
      />
    </div>
  ),
};
