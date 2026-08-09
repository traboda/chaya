import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import DataTable from '../../../src/components/DataTable';
import DataTableManager from '../../../src/components/DataTableManager';

type SampleRow = { id: string; name: string; category: string; difficulty: string; points: number };

const sampleProperties = [
  {
    id: 'name',
    label: 'Name',
    value: (r: SampleRow) => <a className="text-blue-500 hover:underline">{r.name}</a>,
    allowSort: true,
  },
  { id: 'category', label: 'Category', value: (r: SampleRow) => r.category, allowSort: true },
  {
    id: 'difficulty',
    label: 'Difficulty',
    value: (r: SampleRow) => r.difficulty,
    textAlign: 'center' as const,
    allowSort: true,
  },
  {
    id: 'points',
    label: 'Points',
    value: (r: SampleRow) => r.points,
    textAlign: 'center' as const,
    allowSort: true,
  },
];

const sampleItems: SampleRow[] = [
  {
    id: '1',
    name: 'Attack matter ball budget pattern.',
    category: 'Hardware',
    difficulty: 'Beginner',
    points: 150,
  },
  {
    id: '2',
    name: 'News recent third environment.',
    category: 'Programming',
    difficulty: 'Expert',
    points: 150,
  },
  {
    id: '3',
    name: 'Support offer concern',
    category: 'Reversing',
    difficulty: 'Easy',
    points: 150,
  },
  {
    id: '4',
    name: 'Final check system review',
    category: 'Forensics',
    difficulty: 'Medium',
    points: 250,
  },
  {
    id: '5',
    name: 'Network packet analysis',
    category: 'Networking',
    difficulty: 'Hard',
    points: 300,
  },
  {
    id: '6',
    name: 'Binary exploitation basics',
    category: 'Programming',
    difficulty: 'Beginner',
    points: 100,
  },
  { id: '7', name: 'Web application testing', category: 'Web', difficulty: 'Medium', points: 200 },
  {
    id: '8',
    name: 'Cryptographic challenge',
    category: 'Crypto',
    difficulty: 'Expert',
    points: 400,
  },
];

const propertiesWithIcon = sampleProperties.map((p) => ({
  ...p,
  icon: 'ri-table-line',
}));

const meta: Meta = {
  title: 'Components/Display/DataTable',
  component: DataTable,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: () => <DataTable properties={sampleProperties} items={sampleItems} maxHeight={400} />,
};

export const Grid: Story = {
  render: () => (
    <DataTable properties={sampleProperties} items={sampleItems} variant="grid" maxHeight={400} />
  ),
};

export const StripedRow: Story = {
  render: () => (
    <DataTable
      properties={sampleProperties}
      items={sampleItems}
      variant="striped-row"
      maxHeight={400}
    />
  ),
};

export const StripedColumn: Story = {
  render: () => (
    <DataTable
      properties={sampleProperties}
      items={sampleItems}
      variant="striped-column"
      maxHeight={400}
    />
  ),
};

export const WithTitleIcon: Story = {
  render: () => <DataTable properties={propertiesWithIcon} items={sampleItems} maxHeight={400} />,
};

export const SelectableTable: Story = {
  render: () => {
    const [selections, setSelections] = React.useState({
      selectedIDs: [] as string[],
      excludedIDs: [] as string[],
    });
    return (
      <DataTable
        properties={sampleProperties}
        items={sampleItems}
        allowSelection
        selections={selections}
        onSelect={(s) =>
          setSelections({ selectedIDs: s.selectedIDs ?? [], excludedIDs: s.excludedIDs ?? [] })
        }
        maxHeight={400}
      />
    );
  },
};

export const AccordionTable: Story = {
  render: () => (
    <DataTable
      properties={sampleProperties}
      items={sampleItems}
      canExpand
      accordionRenderer={(item) => (
        <div className="p-4">
          <p className="font-medium">{item.name}</p>
          <p className="mt-1 opacity-70">
            Category: {item.category} | Difficulty: {item.difficulty} | Points: {item.points}
          </p>
        </div>
      )}
      maxHeight={500}
    />
  ),
};

