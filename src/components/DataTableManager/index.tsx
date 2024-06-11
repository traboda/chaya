'use client';
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { flatten } from 'flatten-anything';

import Button from '../Button';
import SearchBox from '../SearchBox';
import DropdownFilter from '../DropdownFilter';
import { IconInputType } from '../Icon';
import { HorizontalNavigatorItemType } from '../HorizontalNavigator/item';
import HorizontalNavigator from '../HorizontalNavigator';

import DataTableManagerFilters, { DataTableFilterConfig, FilterInputs } from './filters';

export type DataTableManagerProps = {
  // search
  keyword?: string
  setKeyword?: (keyword: string) => void
  // meta
  totalCount?: number
  isLoading?: boolean
  labels?: {
    searchLabel?: string,
    searchPlaceholder?: string,
    label?: string,
    labelPlural?: string,
    create?: string,
  }
  // columns
  columns?: { label: string, value: string }[],
  selectedColumns?: string[],
  setColumns?: (c: string[]) => void,
  // filters
  filterConfig?: DataTableFilterConfig[],
  filters?: FilterInputs,
  setFilters?: (f: FilterInputs) => void,

  // download
  onDownload?: () => Promise<object[]> | object[],
  onDownloadClick?: () => void,
  isDownloadLoading?: boolean,

  // create
  onCreate?: () => void,
  creatorPopupRenderer?: (isCreating: boolean, setCreating: (isCreating: boolean) => void) => React.ReactNode,

  // selections
  selections?: {
    selectedIDs: string[],
    excludedIDs: string[],
  },
  onCancelSelections?: () => void,
  selectionActions?: {
    label: string,
    onClick: () => void,
    isDisabled?: boolean,
    isHidden?: boolean,
    leftIcon?: IconInputType,
    rightIcon?: IconInputType,
  }[],

  // tag filters
  tabs?: HorizontalNavigatorItemType[],
  currentTab?: string,
  onTabChange?: (key: string, item: HorizontalNavigatorItemType) => void,

};

const defaultLabels = {
  label: 'Record',
  labelPlural: 'Records',
  searchLabel: 'Search',
  searchPlaceholder: 'Search...',
  create: 'Create',
};


