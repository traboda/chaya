import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import DataTable from '../../../src/components/DataTable';

type SampleRow = { id: string; name: string; email: string; role: string; status: string };

const sampleProperties = [
  { id: 'name', label: 'Name', value: (r: SampleRow) => <span className="font-medium">{r.name}</span> },
  { id: 'email', label: 'Email', value: (r: SampleRow) => r.email },
  { id: 'role', label: 'Role', value: (r: SampleRow) => r.role },
  { id: 'status', label: 'Status', value: (r: SampleRow) => (
    <span className={r.status === 'Active' ? 'text-green-600' : 'text-red-500'}>{r.status}</span>
  ) },
];

const sampleItems: SampleRow[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { id: '4', name: 'Dave Brown', email: 'dave@example.com', role: 'Editor', status: 'Active' },
  { id: '5', name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Inactive' },
];

const meta: Meta = {
  title: 'Components/Display/DataTable',
  component: DataTable,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: () => (
    <DataTable
      properties={sampleProperties}
      items={sampleItems}
      maxHeight={400}
    />
  ),
};

export const WithPagination: Story = {
  tags: ['unlisted'],
  render: () => {
    const [page, setPage] = React.useState(1);
    return (
      <DataTable
        properties={sampleProperties}
        items={sampleItems.slice(0, 3)}
        enablePagination
        itemsPerPage={3}
        page={page}
        setPage={setPage}
        totalCount={sampleItems.length}
      />
    );
  },
};

export const WithSelection: Story = {
  tags: ['unlisted'],
  render: () => {
    const [selections, setSelections] = React.useState({ selectedIDs: [] as string[], excludedIDs: [] as string[] });
    return (
      <DataTable
        properties={sampleProperties}
        items={sampleItems}
        allowSelection
        selections={selections}
        onSelect={(s) => setSelections({ selectedIDs: s.selectedIDs ?? [], excludedIDs: s.excludedIDs ?? [] })}
      />
    );
  },
};

export const EmptyState: Story = {
  tags: ['unlisted'],
  render: () => (
    <DataTable
      properties={sampleProperties}
      items={[]}
      emptyListRenderer={() => (
        <div className="text-center py-8 opacity-60">No records found.</div>
      )}
    />
  ),
};