export const WithTopBar: Story = {
  render: () => (
    <DataTable
      properties={sampleProperties}
      items={sampleItems}
      customTopBarRenderer={() => (
        <div className="flex items-center justify-between border-b p-3">
          <span className="font-semibold">Challenges</span>
          <span className="text-sm opacity-60">{sampleItems.length} records</span>
        </div>
      )}
      maxHeight={400}
    />
  ),
};

export const ContainedTable: Story = {
  render: () => (
    <DataTable
      properties={sampleProperties}
      items={sampleItems}
      variant="grid"
      classNames={{ wrapper: 'border rounded-lg overflow-hidden' }}
      maxHeight={400}
    />
  ),
};

export const StickyRowTemplate: Story = {
  render: () => (
    <DataTable
      properties={sampleProperties}
      items={sampleItems}
      stickyRow={{
        id: 'sticky',
        name: 'Pinned Row (Total)',
        category: '-',
        difficulty: '-',
        points: sampleItems.reduce((s, r) => s + r.points, 0),
      }}
      maxHeight={400}
    />
  ),
};

export const OverflowTemplate: Story = {
  render: () => {
    const wideProperties = [
      ...sampleProperties,
      {
        id: 'difficulty2',
        label: 'Difficulty',
        value: (r: SampleRow) => r.difficulty,
        allowSort: true,
      },
      { id: 'points2', label: 'Points', value: (r: SampleRow) => r.points, allowSort: true },
      {
        id: 'difficulty3',
        label: 'Difficulty',
        value: (r: SampleRow) => r.difficulty,
        allowSort: true,
      },
      { id: 'points3', label: 'Points', value: (r: SampleRow) => r.points, allowSort: true },
    ];
    return <DataTable properties={wideProperties} items={sampleItems} maxHeight={400} />;
  },
};

export const EmptyTableListing: Story = {
  render: () => (
    <DataTable
      properties={sampleProperties}
      items={[]}
      emptyListRenderer={() => (
        <div className="py-12 text-center opacity-60">
          <p className="text-lg font-medium">No records found</p>
          <p className="mt-1 text-sm">Try adjusting your filters or create a new entry.</p>
        </div>
      )}
    />
  ),
};

export const WithDataTableManager: Story = {
  render: () => {
    const [keyword, setKeyword] = React.useState('');
    const filtered = sampleItems.filter((r) =>
      r.name.toLowerCase().includes(keyword.toLowerCase())
    );
    return (
      <DataTable
        properties={sampleProperties}
        items={filtered}
        maxHeight={400}
        customTopBarRenderer={() => (
          <DataTableManager
            keyword={keyword}
            setKeyword={setKeyword}
            totalCount={filtered.length}
            labels={{ label: 'Challenge', labelPlural: 'Challenges' }}
          />
        )}
      />
    );
  },
};

export const WithDataTableManagerPagination: Story = {
  render: () => {
    const [keyword, setKeyword] = React.useState('');
    const [page, setPage] = React.useState(1);
    const itemsPerPage = 3;
    const filtered = sampleItems.filter((r) =>
      r.name.toLowerCase().includes(keyword.toLowerCase())
    );
    const paged = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    return (
      <DataTable
        properties={sampleProperties}
        items={paged}
        enablePagination
        itemsPerPage={itemsPerPage}
        page={page}
        setPage={setPage}
        totalCount={filtered.length}
        maxHeight={400}
        customTopBarRenderer={() => (
          <DataTableManager
            keyword={keyword}
            setKeyword={setKeyword}
            totalCount={filtered.length}
            labels={{ label: 'Challenge', labelPlural: 'Challenges' }}
          />
        )}
      />
    );
  },
};
