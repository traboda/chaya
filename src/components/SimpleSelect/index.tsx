'use client';
import React, { ReactNode, RefObject, useEffect, useId, useRef, useState } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

import mcs from '../../utils/merge';
import Checkbox from '../Checkbox';
import Icon, { IconInputType } from '../Icon';
import Label from '../Label';
import Spinner from '../Spinner';

import SimpleSelectOption from './option';

export type SimpleSelectValue = string | number | null | undefined;

type OptionType = {
  value: SimpleSelectValue;
  label: string;
  icon?: IconInputType;
  iconRenderer?: ReactNode;
};

type GroupType = {
  group: string;
  options: OptionType[];
};

export type SimpleSelectOptionType = OptionType | GroupType;
export type SimpleSelectOptionData<Type> =
  Type extends Array<any> ? SimpleSelectOptionType[] : SimpleSelectOptionType | null;

export type SimpleSelectProps<Type> = {
  value: Type;
  name: string;
  variant?: 'comma' | 'pill';
  id?: string;
  className?: string;
  listBoxClassName?: string;
  options?: SimpleSelectOptionType[];
  onChange?: (v: Type, op: SimpleSelectOptionData<Type>) => void;
  isRequired?: boolean;
  isDisabled?: boolean;
  leftIcon?: IconInputType;
  rightIcon?: IconInputType;
  postfixRenderer?: ReactNode;
  dropdownClassName?: string;
  isMulti?: boolean;
  isAsync?: boolean;
  isCreatable?: boolean;
  hideArrow?: boolean;
  hideLabel?: boolean;
  hideSelectAll?: boolean;
  onCreate?: (keyword: string) => void;
  onFetch?: (keyword: string) => Promise<SimpleSelectOptionType[]> | undefined;
  onBlur?: () => void;
  labels: {
    label: string;
    placeholder?: string;
    noOptionsFound?: string;
    selectAll?: string;
    create?: string;
  };
  side?: 'left' | 'right' | 'top' | 'bottom';
};

const defaultLabels = {
  label: null,
  placeholder: 'Select an option',
  noOptionsFound: 'No options found',
  selectAll: 'Select all',
  create: 'Create',
};

