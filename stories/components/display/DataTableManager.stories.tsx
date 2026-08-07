import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import DataTableManager from '../../../src/components/DataTableManager';

const meta: Meta = {
  title: 'Components/Display/DataTableManager',
  component: DataTableManager,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj;

const columns = [
  { label: 'Name', value: 'name' },
  { label: 'Email', value: 'email' },
  { label: 'Role', value: 'role' },
  { label: 'Status', value: 'status' },
];

export const Primary: Story = {
  render: () => {
    const [keyword, setKeyword] = React.useState('');
    const [selectedColumns, setSelectedColumns] = React.useState([
      'name',
      'email',
      'role',
      'status',
    ]);
    return (
      <DataTableManager
        keyword={keyword}
        setKeyword={setKeyword}
        totalCount={42}
        columns={columns}
        selectedColumns={selectedColumns}
        setColumns={setSelectedColumns}
        labels={{
          label: 'User',
          labelPlural: 'Users',
          searchPlaceholder: 'Search users...',
        }}
      />
    );
  },
};

export const WithCreate: Story = {
  name: 'With Create Button',
  tags: ['unlisted'],
  render: () => {
    const [keyword, setKeyword] = React.useState('');
    return (
      <DataTableManager
        keyword={keyword}
        setKeyword={setKeyword}
        totalCount={42}
        columns={columns}
        selectedColumns={['name', 'email', 'role', 'status']}
        setColumns={() => {}}
        onCreate={() => alert('Create clicked')}
        labels={{
          label: 'User',
          labelPlural: 'Users',
          create: 'Add User',
        }}
      />
    );
  },
};

export const Loading: Story = {
  name: 'Loading State',
  tags: ['unlisted'],
  render: () => (
    <DataTableManager
      keyword=""
      setKeyword={() => {}}
      totalCount={0}
      isLoading
      columns={columns}
      selectedColumns={['name', 'email']}
      setColumns={() => {}}
    />
  ),
};
