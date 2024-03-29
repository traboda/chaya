'use client';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import mcs from '../utils/merge';

import SearchBox from './SearchBox';
import Dropdown from './Dropdown';
import ListViewItem from './ListView/item';
import { IconInputType } from './Icon';
import SkeletonItem from './SkeletonItem';

const defaultLabels = {
  searchPlaceholder: 'Search',
  searchLabel: 'Search',
  optionsTitle: 'Options',
  selectAll: 'Select All',
  clearAll: 'Clear All',
};

export type DropdownFilterOptionType = {
  label: string,
  value: any,
  iconRenderer?: React.ReactNode,
  iconURL?: string,
  icon?: IconInputType,
  isDisabled?: boolean,
  description?: string,
};

type DropdownCommonProps = {
  labels?: {
    searchPlaceholder?: string,
    searchLabel?: string,
    optionsTitle?: string,
    selectAll?: string,
    clearAll?: string,
  }
  options?: DropdownFilterOptionType[],
  isAsync?: boolean,
  onFetch?: (keyword: string) => Promise<DropdownFilterOptionType[]>,
  optionButtonClassName?: string;
  selections: null | any[];
  setSelections?: (selections: null | any[]) => void;
};

export type DropdownFilterProps = DropdownCommonProps & {
  children: ReactElement;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'end' | 'center';
  dropdownContainerClassName?: string;
  onChangeKeyword?: (keyword: string) => void;
};

type DropdownRenderProps = DropdownCommonProps & {
  keyword: string;
  setKeyword: (keyword: string) => void;
  onLoad: () => void;
  isFetching: boolean;
};