const DataTableManager = ({
  keyword, setKeyword, labels: _labels, isLoading = false, totalCount,
  filterConfig, filters, setFilters = () => {},
  onDownload, onDownloadClick, isDownloadLoading = false, onCreate, creatorPopupRenderer,
  tabs, currentTab, onTabChange = () => {},
  columns, selectedColumns = [], setColumns = () => {},
  selections, onCancelSelections = () => {}, selectionActions = [],
}: DataTableManagerProps) => {

  const labels = { ...defaultLabels, ..._labels };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_keyword, _setKeyword] = useState(keyword || '');

  const [showFilters, setShowFilters] = useState<boolean>(
    !!(
      filterConfig && filterConfig.length > 0 &&
      filters && Object.keys(filters).find((k) => filters[k]?.length > 0)
    ),
  );

  const handleDownload = async () => {
    if (typeof onDownload !== 'function')
      return;
    const data = await onDownload();
    if (!data) return;
    const csv = Papa.unparse(data?.map((i) => flatten(i)));
    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const csvURL = window.URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.setAttribute('href', csvURL);
    link.setAttribute('download', `${labels.label || 'data'}_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    _setKeyword(keyword || '');
  }, [keyword]);

  const [showCreator, setShowCreator] = useState(false);
  const handleCreate = () => {
    if (typeof onCreate === 'function') onCreate();
    if (typeof creatorPopupRenderer == 'function') setShowCreator(true);
  };

  return (
    <div className="flex flex-col gap-2">
      {typeof creatorPopupRenderer == 'function' && (
        creatorPopupRenderer(showCreator, setShowCreator)
      )}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <div className="md:flex items-center justify-between w-full">
          {(typeof keyword === 'string' && typeof setKeyword === 'function') ? (
            <SearchBox
              hideLabel
              labels={{
                label: labels.searchLabel,
                placeholder: labels.searchPlaceholder,
              }}
              keyword={_keyword}
              setKeyword={_setKeyword}
              onSearch={(k) => setKeyword(k)}
              className="w-full"
            />
          ) : null}
          {!isLoading && (
            <div className="p-2 flex md:justify-end" style={{ width: 'inherit' }}>
              {`${totalCount ?? 0} ${labels.labelPlural}`}
            </div>
          )}
        </div>
        {tabs && tabs?.length > 0 ? (
          <HorizontalNavigator
            items={tabs}
            activeItem={currentTab}
            onClickItem={onTabChange}
            itemClassName="py-1 px-3 text-base"
          />
        ) : null}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {(filters && !showFilters) ? (
              <Button
                type="button"
                variant="minimal"
                color="shade"
                onClick={() => setShowFilters(true)}
                title="Filter Table"
                className="px-2 py-1"
              >
                <i className="ri-filter-line text-lg" title="filter" />
              </Button>
            ) : filters && showFilters ? (
              <Button
                variant="minimal"
                color="shade"
                className="px-2 py-0.5"
                onClick={() => {
                  setFilters({
                    ...filters,
                    ...Object.fromEntries((filterConfig || []).map((f) => [f.key, []])),
                  });
                  setShowFilters(false);
                }}
                title="Clear Filters"
              >
                <i className="ri-filter-off-line text-lg" title="close" />
              </Button>
            ) : null}
            {(columns && columns?.length > 0) ? (
              <DropdownFilter
                align="end"
                options={columns}
                labels={{
                  searchLabel: 'Search for Columns',
                  optionsTitle: 'Columns',
                  searchPlaceholder: 'Search Columns',
                }}
                selections={selectedColumns}
                setSelections={(columns) => setColumns(columns ?? [])}
              >
                <Button
                  type="button"
                  color="shade"
                  variant="minimal"
                  title="Select Columns to Display"
                  className="px-2 py-1"
                >
                  <i className="ri-kanban-view-2 text-lg" title="columns" />
                </Button>
              </DropdownFilter>
            ) : null}
            {(typeof onDownload === 'function' || typeof onDownloadClick === 'function') ? (
              <Button
                type="button"
                variant="minimal"
                color="shade"
                onClick={() => typeof onDownload === 'function' ? handleDownload() : onDownloadClick?.()}
                isLoading={isDownloadLoading}
                isDisabled={isDownloadLoading}
                className="px-2 py-1"
                title="Download Table"
              >
                <i className="ri-download-line text-lg" title="download" />
              </Button>
            ) : null}

          </div>
          {(typeof onCreate === 'function' || typeof creatorPopupRenderer == 'function') && (
            <Button
              type="button"
              variant="solid"
              color="primary"
              onClick={handleCreate}
              rightIcon="plus"
              className="!py-1.5"
            >
              Create
            </Button>
          )}
        </div>
      </div>
      {showFilters && filterConfig && filterConfig?.length > 0 ? (
        <DataTableManagerFilters
          filterConfig={filterConfig}
          filters={filters}
          setFilters={setFilters}
        />
      ) : null}
      {(selections && (selections?.selectedIDs?.length || selections.excludedIDs?.length)) ? (
        <div
          className="flex flex-wrap dark:bg-gray-500/20 bg-gray-500/10 rounded-t-lg border dark:border-neutral-500/70 border-neutral-500/10 shadow px-2 py-1 mx-0"
        >
          <div className="w-full md:w-1/2 lg:w-1/3 px-3 py-2 flex items-center gap-2">
            {selections?.selectedIDs?.length == 1 && selections?.selectedIDs?.[0] === '-1' ? (
              <span>
                All selected
                {selections?.excludedIDs?.length ? `, excluding ${selections?.excludedIDs?.length}` : null}
              </span>
            ) : selections?.selectedIDs?.length ? (
              <span>
                {`${selections?.selectedIDs?.length} selected`}
              </span>
            ) : null}
            <Button
              variant="minimal"
              color="shade"
              size="xl"
              className="px-1 py-0 text-red-600"
              title="Cancel Selections"
              rightIcon="times"
              onClick={onCancelSelections}
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-2/3 px-2 py-2 flex items-center justify-end gap-2">
            {selectionActions?.filter((a) => !a.isHidden).map((a) => (
              <Button
                variant="minimal"
                color="shade"
                className="!py-1"
                key={a.label}
                title={a.label}
                isDisabled={a.isDisabled}
                leftIcon={a.leftIcon}
                rightIcon={a.rightIcon}
                onClick={a.onClick}
              >
                {a.label}
              </Button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );

};

export default DataTableManager;