const SimpleSelect = <Type extends SimpleSelectValue | SimpleSelectValue[]>({
  value,
  onChange = () => {},
  postfixRenderer,
  isMulti = false,
  side,
  hideLabel = false,
  hideSelectAll = false,
  id,
  className = '',
  labels: propLabels,
  hideArrow = false,
  variant = 'comma',
  rightIcon,
  leftIcon,
  isCreatable = false,
  isRequired = false,
  isDisabled = false,
  name,
  options: _options = [],
  dropdownClassName = '',
  listBoxClassName,
  isAsync = false,
  onFetch = () => new Promise((resolve) => resolve([])),
  onCreate,
  onBlur,
}: SimpleSelectProps<Type>) => {
  const labels = { ...defaultLabels, ...propLabels };
  const reactId = useId();
  const inputID = id ? id : `${name}-select-${reactId}`;

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

  const getOption = (val: SimpleSelectValue) => {
    const optionsList = isAsync ? [...cachedOptions, ..._options] : options;
    const option = optionsList.find((option) =>
      'group' in option ? option.options.find((o) => o.value === val) : option.value === val
    );
    return (
      option && 'group' in option ? option.options.find((o) => o.value === val) : option
    ) as OptionType;
  };

  const onSelect = (selection: SimpleSelectValue, option: SimpleSelectOptionType) => {
    if (isMulti && Array.isArray(value)) {
      const values: SimpleSelectValue[] = value.includes(selection)
        ? value.filter((v: SimpleSelectValue) => v !== selection)
        : [...value, selection];
      const options: SimpleSelectOptionType[] = values.map((v) => getOption(v));
      onChange(values as Type, options as SimpleSelectOptionData<Type>);
    } else {
      onChange(selection as Type, option as SimpleSelectOptionData<Type>);
    }
  };

  const getLabel = (val: SimpleSelectValue) => getOption(val)?.label;

  const getValue = () => {
    let label;
    if (isMulti && Array.isArray(value)) {
      if (value.length > 0 && variant === 'pill') return '';
      const values = value.map((v) => getLabel(v)).filter((v) => !!v);
      label = values.length > 5 ? `${values.length} options selected` : values.join(', ');
    } else label = getLabel(value as SimpleSelectValue)?.toString();
    return label ?? '';
  };

  const filteredOptions = () => {
    const matchesLabel = (label: string | number) =>
      label.toString().toLowerCase().includes(searchKeyword.toLowerCase());
    return options
      .map((option) =>
        'group' in option
          ? { ...option, options: option.options.filter((o) => matchesLabel(o.label)) }
          : option
      )
      .filter((option) => ('group' in option ? option.options.length : matchesLabel(option.label)));
  };

  useEffect(() => {
    optionRefs.current = filteredOptions().map(
      (_, i) => optionRefs.current[i] ?? React.createRef()
    );
  }, [filteredOptions]);

  useEffect(() => {
    if (isMulti && !Array.isArray(value))
      throw new Error('SimpleSelect: value must be an array when isMulti is true');

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
    'border group-focus-within:border-primary text-base',
    'text-color group-focus-within:border-primary overflow-hidden items-center',
    !isDisabled && 'group-[:not(:focus-within):hover]:border-gray-400/80',
  ]);

  const onSelectAll = () => {
    const options = filteredOptions();
    const totalCount = options.reduce(
      (acc, option) => ('group' in option ? acc + option.options.length : acc + 1),
      0
    );
    if (isMulti && Array.isArray(value) && value.length === totalCount) {
      const values: SimpleSelectValue[] = [];
      const ops: SimpleSelectOptionType[] = [];
      onChange(values as Type, ops as SimpleSelectOptionData<Type>);
    } else
      onChange(
        options.map((option) =>
          'group' in option ? option.options.map((o) => o.value) : option.value
        ) as Type,
        null as SimpleSelectOptionData<Type>
      );
  };

  const renderDropdownOption = (
    option: SimpleSelectOptionType,
    index: number,
    ref: RefObject<HTMLDivElement>,
    className?: string
  ) =>
    'value' in option ? (
      <DropdownMenu.Item ref={ref} key={`${option.value}_op_${index}`} className="!outline-0">
        <SimpleSelectOption
          isMulti={isMulti}
          className={className}
          value={option.value}
          key={option.value}
          icon={option.icon}
          iconRenderer={option.iconRenderer}
          isSelected={
            isMulti && Array.isArray(value) ? value.includes(option.value) : value === option.value
          }
          label={option.label}
          isHighlighted={highlightedIndex === index}
          onSelect={(value) => {
            onSelect(value, option);
            if (!isMulti) {
              setIsDropdownActive(false);
              if (onBlur) onBlur();
            } else {
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
          optionRefs.current[filteredOptions().length - 1]?.current?.scrollIntoView({
            behavior: 'smooth',
          });
        }
        break;
      case 'Home':
        setHighlightedIndex(0);
        optionRefs.current[0]?.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'End':
        setHighlightedIndex(filteredOptions().length - 1);
        optionRefs.current[filteredOptions().length - 1]?.current?.scrollIntoView({
          behavior: 'smooth',
        });
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
      case 'Escape':
        setIsDropdownActive(false);
        if (onBlur) onBlur();
        break;
      default:
        break;
    }
  };

  return (
    <DropdownMenu.Root open={isDropdownActive} modal={false}>
      <div
        ref={containerRef}
        className={clsx([
          'simple-select-container w-full overflow-hidden',
          isDisabled && 'opacity-70',
        ])}
      >
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
            <div className="group flex w-full" ref={selectRef}>
              <div
                tabIndex={0}
                role="combobox"
                aria-labelledby={!hideLabel ? `${inputID}-label` : undefined}
                aria-label={hideLabel ? labels.label : undefined}
                aria-owns={`${inputID}-listbox`}
                aria-controls={`${inputID}-listbox`}
                onKeyDown={handleKeyDown}
                className={mcs([
                  'simple-select text-color w-full appearance-none rounded-lg p-2 text-base',
                  'bg-background-lighten-1',
                  'border-y border-l focus:outline-none',
                  'group-focus-within:border-gray-500/60 dark:group-focus-within:border-gray-300/60',
                  'bg-background cursor-default bg-no-repeat text-left',
                  'flex items-center justify-between gap-2',
                  !isDisabled && 'group-[:not(:focus-within):hover]:border-gray-400/80',
                  !postfixRenderer ? 'border-r' : 'rounded-r-none !border-r-0',
                  !hideArrow && 'pr-8',
                  className,
                ])}
                onClick={() => setIsDropdownActive(!isDropdownActive)}
                style={
                  hideArrow
                    ? {}
                    : {
                        backgroundImage:
                          "url(\"data:image/svg+xml, <svg height='10px' width='10px' viewBox='0 0 16 16' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>\")",
                        backgroundPosition: 'calc(100% - 0.75rem) center',
                        backgroundRepeat: 'no-repeat',
                      }
                }
              >
                {leftIcon && <Icon icon={leftIcon} size={18} />}
                <div className="flex w-full flex-wrap gap-x-1 gap-y-2">
                  {variant === 'pill' && Array.isArray(value)
                    ? value.map((val) => {
                        const option = getOption(val);
                        return option ? (
                          <div
                            key={val}
                            className={clsx([
                              'border-light border bg-black/10 dark:bg-white/10',
                              'inline-flex items-center overflow-hidden rounded px-1',
                              '',
                            ])}
                          >
                            {option?.icon && <Icon icon={option?.icon} size={16} />}
                            {option?.iconRenderer && (
                              <div className="flex h-full items-center justify-center p-1">
                                <div className="h-[24px] w-[24px]">{option.iconRenderer}</div>
                              </div>
                            )}
                            <div className="px-1">{option?.label}</div>
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                const values = value.filter((v) => v !== val);
                                const options = values.map((v) => getOption(v));
                                onChange(values as Type, options as SimpleSelectOptionData<Type>);
                              }}
                              aria-label="Remove"
                              title="Remove"
                              type="button"
                              className={clsx(['h-full px-1 transition', 'hover:text-red-400'])}
                            >
                              <i className="ri-close-line" />
                            </button>
                          </div>
                        ) : null;
                      })
                    : null}

                  <input
                    ref={searchBoxRef}
                    id={inputID}
                    aria-autocomplete="list"
                    value={isDropdownActive ? searchKeyword : getValue()}
                    placeholder={
                      value && (typeof value === 'number' || value?.length > 0)
                        ? ''
                        : labels?.placeholder
                    }
                    onChange={(event) => {
                      setIsDropdownActive(true);
                      setSearchKeyword(event.target.value);
                    }}
                    onFocus={() => setIsDropdownActive(true)}
                    onClick={(event) => {
                      event.stopPropagation();
                      setIsDropdownActive(true);
                    }}
                    type="text"
                    className={clsx([
                      'truncate border-none bg-transparent outline-none',
                      'placeholder:text-color placeholder:opacity-50',
                      variant === 'pill' && Array.isArray(value) && value.length > 0
                        ? ''
                        : 'basis-full',
                    ])}
                  />
                </div>

                {(Array.isArray(value) ? value.length > 0 : !isRequired && !!value) && (
                  <button
                    type="button"
                    title="clear"
                    aria-label="clear"
                    onClick={(event) => {
                      event.stopPropagation();
                      onChange(
                        (Array.isArray(value) ? [] : null) as Type,
                        (Array.isArray(value)
                          ? ([] as SimpleSelectOptionType[])
                          : null) as SimpleSelectOptionData<Type>
                      );
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
                    'right-0 flex shrink-0 rounded-tr-lg rounded-br-lg',
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
              'text-color z-[8000] grid',
              'transition-[grid-template-rows]',
              isDropdownActive ? 'grid-rows-[1fr]' : 'pointer-events-none grid-rows-[0fr]',
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
                'bg-background-lighten-1 overflow-hidden rounded-lg',
                isDropdownActive && 'border-light border',
              ])}
            >
              <div className="bg-black/10 dark:bg-white/10">
                {isFetching && (
                  <div className="flex justify-center px-3 py-2">
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
                {isMulti && !hideSelectAll && (
                  <DropdownMenu.Item className="!outline-0">
                    <li
                      role="option"
                      className="px-3 py-2"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <Checkbox
                        value=""
                        label={labels.selectAll}
                        onChange={() => onSelectAll()}
                        isChecked={Array.isArray(value) && value.length > 0}
                        isHalf={
                          Array.isArray(value) &&
                          value.length <
                            options.reduce(
                              (acc, option) =>
                                'group' in option ? acc + option.options.length : acc + 1,
                              0
                            )
                        }
                        className="w-full"
                      />
                    </li>
                  </DropdownMenu.Item>
                )}
                {filteredOptions().length > 0
                  ? filteredOptions().map((option, index) =>
                      'group' in option && option?.group ? (
                        <React.Fragment key={`${option.group}_og_${index}`}>
                          <div
                            className={clsx([
                              'text-sm font-semibold tracking-wider uppercase opacity-60',
                              'flex gap-2 px-3 py-2',
                            ])}
                          >
                            <div>{option.group}</div>
                            <div className="rounded-full bg-black/20 px-1 text-sm dark:bg-white/20">
                              {option.options.length}
                            </div>
                          </div>
                          {option.options.map((opt) =>
                            renderDropdownOption(opt, index, optionRefs.current[index], 'pl-5')
                          )}
                        </React.Fragment>
                      ) : (
                        renderDropdownOption(option, index, optionRefs.current[index])
                      )
                    )
                  : !isCreatable && (
                      <div className="px-3 py-2 text-center">{labels.noOptionsFound}</div>
                    )}
                {isCreatable && filteredOptions().length === 0 && searchKeyword?.length > 0 && (
                  <DropdownMenu.Item
                    className="!outline-0"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <SimpleSelectOption
                      label={`${labels.create} ${searchKeyword}`}
                      value={searchKeyword}
                      iconRenderer={<i className="ri-add-line" />}
                      onSelect={() => {
                        if (typeof onCreate === 'function') onCreate(searchKeyword);
                        else {
                          setOptions([...options, { label: searchKeyword, value: searchKeyword }]);
                          onSelect(searchKeyword, { label: searchKeyword, value: searchKeyword });
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