const DropdownRender = ({
  labels: _labels, keyword, options, setKeyword, selections, setSelections = () => {}, onLoad = () => {},
  optionButtonClassName, isFetching = false,
}: DropdownRenderProps) => {

  const labels = { ...defaultLabels, ..._labels };
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const optionRefs = React.useRef<Array<React.RefObject<any>>>([]);

  useEffect(onLoad, []);

  const availableOptions =
  options ?
    options.filter((f) => keyword.length == 0 || f.label.toLowerCase().startsWith(keyword.toLowerCase()))
    : [];

  useEffect(() => {
    optionRefs.current = Array(availableOptions.length).fill(null).map(() => React.createRef());
  }, [availableOptions.length]);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key == 'ArrowDown' || e.key == 'ArrowUp') e.preventDefault();
    switch (e.key) {
      case 'ArrowDown':
        if (highlightedIndex < availableOptions.length - 1) {
          setHighlightedIndex(highlightedIndex + 1);
          optionRefs.current[highlightedIndex + 1].current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          setHighlightedIndex(0);
          optionRefs.current[0].current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        break;
      case 'ArrowUp':
        if (highlightedIndex > 0) {
          setHighlightedIndex(highlightedIndex - 1);
          optionRefs.current[highlightedIndex - 1].current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          setHighlightedIndex(availableOptions.length - 1);
          optionRefs.current[availableOptions.length - 1].current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        break;
      case 'Home':
        setHighlightedIndex(0);
        optionRefs.current[0].current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        break;
      case 'End':
        setHighlightedIndex(availableOptions.length - 1);
        optionRefs.current[availableOptions.length - 1].current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        break;
      case 'Enter':
        if (highlightedIndex != null) {
          const option = availableOptions[highlightedIndex].value;
          if (selections?.includes(option)) {
            setSelections(selections.filter((s) => s != option));
          } else {
            setSelections([...(selections || []), option]);
          }
        }
    }
  };

  return (
    <div>
      <div>
        <SearchBox
          hideLabel
          autoFocus
          keyword={keyword}
          inputClassName="py-1 px-2 border-none rounded-b-none border-b bg-transparent dark:border-gray-500/70 border-gray-500/10"
          buttonClassName="py-1 px-2 border-none outline-none rounded-b-none bg-transparent"
          buttonWrapperClassName="border-none outline-none rounded-b-none border-b bg-transparent dark:border-gray-500/70 border-gray-500/10"
          onKeyDown={handleKeyDown}
          labels={{
            placeholder: labels.searchPlaceholder,
            label: labels.searchLabel,
          }}
          setKeyword={setKeyword}
        />
      </div>
      {labels.optionsTitle?.length > 0 ? (
        <div className="w-full px-2 py-1 bg-background border-b dark:border-gray-500/70 border-gray-500/10">
          <span className="opacity-80 uppercase font-semibold text-xs">
            {labels.optionsTitle}
          </span>
        </div>
      ) : null}
      <div
        className={clsx([
          !(labels.optionsTitle?.length > 0) && 'border-t dark:border-gray-500/70 border-gray-500/10',
          'max-h-[30vh] overflow-y-auto',
        ])}
      >
        {isFetching ? (
          <ul>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center p-2 gap-2">
                <SkeletonItem variant="wave" w={24} h={24} />
                <SkeletonItem variant="wave" w="80%" h={24} />
              </div>
            ))}
          </ul>
        ) : (
          <ul tabIndex={-1} role="listbox">
            {availableOptions.map((field, index) => (
              <DropdownMenu.Item
                key={nanoid()}
                className="!outline-0"
                ref={optionRefs.current[index]}
              >
                <ListViewItem
                  isHighlighted={index == highlightedIndex}
                  isSelectable
                  isSelected={selections?.includes(field.value)}
                  className={optionButtonClassName}
                  item={{
                    title: field.label,
                    id: field.value,
                    description: field.description,
                    iconRenderer: field.iconRenderer,
                    icon: field.icon,
                    iconURL: field.iconURL,
                    isDisabled: field.isDisabled,
                    onClick: () => setSelections(
                      selections ? (
                        selections.includes(field.value) ?
                          [...selections.filter((selection) => selection !== field.value)] :
                          [...selections, field.value]
                      ) : [field.value],
                    ),
                  }}
                  onSelect={() => setSelections(
                    selections ? (
                      selections.includes(field.value) ?
                        [...selections.filter((selection) => selection !== field.value)] :
                        [...selections, field.value]
                    ) : [field.value],
                  )}
                />
              </DropdownMenu.Item>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-between border-t dark:border-gray-500/70 border-gray-500/10 items-center">
        <button
          key={nanoid()}
          className={clsx([
            'flex items-center text-center rounded-b-lg font-semibold justify-center',
            'gap-2 px-3 py-2 hover:bg-white/20 w-full',
            'border-r dark:border-gray-500/70 border-gray-500/10',
            'hover:bg-neutral-500/10 rounded-r-none',
          ])}
          onClick={() => setSelections(availableOptions.map((f) => f.value))}
        >
          {labels.selectAll}
        </button>
        <button
          key={nanoid()}
          className={clsx([
            'flex items-center text-center rounded-b-lg font-semibold justify-center',
            'gap-2 px-3 py-2 hover:bg-white/20 w-full',
            'hover:bg-neutral-500/10 rounded-l-none',
          ])}
          onClick={() => setSelections([])}
        >
          {labels.clearAll}
        </button>
      </div>
    </div>
  );
};

const DropdownFilter = ({
  children, selections, options: _options = [], labels: _labels,
  dropdownContainerClassName,
  optionButtonClassName, align = 'start', side = 'bottom',
  setSelections = () => {},
  onChangeKeyword = () => {},
  isAsync = false,
  onFetch = async () => [],
} : DropdownFilterProps) => {

  const [keyword, setKeyword] = useState<string>('');
  const initialRender = useRef(true);
  const labels = { ...defaultLabels, ..._labels };

  useEffect(() => {
    if (initialRender.current)
      initialRender.current = false;
    else
      onChangeKeyword(keyword);
  }, [keyword]);


  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<DropdownFilterOptionType[]>(_options ?? []);

  const fetchOptions = async (searchKeyword: string) => {
    try {
      const fetchedOptions = await onFetch(searchKeyword);
      const options = typeof fetchedOptions === 'object' && fetchedOptions.length ? fetchedOptions : [];
      setOptions((prev) => {
        const newOptions = options.filter((option) => !prev.find((prevOption) => prevOption.value === option.value));
        return [...prev, ...newOptions];
      });
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (isAsync) {
      setIsFetching(true);
      fetchOptions(keyword);
    }
  }, [isAsync, keyword]);

  return (
    <Dropdown
      align={align}
      side={side}
      containerClassName={mcs([
        'z-[100] border dark:border-gray-500/70 border-gray-500/10',
        dropdownContainerClassName,
      ])}
      buttonRenderer={(
        <div className="w-fit">
          {children}
        </div>
      )}
    >
      <DropdownRender
        onLoad={() => onChangeKeyword(keyword)}
        labels={labels}
        keyword={keyword}
        setKeyword={setKeyword}
        selections={selections}
        setSelections={setSelections}
        options={options}
        isFetching={isFetching}
        optionButtonClassName={optionButtonClassName}
      />
    </Dropdown>
  );
};

export default DropdownFilter;
