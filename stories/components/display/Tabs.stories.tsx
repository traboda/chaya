import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Tabs, TabsProps } from '../../../src';

const meta: Meta = {
  title: 'Components/Display/Tabs',
  component: Tabs,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;


const defaulItems: TabsProps['items'] = [
  {
    label: 'Item 1',
    renderer: 'tab 1',
    badge: 3,
  },
  {
    label: 'Item 2',
    renderer: 'tab 2',
    badge: 5,
  },
  {
    label: 'Item 3',
    renderer: 'tab 3',
  },
  {
    label: 'Item 4',
    renderer: 'tab 4',
  },
];

export const Primary: Story = {
  args: {
    items: defaulItems,
  },
};

export const LineVariant: Story = {
  storyName: 'Line Variant',
  tags: ['unlisted'],
  args: {
    items: defaulItems,
    variant: 'line',
  },
};

export const Vertical: Story = {
  storyName: 'Vertical Tabs',
  tags: ['unlisted'],
  args: {
    items: defaulItems,
    isVertical: true,
  },
};

export const VerticalLineVariant: Story = {
  storyName: 'Vertical Line Variant',
  tags: ['unlisted'],
  args: {
    items: defaulItems,
    isVertical: true,
    variant: 'line',
  },
};

export const ResponsiveView: Story = {
  storyName: 'Responsive Tabs',
  tags: ['unlisted'],
  args: {
    items: defaulItems,
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
    items: defaulItems,
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
    items: defaulItems,
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
    items: defaulItems,
  },
  render: () => (
    <div style={{ minHeight: '45vh' }} className="dsr-flex dsr-justify-center dsr-items-center dsr-gap-2">
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
    items: defaulItems,
  },
  render: () => (
    <div style={{ minHeight: '45vh' }} className="dsr-flex dsr-justify-center dsr-items-center dsr-gap-2">
      <iframe
        src="/iframe.html?id=components-display-tabs--responsive-disabled-view"
        style={{ height: '45vh' }}
      />
    </div>
  ),
};
