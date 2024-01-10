'use client';
import React, { ReactNode, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import Label from '../Label';
import Spinner from '../Spinner';
import Icon, { IconInputType } from '../Icon';
import Checkbox from '../Checkbox';

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
    'dsr-border group-focus-within:dsr-border-primary dsr-border-gray-500/70 dsr-text-base',
    'dsr-text-color group-focus-within:dsr-border-primary dsr-overflow-hidden dsr-items-center',
    !isDisabled && 'group-[:not(:focus-within):hover]:dsr-border-gray-400/80',
  ]);

  const onSelectAll = () => {
    const options = filteredOptions();
    const totalCount = options.reduce((acc, option) => 'group' in option ? acc + option.options.length : acc + 1, 0);
    if (isMulti && Array.isArray(value) && value.length === totalCount) onChange([] as unknown as Type, null);
    else onChange(options.map(option => 'group' in option ? option.options.map(o => o.value) : option.value) as Type, null);
  };

  const renderDropdownOption = (option: SimpleSelectOptionType, index: number, ref: RefObject<HTMLDivElement>, className?: string) => 'value' in option ? (
    <DropdownMenu.Item ref={ref} className="!dsr-outline-0">
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
      <div ref={containerRef} className={clsx(['dsr-w-full simple-select-container dsr-overflow-hidden', isDisabled && 'dsr-opacity-70'])}>
        {!hideLabel && (
        <Label
          id={`${inputID}-label`}
          htmlFor={inputID}
          children={labels.label}
          isRequired={isRequired}
        />
        )}
        <DropdownMenu.Trigger asChild className="hover:dsr-outline-none">
          <div>
            <div className="dsr-w-full dsr-flex dsr-group" ref={selectRef}>
              <div
                tabIndex={0}
                role="combobox"
                aria-labelledby={!hideLabel ? `${inputID}-label` : undefined}
                aria-label={hideLabel ? labels.label : undefined}
                aria-owns={`${inputID}-listbox`}
                aria-controls={`${inputID}-listbox`}
                onKeyDown={handleKeyDown}
                className={clsx([
                  'simple-select dsr-w-full dsr-text-base dsr-p-2 dsr-rounded-lg dsr-appearance-none dsr-text-color',
                  'dsr-bg-background-lighten-1 dark:dsr-border-neutral-500/70 dsr-border-neutral-500/20 dsr-shadow-inner',
                  'focus:dsr-outline-none group-focus-within:dsr-border-primary dsr-border-y dsr-border-l',
                  'dsr-bg-background dsr-bg-no-repeat dsr-text-left dsr-cursor-default',
                  'dsr-gap-2 dsr-flex dsr-items-center dsr-justify-between',
                  !isDisabled && 'group-[:not(:focus-within):hover]:dsr-border-gray-400/80',
                  !postfixRenderer ? 'dsr-border-r' : '!dsr-border-r-0 dsr-rounded-r-none',
                  !hideArrow && 'dsr-pr-8',
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
                <div className="dsr-w-full dsr-flex dsr-gap-x-1 dsr-gap-y-2 dsr-flex-wrap">
                  {variant === 'pill' && Array.isArray(value) ? value.map(val => {
                    const option = getOption(val);
                    return option ? (
                      <div
                        key={val}
                        className={clsx([
                          'dsr-bg-black/10 dark:dsr-bg-white/10 dsr-border dsr-border-neutral-200',
                          'dsr-rounded dsr-inline-flex dsr-items-center dsr-px-1 dsr-overflow-hidden',
                          'hover:dsr-shadow hover:dsr-border-neutral-300',
                        ])}
                      >
                        {option?.icon && (<Icon icon={option?.icon} size={16} />)}
                        {option?.iconRenderer && (
                        <div className="dsr-p-1 dsr-flex dsr-items-center dsr-justify-center dsr-h-full">
                          <div className="dsr-w-[24px] dsr-h-[24px]">
                            {option.iconRenderer}
                          </div>
                        </div>
                        )}
                        <div className="dsr-px-1">{option?.label}</div>
                        <button
                          onClick={event => {
                            event.stopPropagation();
                            onChange(value.filter(v => v !== val) as Type, option);
                          }}
                          aria-label="Remove"
                          title="Remove"
                          type="button"
                          className={clsx([
                            'dsr-px-1 dsr-h-full dsr-transition',
                            'hover:dsr-text-red-400',
                          ])}
                        >
                          <Icon icon="times" size={14} />
                        </button>
                      </div>
                    ) : null;
                  }) : null}

                  <input
                    ref={searchBoxRef}
                    id={inputID}
                    aria-autocomplete="list"
                    value={isDropdownActive ? searchKeyword : getValue()}
                    placeholder={labels?.placeholder}
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
                      'dsr-outline-none dsr-border-none dsr-bg-transparent dsr-truncate',
                      'placeholder:dsr-text-color placeholder:dsr-opacity-50',
                      variant === 'pill' && Array.isArray(value) && value.length > 0 ? '' : 'dsr-basis-full',
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
                  <Icon icon="times" size={18} />
                </button>
                )}
                {rightIcon && <Icon className="dsr-mr-1" icon={rightIcon} size={18} />}
              </div>
              {postfixRenderer && (
              <div
                className={clsx([
                  iconClassNameCalculated,
                  'dsr-right-0 dsr-flex dsr-rounded-tr-lg dsr-rounded-br-lg dsr-shrink-0',
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
            className={clsx([
              'dsr-text-color dsr-grid dsr-z-[8000]',
              'dsr-transition-[grid-template-rows]',
              isDropdownActive ? 'dsr-grid-rows-[1fr]' : 'dsr-grid-rows-[0fr] dsr-pointer-events-none',
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
                'dsr-overflow-hidden dsr-bg-background-lighten-1 dsr-rounded-lg',
                isDropdownActive && 'dsr-border dsr-shadow dsr-border-gray-200/50',
              ])}
            >
              <div className="dsr-bg-black/10 dark:dsr-bg-white/10">
                {isFetching && (
                <div className="dsr-px-3 dsr-py-2 dsr-flex dsr-justify-center">
                  <Spinner size="lg" />
                </div>
                )}
              </div>
              <ul
                tabIndex={-1}
                role="listbox"
                id={`${inputID}-listbox`}
                className={clsx(['dsr-max-h-[250px] dsr-overflow-y-auto', listBoxClassName])}
              >
                {(isMulti && !hideSelectAll) && (
                <DropdownMenu.Item className="!dsr-outline-0">
                  <li role="option" className="dsr-px-3 dsr-py-2" onClick={event => event.stopPropagation()}>
                    <Checkbox
                      value=""
                      label={labels.selectAll}
                      onChange={() => onSelectAll()}
                      isChecked={Array.isArray(value) && value.length > 0}
                      isHalf={Array.isArray(value) && value.length < options.reduce((acc, option) => 'group' in option ? acc + option.options.length : acc + 1, 0)}
                      className="dsr-w-full"
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
                            'dsr-uppercase dsr-font-semibold dsr-text-sm dsr-tracking-wider dsr-opacity-60',
                            'dsr-px-3 dsr-py-2 dsr-flex dsr-gap-2',
                          ])}
                        >
                          <div>{option.group}</div>
                          <div className="dsr-bg-black/20 dark:dsr-bg-white/20 dsr-rounded-full dsr-px-1 dsr-text-sm">
                            {option.options.length}
                          </div>
                        </div>
                        {option.options.map(opt => renderDropdownOption(opt, index, optionRefs.current[index], 'dsr-pl-5'))}
                      </React.Fragment>
                    ) : renderDropdownOption(option, index, optionRefs.current[index]))
                ) : !isCreatable && (
                <div className="dsr-px-3 dsr-py-2 dsr-text-center">
                  {labels.noOptionsFound}
                </div>
                )}
                {isCreatable && filteredOptions().length === 0 && searchKeyword?.length > 0 && (
                <DropdownMenu.Item className="!dsr-outline-0" onClick={event => event.stopPropagation()}>
                  <SimpleSelectOption
                    label={`${labels.create} ${searchKeyword}`}
                    value={searchKeyword}
                    icon="plus"
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