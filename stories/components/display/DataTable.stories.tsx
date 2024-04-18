import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { DataTable, Icon } from '../../../src';
import { DataTableProps } from '../../../src/components/DataTable';
import { ItemListerProperty } from '../../../src/components/DataTable/Row';
import DataTableManager from '../../../src/components/DataTableManager';

const meta: Meta = {
  title: 'Components/Display/DataTable',
  component: DataTable,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    onSelect: { action: 'select' },
  },
  parameters: {
    controls: { expanded: true },
  },
};

type ItemType = {
  id: string;
  name: string;
  points: number;
  difficultyLevel: {
    label: string;
    level: number;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
};

let ITEMS: ItemType[] = [
  {
    id: '55',
    name: 'Attack matter ball budget pattern.',
    points: 150,
    difficultyLevel: {
      label: 'Beginner',
      level: 1,
    },
    category: {
      id: '11',
      name: 'Hardware',
      slug: 'hardware',
    },
  },
  {
    id: '54',
    name: 'Low fall nor until receive.',
    points: 150,
    difficultyLevel: {
      label: 'Medium',
      level: 3,
    },
    category: {
      id: '11',
      name: 'Hardware',
      slug: 'hardware',
    },
  },
  {
    id: '53',
    name: 'Everybody simple also.',
    points: 150,
    difficultyLevel: {
      label: 'Beginner',
      level: 1,
    },
    category: {
      id: '13',
      name: 'Pentesting',
      slug: 'pentesting',
    },
  },
  {
    id: '52',
    name: 'Summer these group.',
    points: 150,
    difficultyLevel: {
      label: 'Expert',
      level: 5,
    },
    category: {
      id: '12',
      name: 'Reversing',
      slug: 'reversing',
    },
  },
  {
    id: '51',
    name: 'News recent third environment.',
    points: 150,
    difficultyLevel: {
      label: 'Expert',
      level: 5,
    },
    category: {
      id: '14',
      name: 'Programming',
      slug: 'programming',
    },
  },
  {
    id: '50',
    name: 'Support offer concern parent.',
    points: 150,
    difficultyLevel: {
      label: 'Easy',
      level: 2,
    },
    category: {
      id: '12',
      name: 'Reversing',
      slug: 'reversing',
    },
  },
  {
    id: '49',
    name: 'Become hit order field indicate.',
    points: 150,
    difficultyLevel: {
      label: 'Easy',
      level: 2,
    },
    category: {
      id: '11',
      name: 'Hardware',
      slug: 'hardware',
    },
  },
  {
    id: '48',
    name: 'Want win third myself.',
    points: 150,
    difficultyLevel: {
      label: 'Hard',
      level: 4,
    },
    category: {
      id: '15',
      name: 'Cryptography',
      slug: 'cryptography',
    },
  },
  {
    id: '47',
    name: 'Level miss food plant back.',
    points: 150,
    difficultyLevel: {
      label: 'Medium',
      level: 3,
    },
    category: {
      id: '13',
      name: 'Pentesting',
      slug: 'pentesting',
    },
  },
  {
    id: '46',
    name: 'Meet politics look fire usually.',
    points: 150,
    difficultyLevel: {
      label: 'Beginner',
      level: 1,
    },
    category: {
      id: '14',
      name: 'Programming',
      slug: 'programming',
    },
  },
];
ITEMS = ITEMS.flatMap((item) => {
  const start = Math.floor(Math.random() * (ITEMS.length - 4));
  return [
    item,
    ...ITEMS.slice(start, start + Math.floor(Math.random() * 2) + 2),
  ];
});

export default meta;

const columns: ItemListerProperty<ItemType>[] = [
  {
    id: 'name',
    label: 'Name',
    link: (i) => `#${i.id}`,
    value: (i) => <span>{i.name}</span>,
    allowSort: true,
  },
  {
    id: 'category',
    label: 'Category',
    width: 150,
    value: (i) => i.category?.name,
    allowSort: true,
  },
  {
    id: 'difficultyLevel',
    label: 'Difficulty',
    width: 150,
    value: (i) => i?.difficultyLevel?.label,
    textAlign: 'right',
    allowSort: true,
  },
  {
    id: 'points',
    label: 'Points',
    value: (i) => i.points,
    textAlign: 'right',
  },
  {
    id: 'difficultyLevel1',
    label: 'Difficulty',
    value: (i) => i?.difficultyLevel?.label,
    allowSort: true,
  },
  {
    id: 'points2',
    label: 'Points',
    value: (i) => i.points,
    allowSort: true,
    textAlign: 'center',
  },
  {
    id: 'difficultyLevel3',
    label: 'Difficulty',
    value: (i) => i?.difficultyLevel?.label,
    allowSort: true,
  },
  {
    id: 'points4',
    label: 'Points',
    stickRight: true,
    value: (i) => i?.points,
    allowSort: true,
  },
];
const Template: Story<DataTableProps<ItemType>> = (args) => {
  const [page, setPage] = useState(1);

  return (
    <DataTable
      {...args}
      page={page}
      setPage={setPage}
      totalCount={args?.items ? args?.items.length : ITEMS.length}
      items={args?.items ? args.items : ITEMS.slice((page - 1) * 10, (page - 1) * 10 + 10)}
      maxHeight="380px"
      properties={args?.properties ? args?.properties : columns}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  sortOrder: 'asc',
  currentSortAttribute: 'name',
};

export const Grid = Template.bind({});
Grid.args = { variant:'grid' };

export const StripedRow = Template.bind({});
StripedRow.args = { variant:'striped-row' };

export const StripedColumn = Template.bind({});
StripedColumn.args = { variant:'striped-column' };

export const WithTitleIcon = Template.bind({});
WithTitleIcon.args = {
  properties: columns.map((i) => ({
    ...i,
    icon: 'home',
  })),
};

export const SelectableTable = Template.bind({});
SelectableTable.args = {
  allowSelection: true,
};

export const AccordionTable = Template.bind({});
AccordionTable.args = {
  canExpand: true,
  accordionRenderer: (c) => (
    <div className="p-4">
      <div className="text-sm text-gray-500">
        {c?.name}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
        atque eius esse molestiae molestias, nobis, quasi quidem quis, sequi sit
        sunt suscipit veritatis. Deserunt doloremque et, officiis quia quibusdam
        quis.
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
          deleniti dicta distinctio, dolorum eligendi est illo incidunt maiores,
          necessitatibus, nemo nobis possimus quaerat quas reiciendis repellat
          sapiente unde voluptas voluptate.
        </p>
      </div>
    </div>
  ),
};

export const WithTopBar = Template.bind({});
WithTopBar.args = {
  customTopBarRenderer: () => (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
      consectetur dolores illo incidunt iure minima molestias non optio porro,
      possimus, quam quis rerum saepe suscipit temporibus vero vitae voluptates.
      Commodi deserunt eveniet ex illo omnis porro repellat repellendus? Debitis
      expedita fugit ipsam natus optio porro sequi tempore? Aliquid amet ea
      itaque possimus ullam. Ab atque cum debitis doloribus dolorum eligendi
      fuga inventore necessitatibus nisi nobis porro possimus reprehenderit
      temporibus totam, voluptatibus. Aspernatur facere iste iusto obcaecati
      porro quis, quos sequi suscipit unde vero! Accusantium aliquid, aperiam
      aspernatur assumenda doloribus eos expedita laudantium, odit optio
      pariatur rem reprehenderit repudiandae velit voluptate.
    </div>
  ),
};

const ContainedTableTemplate: Story<DataTableProps<ItemType>> = (args) => (
  <div style={{ width: '500px', height: '720px' }}>
    <DataTable {...args} items={ITEMS} maxHeight="380px" properties={columns} />
  </div>
);

export const ContainedTable = ContainedTableTemplate.bind({});

ContainedTable.args = {};

export const StickyRowTemplate = Template.bind({});
StickyRowTemplate.args = {
  stickyRow: {
    id: '55',
    name: 'This Row Sticks',
    points: 150,
    difficultyLevel: {
      label: 'Beginner',
      level: 1,
    },
    category: {
      id: '11',
      name: 'Hardware',
      slug: 'hardware',
    },
  },
};

export const OverflowTemplate = Template.bind({});
OverflowTemplate.args = {
  properties: columns.map((c, i) => ({ ...c, width: i === 0 ? 100 : c.width })),
};

export const EmptyTableListing = Template.bind({});
EmptyTableListing.args = {
  properties: columns,
  items: [],
  showTopBarOnEmpty: true,
  emptyListRenderer: () => (
    <div className="text-center py-4 flex items-center justify-center gap-2">
      <Icon icon="info" />
      The datatable is empty
    </div>
  ),
};

const DataTableManagerTemplate: Story<DataTableProps<ItemType>> = (args) => {

  const [keyword, setKeyword] = useState<string>('');
  const [columnsSelected, setColumns] = useState<string[]>(columns.map(c => c.id));
  const [selections, setSelections] = useState<any>({
    selectedIDs: [ITEMS[0].id, ITEMS[1].id],
  });
  const [filters, setFilters] = useState<any>({
    category: ['hardware'],
  });

  return (
    <DataTable
      {...args}
      items={ITEMS}
      properties={columns}
      activePropertyIDs={columnsSelected}
      allowSelection
      selections={selections}
      onSelect={setSelections}
      customTopBarRenderer={() => (
        <DataTableManager
          keyword={keyword}
          setKeyword={setKeyword}
          onDownload={() => { window.alert('Download'); return []; }}
          onCreate={() => window.alert('Create')}
          tabs={[
            { label: 'All', key: 'all' },
            { label: 'Selected', key: 'selected' },
            { label: 'Excluded', key: 'excluded' },
          ]}
          currentTab="all"
          filters={filters}
          setFilters={setFilters}
          filterConfig={[
            {
              key: 'category',
              labels: {
                label: 'Category',
                searchLabel: 'Search Category',
              },
              options: [
                { value: 'hardware', label: 'Hardware' },
                { value: 'reversing', label: 'Reversing' },
                { value: 'pentesting', label: 'Pentesting' },
                { value: 'programming', label: 'Programming' },
                { value: 'cryptography', label: 'Cryptography' },
              ],
            },
          ]}
          selections={{
            selected: selections?.selectedIDs?.length || 0,
            excluded: selections?.excludedIDs?.length || 0,
            total: ITEMS.length,
          }}
          selectionActions={[
            {
              label: 'Delete',
              onClick: () => window.alert('Delete'),
            },
          ]}
          onCancelSelections={() => setSelections({ selectedIDs: [], excludedIDs: [] })}
          selectedColumns={columnsSelected}
          setColumns={setColumns}
          columns={columns.map(c => ({ value: c.id || '-', label: c?.label ? c.label.toString() : '-' }))}

        />
      )}
    />
  );

};
export const WithDataTableManager = DataTableManagerTemplate.bind({});

WithDataTableManager.args = {};

const DataTableManagerPaginationTemplate: Story<DataTableProps<ItemType>> = (args) => {

  const [keyword, setKeyword] = useState<string>('');
  const [columnsSelected, setColumns] = useState<string[]>(columns.map(c => c.id));
  const [selections, setSelections] = useState<any>({
    selectedIDs: [ITEMS[0].id, ITEMS[1].id],
  });
  const [filters, setFilters] = useState<any>({
    category: ['hardware'],
  });

  return (
    <DataTable
      items={ITEMS}
      properties={columns}
      activePropertyIDs={columnsSelected}
      allowSelection
      selections={selections}
      onSelect={setSelections}
      enablePagination
      totalCount={500}
      itemsPerPage={5}
      page={5}
      setPage={(page) => console.log(page)}
      customTopBarRenderer={() => (
        <DataTableManager
          keyword={keyword}
          setKeyword={setKeyword}
          onDownload={() => { window.alert('Download'); return []; }}
          onCreate={() => window.alert('Create')}
          tabs={[
            { label: 'All', key: 'all' },
            { label: 'Selected', key: 'selected' },
            { label: 'Excluded', key: 'excluded' },
          ]}
          currentTab="all"
          filters={filters}
          setFilters={setFilters}
          filterConfig={[
            {
              key: 'category',
              labels: {
                label: 'Category',
                searchLabel: 'Search Category',
              },
              options: [
                { value: 'hardware', label: 'Hardware' },
                { value: 'reversing', label: 'Reversing' },
                { value: 'pentesting', label: 'Pentesting' },
                { value: 'programming', label: 'Programming' },
                { value: 'cryptography', label: 'Cryptography' },
              ],
            },
          ]}
          selections={{
            selected: selections?.selectedIDs?.length || 0,
            excluded: selections?.excludedIDs?.length || 0,
            total: ITEMS.length,
          }}
          selectionActions={[
            {
              label: 'Delete',
              onClick: () => window.alert('Delete'),
            },
          ]}
          onCancelSelections={() => setSelections({ selectedIDs: [], excludedIDs: [] })}
          selectedColumns={columnsSelected}
          setColumns={setColumns}
          columns={columns.map(c => ({ value: c.id || '-', label: c?.label ? c.label.toString() : '-' }))}
        />
      )}
    />
  );

};
export const WithDataTableManagerPagination = DataTableManagerPaginationTemplate.bind({});

WithDataTableManagerPagination.args = {};