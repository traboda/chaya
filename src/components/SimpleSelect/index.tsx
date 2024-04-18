'use client';
import React, { ReactNode, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import Label from '../Label';
import Spinner from '../Spinner';
import Icon, { IconInputType } from '../Icon';
import Checkbox from '../Checkbox';
import mcs from '../../utils/merge';

import SimpleSelectOption from './option';

export type SimpleSelectValue = string | number | null | undefined;

type OptionType = {
  value: SimpleSelectValue,
  label: string
  icon?: IconInputType,
  iconRenderer?: ReactNode
};

type GroupType = {
  group: string,
  options: OptionType[]
};

export type SimpleSelectOptionType = OptionType | GroupType;

export type SimpleSelectProps<Type> = {
  variant?: 'comma' | 'pill',
  value: Type,
  name: string,
  id?: string,
  className?: string,
  listBoxClassName?: string,
  options?: SimpleSelectOptionType[],
  onChange?: (v: Type, option: SimpleSelectOptionType | null) => void,
  isRequired?: boolean,
  isDisabled?: boolean,
  leftIcon?: IconInputType,
  rightIcon?: IconInputType,
  postfixRenderer?: ReactNode,
  dropdownClassName?: string,
  isMulti?: boolean,
  isAsync?: boolean,
  isCreatable?: boolean,
  hideArrow?: boolean,
  hideLabel?: boolean,
  hideSelectAll?: boolean,
  onCreate?: (keyword: string) => void,
  onFetch?: (keyword: string) => Promise<SimpleSelectOptionType[]> | undefined,
  labels: {
    label: string,
    placeholder?: string,
    noOptionsFound?: string,
    selectAll?: string,
    create?: string,
  },
  side?: 'left' | 'right' | 'top' | 'bottom',
};

const defaultLabels = {
  label: null,
  placeholder: 'Select an option',
  noOptionsFound: 'No options found',
  selectAll: 'Select all',
  create: 'Create',
};

const SimpleSelect = <Type extends SimpleSelectValue | SimpleSelectValue[]>({
  value, onChange = () => {}, postfixRenderer, isMulti = false, side, hideLabel = false, hideSelectAll = false,
  id, className = '', labels: propLabels, hideArrow = false, variant = 'comma', rightIcon, leftIcon, isCreatable = false,
  isRequired = false, isDisabled = false, name, options: _options = [], dropdownClassName = '', listBoxClassName,
  isAsync = false, onFetch = () => new Promise(resolve => resolve([])), onCreate,
}: SimpleSelectProps<Type>) => {

  const labels = { ...defaultLabels, ...propLabels };
  const inputID = useMemo(() => id ? id : `${name}-select-${nanoid()}`, [id, name]);

  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<SimpleSelectOptionType[]>(_options);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const optionRefs = React.useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  const [cachedOptions, setCachedOptions] = useState<SimpleSelectOptionType[]>(_options);

  useEffect(() => {
    if (isDropdownActive) {
      if (searchBoxRef.current) searchBoxRef.current.focus();
      setSearchKeyword('');
    }
  }, [isDropdownActive]);

  useEffect(() => {
    if (isAsync)
      onFetch(searchKeyword)?.then((options) => {
        setCachedOptions([...cachedOptions, ...options]);
        setOptions(options);
        setIsFetching(false);
      });
  }, [searchKeyword]);

  const previousOptions = useRef<SimpleSelectOptionType[]>(_options);
  useEffect(() => {
    if (isAsync) return;
    if (previousOptions.current !== _options) {
      setCachedOptions([...cachedOptions, ..._options]);
      setOptions(_options);
      previousOptions.current = _options;
    }
  }, [_options]);

  const onSelect = (selection: SimpleSelectValue, option: SimpleSelectOptionType) => {
    if (isMulti && Array.isArray(value)) onChange(value.includes(selection) ? value.filter(v => v !== selection) as Type : [...value, selection] as Type, option);
    else onChange(selection as Type, option);
  };

  const getOption = (val: SimpleSelectValue) => {
    const optionsList = isAsync ? [...cachedOptions, ..._options] : options;
    const option = optionsList.find(option => 'group' in option ? option.options.find(o => o.value === val) : option.value === val);
    return option && 'group' in option ? option.options.find(o => o.value === val) : option;
  };
  const getLabel = (val: SimpleSelectValue) => getOption(val)?.label;

  const getValue = () => {
    let label;
    if (isMulti && Array.isArray(value)) {
      if (value.length > 0 && variant === 'pill') return '';
      const values = value.map(v => getLabel(v)).filter(v => !!v);
      label = values.length > 5 ? `${values.length} options selected` : values.join(', ');
    } else label = getLabel(value as SimpleSelectValue)?.toString();
    return label;
  };

  const filteredOptions = () => {
    const matchesLabel = (label: string | number) => label.toString().toLowerCase().includes(searchKeyword.toLowerCase());
    return options
      .map(option => 'group' in option ? { ...option, options: option.options.filter(o => matchesLabel(o.label)) } : option)
      .filter(option => 'group' in option ? option.options.length : matchesLabel(option.label));
  };

  useEffect(() => {
    optionRefs.current = filteredOptions().map((_, i) => optionRefs.current[i] ?? React.createRef());
  }, [filteredOptions]);

  useEffect(() => {
    if (isMulti && !Array.isArray(value)) throw new Error('SimpleSelect: value must be an array when isMulti is true');

    const onClick = (event: MouseEvent) => {
      if (!containerRef.current || containerRef.current.contains(event.target as Node)) return;
      setIsDropdownActive(false);
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, []);

  const iconClassNameCalculated = clsx([
    'border group-focus-within:border-primary border-gray-500/70 text-base',
    'text-color group-focus-within:border-primary overflow-hidden items-center',
    !isDisabled && 'group-[:not(:focus-within):hover]:border-gray-400/80',
  ]);

  const onSelectAll = () => {
    const options = filteredOptions();
    const totalCount = options.reduce((acc, option) => 'group' in option ? acc + option.options.length : acc + 1, 0);
    if (isMulti && Array.isArray(value) && value.length === totalCount) onChange([] as unknown as Type, null);
    else onChange(options.map(option => 'group' in option ? option.options.map(o => o.value) : option.value) as Type, null);
  };

  const renderDropdownOption = (option: SimpleSelectOptionType, index: number, ref: RefObject<HTMLDivElement>, className?: string) => 'value' in option ? (
    <DropdownMenu.Item ref={ref} className="!outline-0">
      <SimpleSelectOption
        isMulti={isMulti}
        className={className}
        value={option.value}
        key={option.value}
        icon={option.icon}
        iconRenderer={option.iconRenderer}
        isSelected={isMulti && Array.isArray(value) ? value.includes(option.value) : value === option.value}
        label={option.label}
        isHighlighted={highlightedIndex === index}
        onSelect={(value) => {
          onSelect(value, option);
          if (!isMulti)
            setIsDropdownActive(false);
          else {
            setSearchKeyword('');
            searchBoxRef?.current?.focus();
          }
        }}
      />
    </DropdownMenu.Item>

  ) : null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') e.preventDefault();
    switch (e.key) {
      case 'ArrowDown':
        if (highlightedIndex < filteredOptions().length - 1) {
          setHighlightedIndex((prev) => prev + 1);
          optionRefs.current[highlightedIndex + 1]?.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
          setHighlightedIndex(0);
          optionRefs.current[0]?.current?.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'ArrowUp':
        if (highlightedIndex > 0) {
          setHighlightedIndex((prev) => prev - 1);
          optionRefs.current[highlightedIndex - 1]?.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
          setHighlightedIndex(filteredOptions().length - 1);
          optionRefs.current[filteredOptions().length - 1]?.current?.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'Home':
        setHighlightedIndex(0);
        optionRefs.current[0]?.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'End':
        setHighlightedIndex(filteredOptions().length - 1);
        optionRefs.current[filteredOptions().length - 1]?.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Enter':
        const highlightedOption = filteredOptions()[highlightedIndex];
        if (highlightedOption) {
          if ('group' in highlightedOption) {
            onSelect(highlightedOption.options[0].value, highlightedOption.options[0]);
          } else {
            onSelect(highlightedOption.value, highlightedOption);
          }
          setIsDropdownActive(false);
        }
        break;
      default:
        break;
    }
  };

  return (
    <DropdownMenu.Root
      open={isDropdownActive}
      modal={false}
    >
      <div ref={containerRef} className={clsx(['w-full simple-select-container overflow-hidden', isDisabled && 'opacity-70'])}>
        {!hideLabel && (
        <Label
          id={`${inputID}-label`}
          htmlFor={inputID}
          children={labels.label}
          isRequired={isRequired}
        />
        )}
        <DropdownMenu.Trigger asChild className="hover:outline-none">
          <div>
            <div className="w-full flex group" ref={selectRef}>
              <div
                tabIndex={0}
                role="combobox"
                aria-labelledby={!hideLabel ? `${inputID}-label` : undefined}
                aria-label={hideLabel ? labels.label : undefined}
                aria-owns={`${inputID}-listbox`}
                aria-controls={`${inputID}-listbox`}
                onKeyDown={handleKeyDown}
                className={mcs([
                  'simple-select w-full text-base p-2 rounded-lg appearance-none text-color',
                  'bg-background-lighten-1 dark:border-neutral-500/70 border-neutral-500/20 shadow-inner',
                  'focus:outline-none border-y border-l',
                  'group-focus-within:border-gray-500/60 dark:group-focus-within:border-gray-300/60',
                  'bg-background bg-no-repeat text-left cursor-default',
                  'gap-2 flex items-center justify-between',
                  !isDisabled && 'group-[:not(:focus-within):hover]:border-gray-400/80',
                  !postfixRenderer ? 'border-r' : '!border-r-0 rounded-r-none',
                  !hideArrow && 'pr-8',
                  className,
                ])}
                onClick={() => setIsDropdownActive(!isDropdownActive)}
                style={hideArrow ? {} : {
                  backgroundImage: 'url("data:image/svg+xml, <svg height=\'10px\' width=\'10px\' viewBox=\'0 0 16 16\' fill=\'currentColor\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\'/></svg>")',
                  backgroundPosition: 'calc(100% - 0.75rem) center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                {leftIcon && <Icon icon={leftIcon} size={18} />}
                <div className="w-full flex gap-x-1 gap-y-2 flex-wrap">
                  {variant === 'pill' && Array.isArray(value) ? value.map(val => {
                    const option = getOption(val);
                    return option ? (
                      <div
                        key={val}
                        className={clsx([
                          'bg-black/10 dark:bg-white/10 border dark:border-neutral-500/70 border-neutral-500/10',
                          'rounded inline-flex items-center px-1 overflow-hidden',
                          'hover:shadow hover:border-neutral-300',
                        ])}
                      >
                        {option?.icon && (<Icon icon={option?.icon} size={16} />)}
                        {option?.iconRenderer && (
                        <div className="p-1 flex items-center justify-center h-full">
                          <div className="w-[24px] h-[24px]">
                            {option.iconRenderer}
                          </div>
                        </div>
                        )}
                        <div className="px-1">{option?.label}</div>
                        <button
                          onClick={event => {
                            event.stopPropagation();
                            onChange(value.filter(v => v !== val) as Type, option);
                          }}
                          aria-label="Remove"
                          title="Remove"
                          type="button"
                          className={clsx([
                            'px-1 h-full transition',
                            'hover:text-red-400',
                          ])}
                        >
                          <i className="ri-close-line" />
                        </button>
                      </div>
                    ) : null;
                  }) : null}

                  <input
                    ref={searchBoxRef}
                    id={inputID}
                    aria-autocomplete="list"
                    value={isDropdownActive ? searchKeyword : getValue()}
                    placeholder={value && (typeof value === 'number' || value?.length > 0) ? '' : labels?.placeholder}
                    onChange={event => {
                      setIsDropdownActive(true);
                      setSearchKeyword(event.target.value);
                    }}
                    onFocus={() => setIsDropdownActive(true)}
                    onClick={event => {
                      event.stopPropagation();
                      setIsDropdownActive(true);
                    }}
                    type="text"
                    className={clsx([
                      'outline-none border-none bg-transparent truncate',
                      'placeholder:text-color placeholder:opacity-50',
                      variant === 'pill' && Array.isArray(value) && value.length > 0 ? '' : 'basis-full',
                    ])}
                  />
                </div>

                {(Array.isArray(value) ? value.length > 0 : !isRequired && !!value) && (
                  <button
                    type="button"
                    title="clear"
                    aria-label="clear"
                    onClick={event => {
                      event.stopPropagation();
                      onChange((Array.isArray(value) ? [] : null) as Type, null);
                    }}
                  >
                    <i className="ri-close-line" />
                  </button>
                )}
                {rightIcon && <Icon className="mr-1" icon={rightIcon} size={18} />}
              </div>
              {postfixRenderer && (
              <div
                className={clsx([
                  iconClassNameCalculated,
                  'right-0 flex rounded-tr-lg rounded-br-lg shrink-0',
                ])}
              >
                {postfixRenderer}
              </div>
              )}
            </div>
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal container={containerRef.current} forceMount>
          <DropdownMenu.Content
            forceMount
            side={side}
            className={mcs([
              'text-color grid z-[8000]',
              'transition-[grid-template-rows]',
              isDropdownActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] pointer-events-none',
              dropdownClassName,
            ])}
            style={{
              width: 'var(--radix-dropdown-menu-trigger-width)',
            }}
            align="start"
            sideOffset={5}
          >
            <div
              className={clsx([
                'overflow-hidden bg-background-lighten-1 rounded-lg',
                isDropdownActive && 'border shadow border-gray-200/50',
              ])}
            >
              <div className="bg-black/10 dark:bg-white/10">
                {isFetching && (
                <div className="px-3 py-2 flex justify-center">
                  <Spinner size="lg" />
                </div>
                )}
              </div>
              <ul
                tabIndex={-1}
                role="listbox"
                id={`${inputID}-listbox`}
                className={mcs(['max-h-[250px] overflow-y-auto', listBoxClassName])}
              >
                {(isMulti && !hideSelectAll) && (
                <DropdownMenu.Item className="!outline-0">
                  <li role="option" className="px-3 py-2" onClick={event => event.stopPropagation()}>
                    <Checkbox
                      value=""
                      label={labels.selectAll}
                      onChange={() => onSelectAll()}
                      isChecked={Array.isArray(value) && value.length > 0}
                      isHalf={Array.isArray(value) && value.length < options.reduce((acc, option) => 'group' in option ? acc + option.options.length : acc + 1, 0)}
                      className="w-full"
                    />
                  </li>
                </DropdownMenu.Item>
                )}
                {filteredOptions().length > 0 ? (
                  filteredOptions().map((option, index) =>
                    'group' in option && option?.group ? (
                      <React.Fragment>
                        <div
                          className={clsx([
                            'uppercase font-semibold text-sm tracking-wider opacity-60',
                            'px-3 py-2 flex gap-2',
                          ])}
                        >
                          <div>{option.group}</div>
                          <div className="bg-black/20 dark:bg-white/20 rounded-full px-1 text-sm">
                            {option.options.length}
                          </div>
                        </div>
                        {option.options.map(opt => renderDropdownOption(opt, index, optionRefs.current[index], 'pl-5'))}
                      </React.Fragment>
                    ) : renderDropdownOption(option, index, optionRefs.current[index]))
                ) : !isCreatable && (
                <div className="px-3 py-2 text-center">
                  {labels.noOptionsFound}
                </div>
                )}
                {isCreatable && filteredOptions().length === 0 && searchKeyword?.length > 0 && (
                <DropdownMenu.Item className="!outline-0" onClick={event => event.stopPropagation()}>
                  <SimpleSelectOption
                    label={`${labels.create} ${searchKeyword}`}
                    value={searchKeyword}
                    iconRenderer={<i className="ri-add-line" />}
                    onSelect={() => {
                      if (typeof onCreate === 'function')
                        onCreate(searchKeyword);
                      else {
                        setOptions([...options, { label: searchKeyword, value: searchKeyword }]);
                        onSelect(searchKeyword as SimpleSelectValue, { label: searchKeyword, value: searchKeyword });
                      }
                    }}
                  />
                </DropdownMenu.Item>
                )}
              </ul>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </div>
    </DropdownMenu.Root>
  );
};

export default SimpleSelect;