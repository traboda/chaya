import React, { ReactNode, RefObject, useContext, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import DSRContext from '../../contexts/DSRContext';
import Label from '../Label';
import Spinner from '../Spinner';
import Icon from '../Icon';
import Checkbox from '../Checkbox';

import SimpleSelectOption from './option';

type OptionType = {
  value: SimpleSelectValue,
  label: string | number
};

type GroupType = {
  group: string,
  options: OptionType[]
};

export type SimpleSelectOptionType = OptionType | GroupType;

export type SimpleSelectValue = string | number | null | undefined;

export type SimpleSelectProps<Type> = {
  variant?: 'comma' | 'chip',
  value: Type,
  name: string,
  id?: string,
  className?: string,
  options?: SimpleSelectOptionType[],
  onChange?: (v: Type) => void,
  isRequired?: boolean,
  isDisabled?: boolean,
  hideArrow?: boolean,
  postfixRenderer?: ReactNode,
  dropdownClassName?: string,
  isMulti?: boolean,
  isAsync?: boolean,
  onFetch?: (keyword: string) => Promise<SimpleSelectOptionType[]> | undefined,
  labels?: {
    label?: string,
    placeholder?: string,
    noOptionsFound?: string,
  },
  side?: 'left' | 'right' | 'top' | 'bottom',
};

const defaultLabels = {
  label: null,
  placeholder: 'Select an option',
  noOptionsFound: 'No options found',
};

const SimpleSelect = <Type extends SimpleSelectValue | SimpleSelectValue[]>({
  value, onChange = () => {}, postfixRenderer, isMulti = false, side,
  id, className = '', labels: propLabels, hideArrow = false, variant = 'comma',
  isRequired = false, isDisabled = false, name, options: _options = [], dropdownClassName = '',
  isAsync = false, onFetch = () => new Promise(resolve => resolve([])),
}: SimpleSelectProps<Type>) => {

  const labels = { ...defaultLabels, ...propLabels };
  const inputID = useMemo(() => id ? id : `${name}-select-${nanoid()}`, [id, name]);
  const { isDarkTheme } = useContext(DSRContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState<SimpleSelectOptionType[]>(_options);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const optionRefs = React.useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  useEffect(() => {
    if (isDropdownActive) {
      if (searchBoxRef.current) searchBoxRef.current.focus();
      setSearchKeyword('');
    }
  }, [isDropdownActive]);

  useEffect(() => {
    if (isAsync)
      onFetch(searchKeyword)?.then((options) => {
        setOptions(options);
        setIsFetching(false);
      });
  }, [searchKeyword]);

  const previousOptions = useRef<SimpleSelectOptionType[]>(_options);
  useEffect(() => {
    if (isAsync) return;
    if (previousOptions.current !== _options) {
      setOptions(_options);
      previousOptions.current = _options;
    }
  }, [_options]);

  const onSelect = (option: SimpleSelectValue) => {
    if (isMulti && Array.isArray(value)) onChange(value.includes(option) ? value.filter(v => v !== option) as Type : [...value, option] as Type);
    else onChange(option as Type);
  };

  const getLabel = (val: SimpleSelectValue) => {
    const option = options.find(option => 'group' in option ? option.options.find(o => o.value === val) : option.value === val);
    return option && 'group' in option ? option.options.find(o => o.value === val)?.label : option?.label;
  };

  const getValue = () => {
    let label;
    if (isMulti && Array.isArray(value)) {
      if (value.length > 0 && variant === 'chip') return '';
      const values = value.map(v => getLabel(v)).filter(v => !!v);
      label = values.length > 5 ? `${values.length} options selected` : values.join(', ');
    } else label = getLabel(value as SimpleSelectValue)?.toString();
    return label || labels?.placeholder;
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
    if (isMulti && Array.isArray(value) && value.length === totalCount) onChange([] as unknown as Type);
    else onChange(options.map(option => 'group' in option ? option.options.map(o => o.value) : option.value) as Type);
  };

  const renderDropdownOption = (option: SimpleSelectOptionType, index: number, ref: RefObject<HTMLDivElement>, className?: string) => 'value' in option ? (
    <DropdownMenu.Item ref={ref}>
      <SimpleSelectOption
        isMulti={isMulti}
        className={className}
        value={option.value}
        key={option.value}
        isSelected={isMulti && Array.isArray(value) ? value.includes(option.value) : value === option.value}
        label={option.label}
        isHighlighted={highlightedIndex === index}
        isClearable={!isRequired}
        onSelect={(value) => {
          onSelect(value);
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
            onSelect(highlightedOption.options[0].value);
          } else {
            onSelect(highlightedOption.value);
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
      onOpenChange={setIsDropdownActive}
      modal={false}
    >
      <div ref={containerRef} className={clsx(['dsr-w-full simple-select-container dsr-overflow-hidden', isDisabled && 'dsr-opacity-70'])}>
        {labels?.label && labels?.label?.length > 0 && (
          <Label
            id={`${inputID}-label`}
            htmlFor={inputID}
            children={labels?.label}
            isRequired={isRequired}
          />
        )}
        <DropdownMenu.Trigger asChild className="hover:dsr-outline-none">
          <div>
            <div className="dsr-w-full dsr-flex dsr-group" ref={selectRef}>
              <div
                tabIndex={0}
                role="combobox"
                aria-haspopup="listbox"
                aria-labelledby={`${inputID}-label`}
                onKeyDown={handleKeyDown}
                className={clsx([
                  'simple-select dsr-w-full dsr-text-base dsr-p-2 dsr-rounded-lg dsr-appearance-none dsr-text-color',
                  'focus:dsr-outline-none group-focus-within:dsr-border-primary dsr-border-y dsr-border-l',
                  'dsr-border-gray-500/70 dsr-bg-background dsr-bg-no-repeat dsr-text-left dsr-cursor-default',
                  'dsr-gap-2 dsr-flex dsr-items-center dsr-justify-between',
                  !isDisabled && 'group-[:not(:focus-within):hover]:dsr-border-gray-400/80',
                  !postfixRenderer && 'dsr-border-r',
                  !hideArrow && 'dsr-pr-8',
                  className,
                ])}
                onClick={() => setIsDropdownActive(!isDropdownActive)}
                style={hideArrow ? {} : {
                  backgroundImage: `url("data:image/svg+xml, <svg height='10px' width='10px' viewBox='0 0 16 16' fill='${isDarkTheme ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'}' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")`,
                  backgroundPosition: 'calc(100% - 0.75rem) center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="dsr-w-full dsr-flex dsr-gap-x-1 dsr-gap-y-2 dsr-flex-wrap">
                  {variant === 'chip' && Array.isArray(value) ? value.map(val => (
                    <div key={val} className="dsr-bg-black/10 dark:dsr-bg-white/10 dsr-rounded-full dsr-inline-flex dsr-overflow-hidden">
                      <div className="dsr-pl-2 dsr-pr-1">{getLabel(val)}</div>
                      <button
                        onClick={event => {
                          event.stopPropagation();
                          onChange(value.filter(v => v !== val) as Type);
                        }}
                        type="button"
                        className={clsx([
                          'hover:dark:dsr-bg-white/10 dsr-pl-1 dsr-pr-2 dsr-h-full dsr-transition',
                          'hover:dsr-bg-black/10',
                        ])}
                      >
                        <Icon icon="times" size={14} />
                      </button>
                    </div>
                  )) : null}

                  <input
                    ref={searchBoxRef}
                    id={inputID}
                    aria-autocomplete="list"
                    value={isDropdownActive ? searchKeyword : getValue()}
                    placeholder={isDropdownActive ? getValue() : ''}
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
                      variant === 'chip' && Array.isArray(value) && value.length > 0 ? '' : 'dsr-basis-full',
                    ])}
                  />
                </div>

                {(Array.isArray(value) ? value.length > 0 : !isRequired && !!value) && (
                <button
                  type="button"
                  onClick={event => {
                    event.stopPropagation();
                    onChange((Array.isArray(value) ? [] : null) as Type);
                  }}
                >
                  <Icon icon="times" size={16} />
                </button>
                )}
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
              isDropdownActive ? 'dsr-grid-rows-[1fr] dsr-border dsr-border-gray-50/20 dsr-rounded-lg' : 'dsr-grid-rows-[0fr] dsr-pointer-events-none',
              dropdownClassName,
            ])}
            style={{
              width: 'var(--radix-dropdown-menu-trigger-width)',
            }}
            align="start"
            sideOffset={5}
          >
            <div className="dsr-overflow-hidden dsr-bg-background dsr-rounded-lg">
              <div className="dsr-bg-black/10 dark:dsr-bg-white/10">
                {isFetching ? (
                  <div className="dsr-px-3 dsr-py-2 dsr-flex dsr-justify-center">
                    <Spinner size="lg" />
                  </div>
                ) : isMulti && (
                <div className=" dsr-px-3 dsr-py-2" onClick={event => event.stopPropagation()}>
                  <Checkbox
                    value=""
                    label="Select all"
                    onChange={() => onSelectAll()}
                    isChecked={Array.isArray(value) && value.length > 0}
                    isHalf={Array.isArray(value) && value.length < options.reduce((acc, option) => 'group' in option ? acc + option.options.length : acc + 1, 0)}
                  />
                </div>
                )}
              </div>
              <ul
                tabIndex={-1}
                role="listbox"
                className="dsr-max-h-[250px] dsr-overflow-y-auto"
              >
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
                          <div
                            className="dsr-bg-black/20 dark:dsr-bg-white/20 dsr-rounded-full dsr-px-1 dsr-text-sm"
                          >
                            {option.options.length}
                          </div>
                        </div>
                        {option.options.map(opt => renderDropdownOption(opt, index, optionRefs.current[index], 'dsr-pl-5'))}
                      </React.Fragment>
                    ) : renderDropdownOption(option, index, optionRefs.current[index]))
                ) : (
                  <div className="dsr-px-3 dsr-py-2 dsr-text-center">
                    {labels?.noOptionsFound}
                  </div>
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