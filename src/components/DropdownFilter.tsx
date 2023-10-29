'use client';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import Checkbox from './Checkbox';
import SearchBox from './SearchBox';
import Dropdown from './Dropdown';

const defaultLabels = {
  searchPlaceholder: 'Search',
  searchLabel: 'Search',
  optionsTitle: 'Options',
  showAll: 'Show All',
};

type DropdownCommonProps = {
  labels?: {
    searchPlaceholder?: string,
    searchLabel?: string,
    optionsTitle?: string,
    showAll?: string,
  }
  options: {
    label: string,
    value: any,
  }[];
  optionButtonClassName?: string;
  selections: null | any[];
  setSelections?: (selections: null | any[]) => void;
};

export type DropdownFilterProps = DropdownCommonProps & {
  children: ReactElement;
  dropdownContainerClassName?: string;
  onChangeKeyword?: (keyword: string) => void;
};

type DropdownRenderProps = DropdownCommonProps & {
  keyword: string;
  setKeyword: (keyword: string) => void;
  onLoad: () => void;
};

const DropdownRender = ({
  labels: _labels, keyword, options, setKeyword, selections, setSelections = () => {}, onLoad = () => {},
  optionButtonClassName,
}: DropdownRenderProps) => {

  const labels = { ...defaultLabels, ..._labels };
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const optionRefs = React.useRef<Array<React.RefObject<HTMLButtonElement>>>([]);
  const availableOptions = options.filter((f) => keyword.length == 0 || f.label.toLowerCase().startsWith(keyword.toLowerCase()));

  useEffect(() => {
    optionRefs.current = Array(availableOptions.length).fill(null).map(() => React.createRef());
  }, [availableOptions.length]);
  

  useEffect(onLoad, []);

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
      <div className="dsr-pb-1">
        <SearchBox
          hideLabel
          autoFocus
          keyword={keyword}
          inputClassName="dsr-py-1 dsr-px-2 !dsr-border-0 !dsr-rounded-b-none !dsr-border-b !dsr-bg-transparent !dsr-border-gray-100/20"
          buttonClassName="dsr-p-1 !dsr-border-none !dsr-outline-none !dsr-rounded-b-none !dsr-bg-transparent"
          buttonWrapperClassName="!dsr-border-0 !dsr-outline-none !dsr-rounded-b-none !dsr-border-b !dsr-bg-transparent !dsr-border-gray-100/20"
          onKeyDown={handleKeyDown}
          labels={{
            placeholder: labels.searchPlaceholder,
            label: labels.searchLabel,
          }}
          setKeyword={setKeyword}
        />
      </div>
      <div className="dsr-opacity-50 dsr-text-xs dsr-px-2 dsr-py-1 dsr-uppercase dsr-font-semibold">
        {labels.optionsTitle}
      </div>
      <div className="dsr-max-h-[20vh] dsr-overflow-y-auto">
        {availableOptions.map((field, index) => (
          <button
            key={nanoid()}
            ref={optionRefs.current[index]}
            className={clsx([
              'dsr-flex dsr-items-center dsr-justify-start dsr-gap-2 dsr-px-3 dsr-py-1 hover:dsr-bg-white/20 dsr-w-full',
              index == highlightedIndex && 'dsr-bg-white/20',
              optionButtonClassName,
            ])}
            onClick={() => setSelections(
              selections ? (
                selections.includes(field.value) ?
                  [...selections.filter((selection) => selection !== field.value)] :
                  [...selections, field.value]
              ) : [field.value],
            )}
          >
            <Checkbox
              value={field.value}
              label={field.label}
              isChecked={selections?.includes(field.value)}
            />
          </button>
        ))}
      </div>
      <div className="mt-1">
        <button
          key={nanoid()}
          className={clsx([
            'dsr-flex dsr-items-center dsr-text-center dsr-rounded-b-lg dsr-font-semibold dsr-justify-center',
            'dsr-gap-2 dsr-px-3 dsr-py-2 hover:dsr-bg-white/20 dsr-w-full',
          ])}
          onClick={() => setSelections(null)}
        >
          {labels.showAll}
        </button>
      </div>
    </div>
  );
};

const DropdownFilter = ({
  children, selections, options = [], labels: _labels,
  dropdownContainerClassName,
  optionButtonClassName,
  setSelections = () => {},
  onChangeKeyword = () => {},
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

  return (
    <Dropdown
      align="end"
      containerClassName={clsx([
        'dsr-z-[100] dsr-border dark:dsr-border-gray-500/70 dsr-border-gray-500/10',
        dropdownContainerClassName,
      ])}
      buttonRenderer={(
        <div>
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
        optionButtonClassName={optionButtonClassName}
      />
    </Dropdown>
  );
};

export default DropdownFilter;
