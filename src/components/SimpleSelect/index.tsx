import React, { ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import DSRContext from '../../contexts/DSRContext';
import Label from '../Label';
import DocumentPortal from '../../utils/Portal';
import TextInput from '../TextInput';

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
  value: Type,
  name: string,
  id?: string,
  className?: string,
  options: SimpleSelectOptionType[],
  onChange?: (v: Type) => void,
  isRequired?: boolean,
  isDisabled?: boolean,
  hideArrow?: boolean,
  postfixRenderer?: ReactNode,
  dropdownContainerClassName?: string,
  dropdownClassName?: string,
  isSearchable?: boolean,
  isMulti?: boolean,
  labels?: {
    label?: string,
    placeholder?: string
  }
};

const defaultLabels = {
  label: null,
  placeholder: 'Select an option',
};

const SimpleSelect = <Type extends SimpleSelectValue | SimpleSelectValue[]>({
  value, onChange = () => {}, postfixRenderer, isMulti = false,
  id, className = '', labels: propLabels, hideArrow = false, dropdownContainerClassName = '',
  isRequired = false, isDisabled = false, name, options, dropdownClassName = '', isSearchable = false,
}: SimpleSelectProps<Type>) => {

  const labels = { ...defaultLabels, ...propLabels };
  const inputID = useMemo(() => id ? id : `${name}-select-${nanoid()}`, [id, name]);
  const { isDarkTheme } = useContext(DSRContext);

  const selectRef = useRef<HTMLButtonElement>(null);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectBounding, setSelectBounding] = useState({ left: 0, bottom: 0, width: 0 });
  const [searchKeyword, setSearchKeyword] = useState('');

  const iconClassNameCalculated = clsx([
    'dsr-border group-focus-within:dsr-border-primary dsr-border-gray-500/70 dsr-text-base',
    'dsr-text-color group-focus-within:dsr-border-primary dsr-overflow-hidden dsr-items-center',
    !isDisabled && 'group-[:not(:focus-within):hover]:dsr-border-gray-400/80',
  ]);

  useEffect(() => {
    if (isDropdownActive && selectRef.current) setSelectBounding(selectRef.current.getBoundingClientRect());
    if (isDropdownActive) setSearchKeyword('');
  }, [isDropdownActive]);

  const onSelect = (option: SimpleSelectValue) => {
    if (isMulti && Array.isArray(value)) onChange(value.includes(option) ? value.filter(v => v !== option) as Type : [...value, option] as Type);
    else onChange(option as Type);
    if (!isMulti) setIsDropdownActive(false);
  };

  const getValue = () => {
    const val = isMulti && Array.isArray(value) ? value[0] : value;
    const option = options.find(option => 'group' in option ? option.options.find(o => o.value === val) : option.value === val);
    return option && 'group' in option ? option.options.find(o => o.value === val)?.label : option?.label;
  };

  const filteredOptions = () => {
    return options.filter(option => {
      if ('group' in option)
        return option.options.filter(o => o.label.toString().toLowerCase().includes(searchKeyword.toLowerCase())).length > 0;
      
      return option.label.toString().toLowerCase().includes(searchKeyword.toLowerCase());
    });
  };

  useEffect(() => {
    if (isMulti && !Array.isArray(value)) throw new Error('SimpleSelect: value must be an array when isMulti is true');

    const onScroll = () => {
      if (isDropdownActive && selectRef.current) setSelectBounding(selectRef.current.getBoundingClientRect());
    };

    document.addEventListener('scroll', onScroll, false);
    return () => document.removeEventListener('scroll', onScroll, false);
  }, []);

  return (
    <>
      <div className={clsx(['dsr-w-full simple-select-container dsr-overflow-hidden', isDisabled && 'dsr-opacity-70'])}>
        {labels?.label && labels?.label?.length > 0 && (
          <Label
            id={`${inputID}-label`}
            htmlFor={inputID}
            children={labels?.label}
            isRequired={isRequired}
          />
        )}
        <div className="dsr-w-full dsr-flex dsr-group">
          <button
            ref={selectRef}
            className={clsx([
              'simple-select dsr-w-full dsr-text-base dsr-p-2 dsr-rounded-lg dsr-appearance-none dsr-text-color',
              'focus:dsr-outline-none group-focus-within:dsr-border-primary dsr-border-y dsr-border-l',
              'dsr-border-gray-500/70 dsr-bg-background dsr-bg-no-repeat dsr-text-left dsr-cursor-default',
              'dsr-gap-2 dsr-flex dsr-items-center',
              !isDisabled && 'group-[:not(:focus-within):hover]:dsr-border-gray-400/80',
              !postfixRenderer && 'dsr-border-r',
              !hideArrow && 'dsr-pr-8',
              className,
            ])}
            id={inputID}
            disabled={isDisabled}
            aria-labelledby={`${inputID}-label`}
            onClick={() => setIsDropdownActive(!isDropdownActive)}
            style={hideArrow ? {} : {
              backgroundImage: `url("data:image/svg+xml, <svg height='10px' width='10px' viewBox='0 0 16 16' fill='${isDarkTheme ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'}' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")`,
              backgroundPosition: 'calc(100% - 0.75rem) center',
            }}
          >
            {getValue() ? (
              <>
                <span className="dsr-whitespace-nowrap dsr-text-ellipsis dsr-overflow-hidden">{getValue()}</span>
                {isMulti && Array.isArray(value) && value.length > 1 && (
                  <span className="dsr-bg-black/20 dark:dsr-bg-white/20 dsr-px-1 dsr-py-0.5 dsr-rounded-lg dsr-text-sm">
                    +
                    {value.length - 1}
                  </span>
                )}
              </>
            ) : labels?.placeholder}
          </button>
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

      <DocumentPortal>
        <div
          className={clsx([
            'dsr-absolute dsr-z-50 dsr-rounded-lg dsr-text-color',
            'dsr-overflow-y-auto dsr-transition-[height]',
            dropdownContainerClassName,
            isDropdownActive ? 'dsr-h-[250px]' : 'dsr-h-0 dsr-pointer-events-none',
          ])}
          style={{
            top: selectBounding.bottom + 4,
            left: selectBounding.left,
            width: selectBounding.width,
          }}
        >
          <div className="dsr-bg-background dsr-rounded-lg">
            {isSearchable && (
              <div className="dsr-bg-background dsr-sticky dsr-top-0 dsr-z-10">
                <TextInput
                  label="Search"
                  hideLabel
                  name="select_search"
                  rightIcon="search"
                  value={searchKeyword}
                  onChange={setSearchKeyword}
                  autoFocus={isDropdownActive}
                  type="text"
                  inputClassName="!dsr-border-0 dark:dsr-bg-white/10 dsr-bg-black/10 dsr-px-3 dsr-py-2 dsr-w-full !dsr-rounded-none"
                  placeholder="Search..."
                />
              </div>
            )}
            <div className="dsr-overflow-hidden dsr-rounded-b-lg">
              {filteredOptions().map(option =>
                'group' in option && option?.group ? (
                  <>
                    <div
                      className={clsx([
                        'dsr-uppercase dsr-font-semibold dsr-text-sm dsr-tracking-wider dsr-opacity-60',
                        'dsr-px-3 dsr-py-2',
                      ])}
                    >
                      {option.group}
                    </div>
                    {option.options.map(opt => (
                      <SimpleSelectOption
                        isMulti={isMulti}
                        className="dsr-pl-5"
                        key={opt.value}
                        value={opt.value}
                        isSelected={isMulti && Array.isArray(value) ? value.includes(opt.value) : value === opt.value}
                        label={opt.label}
                        isClearable={!isRequired}
                        onSelect={onSelect}
                      />
                    ))}
                  </>
                ) : 'value' in option ? (
                  <SimpleSelectOption
                    isMulti={isMulti}
                    value={option.value}
                    key={option.value}
                    isSelected={isMulti && Array.isArray(value) ? value.includes(option.value) : value === option.value}
                    isClearable={!isRequired}
                    label={option.label}
                    onSelect={onSelect}
                  />
                ) : null,
              )}
              {filteredOptions().length === 0 && (
              <div className="dsr-px-3 dsr-py-2 dsr-text-center">
                No options found.
              </div>
              )}
            </div>
          </div>
        </div>
      </DocumentPortal>
    </>
  );
};

export default SimpleSelect;