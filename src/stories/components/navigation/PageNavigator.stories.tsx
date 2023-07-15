import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { PageNavigator } from '../../../index';
import { PageNavigatorProps } from '../../../components/PageNavigator';

const meta: Meta = {
  title: 'Navigation/PageNavigator',
  component: PageNavigator,
  parameters: {
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
};

export default meta;

const Template: Story<PageNavigatorProps> = args => {
  const [page, setPage] = useState(args.page ?? 11);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  return (
    <div className="dsr-flex dsr-flex-col dsr-justify-center dsr-items-center dsr-p-30" style={{ minHeight: '35vh' }}>
      <PageNavigator
        {...args}
        page={page}
        setPage={setPage}
        itemsPerPage={itemsPerPage}
        hideItemsPerPage={args.hideItemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalCount={args.totalCount}
      />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  totalCount: 200,
  itemsPerPage: 10,
};

export const WithoutPages = Template.bind({});

WithoutPages.args = {
  totalCount: 200,
  itemsPerPage: 10,
  showPages: false,
};

export const WithoutEdges = Template.bind({});

WithoutEdges.args = {
  totalCount: 200,
  itemsPerPage: 10,
  showEdges: false,
};

export const WithoutControls = Template.bind({});

WithoutControls.args = {
  totalCount: 200,
  itemsPerPage: 10,
  showEdges: false,
  showControls: false,
};