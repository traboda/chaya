import React, { useMemo, useState } from 'react';
import clsx from 'clsx';

import DropdownFilter from '../DropdownFilter';
import Button from '../Button';

export type FilterInputs = {
  [key: string]: (string | number)[]
};

export type DataTableFilterConfig = {
  key: string,
  options?: {
    label: string,
    value: string,
  }[]
  isHidden?: boolean,
  onFetch?: (keyword: string) => Promise<{ label: string, value: string }[]>,
  labels?: {
    label?: string,
    searchLabel?: string,
    optionsTitle?: string,
  }
};

const DataTableManagerFilters = ({
  filterConfig, filters, setFilters = () => {},
} : {
  filterConfig: DataTableFilterConfig[],
  filters?: FilterInputs,
  setFilters?: (f: FilterInputs) => void,
}) => {

  const [allOptions, setAllOptions] = useState<{ [key: string]: { label: string, value: string }[] }>({
    ...filterConfig.reduce((acc, f) => ({ ...acc, [f.key]: [] }), {}),
  });

  const getOptions = (f: DataTableFilterConfig) => {
    if (typeof f.onFetch === 'function')
      return allOptions[f.key] || [];
    if (f.options) return f.options ?? [];
    return [];
  };

  const isFilteredView = useMemo(() =>
    filterConfig.find((f) =>
      filters?.[f.key]?.length
      && (
        // for async options
        (getOptions(f).length < 2)
        // for static options
        || (
          getOptions(f).length > 1
          && getOptions(f).length != filters?.[f.key]?.length
        )
      ),
    ), [filterConfig]);

  const fetch = async (key: string, keyword: string, onFetch: (keyword: string) => Promise<{ label: string, value: string }[]>) => {
    const options = await onFetch(keyword);
    setAllOptions((prev) => ({
      ...prev,
      [key]: [...new Set([
        ...(prev[key] || []),
        ...(filterConfig.find((f) => f.key === key)?.options ?? []),
        ...options,
      ])],
    }));

    return options;
  };

  return (
    <div
      className={clsx([
        'dark:bg-gray-500/20 bg-gray-500/10 border dark:border-neutral-500/70 border-neutral-500/10',
        'mx-2 mb-2 shadow-inner rounded-lg p-2',
      ])}
    >
      <div className="flex items-center flex-wrap gap-1 w-full">
        {filterConfig.filter((f) =>
          (typeof f.onFetch === 'function' || f.options?.length) && !f.isHidden,
        ).map((f) => {
          const optionsLength = getOptions(f).length;
          const isFiltered = (
            filters?.[f.key] && filters?.[f.key]?.length &&
              (optionsLength < 2 || (optionsLength > 1 && (filters?.[f.key]?.length < optionsLength)))
          );
          return (
            <div key={f.key} className="p-1">
              <DropdownFilter
                options={f.options}
                isAsync={typeof f.onFetch === 'function'}
                onFetch={(keyword) =>
                  typeof f.onFetch === 'function' ? fetch(f.key, keyword, f.onFetch) : Promise.resolve([])
                  }
                labels={{
                  searchLabel: f.labels?.searchLabel,
                  optionsTitle: f.labels?.optionsTitle,
                }}
                selections={filters?.[f.key] || []}
                setSelections={(selections) => setFilters({ ...filters, [f.key]: selections ?? [] })}
              >
                <Button
                  variant={isFiltered ? 'solid' : 'minimal'}
                  color={isFiltered ? 'primary' : 'shade'}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <i className="ri-filter-line" />
                  {f.labels?.label}
                </Button>
              </DropdownFilter>
            </div>
          );
        })}
      </div>
      {(isFilteredView) ? (
        <div className="flex items-center flex-wrap gap-2 mt-2 border-t dark:border-gray-500/70 border-gray-500/10 pt-2">
          {filterConfig.filter((f) => {
            const optionsLength = getOptions(f).length;
            return (
              filters?.[f.key] && filters?.[f.key]?.length &&
              (optionsLength < 2 || (optionsLength > 1 && (filters?.[f.key]?.length < optionsLength)))
            );
          }).map((f) => (
            <div className="md:flex items-center px-1 pb-3 pt-1" key={f.key}>
              {(f.labels && f.labels.label && f.labels.label?.length > 0) ? (
                <div className="md:mr-2 mb-1 md:mb-0 text-sm font-semibold">
                  {`${f.labels?.label}:`}
                </div>
              ) : null}
              {filters?.[f.key]?.map((s: any, index: number) => (
                <Button
                  size="xs"
                  key={index}
                  variant="minimal"
                  className="mr-1"
                  onClick={() => setFilters({
                    ...filters,
                    [f.key]: filters?.[f.key]?.filter((_s: any) => _s !== s),
                  })}
                >
                  {allOptions[f.key]?.find((o) => o.value === s)?.label ?? s}
                  <i className="ri-close-line" title="cancel" />
                </Button>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );

};

export default DataTableManagerFilters;