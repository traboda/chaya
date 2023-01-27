import React, { useState } from 'react';
import { Meta, Story, addDecorator } from '@storybook/react';

import { PageNavigator } from '../index';

import ThemeContextDecorator from './ThemeContextDecorator';


addDecorator(ThemeContextDecorator);

const meta: Meta = {
  title: 'Layouts/Page Navigator',
  component: PageNavigator,
  parameters: {
    controls: {
      expanded: true,
      sort: 'requiredFirst',
    },
  },
};

export default meta;

const Template: Story = args => {
  const [page, setPage] = useState(args.page ?? 11);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  return (
      <div className="dsr-flex dsr-flex-col dsr-justify-center dsr-items-center dsr-bg-gray-100 dsr-p-30" style={{ minHeight: '35vh' }}>
          <PageNavigator
              page={page}
              setPage={setPage}
              itemsPerPage={itemsPerPage}
              hideItemsPerPage={args.hideItemsPerPage}
              setItemsPerPage={setItemsPerPage}
              totalCount={args.totalCount}
              {...args}
          />
      </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  totalCount: 200,
  itemsPerPage: 10,
};

