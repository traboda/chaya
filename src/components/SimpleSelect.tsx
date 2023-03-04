import React, { ReactNode, useContext, useMemo } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import DSRContext from '../contexts/DSRContext';

type OptionType<Type> = {
  value: Type,
  label: string | number
};

type GroupType<Type> = {
  group: string,
  options: OptionType<Type>[]
};

export type SimpleSelectOptionType<Type> = OptionType<Type>[] | GroupType<Type>[];

export type SimpleSelectProps<Type> = {
  value: Type,
  name: string,
  id?: string,
  className?: string,
  options: SimpleSelectOptionType<Type>,
  onChange?: (v: Type) => void,
  isRequired?: boolean,
  isDisabled?: boolean,
  hideArrow?: boolean,
  postfixRenderer?: ReactNode,
  labels?: {
    label?: string,
    placeholder?: string
  }
};

const defaultLabels = {
  label: null,
  placeholder: 'Select an Option',
};

const SimpleSelect = <Type extends string | number>({
  value, onChange = () => {}, postfixRenderer,
  id, className = '', labels: propLabels, hideArrow = false,
  isRequired = false, isDisabled = false, name, options,
}: SimpleSelectProps<Type>) => {

  const labels = { ...defaultLabels, ...propLabels };
  const inputID = useMemo(() => id ? id : `${name}-input-${nanoid()}`, [id, name]);
  const { isDarkTheme } = useContext(DSRContext);

  const iconClassNameCalculated = clsx([
    'dsr-border group-[:not(:focus-within):hover]:dsr-border-gray-400/80 group-focus-within:dsr-border-primary',
    'dsr-text-color group-focus-within:dsr-border-primary dsr-overflow-hidden',
    'dsr-items-center dsr-border-gray-500/70 dsr-text-base',
  ]);

  return (
      <div className="dsr-w-full simple-select-container">
          {labels?.label && labels?.label?.length > 0 && (
              <label
                  id={`${inputID}-label`}
                  className="dsr-tracking-wide dsr-text-sm dsr-font-semibold dsr-opacity-70 dsr-mb-1 dsr-block"
                  htmlFor={inputID}
                  aria-hidden={false}
              >
                  {labels?.label}
                  {isRequired && <span className="dsr-ml-1 dsr-text-red-500">*</span>}
              </label>
          )}
          <div className="dsr-w-full dsr-flex dsr-group">
              <select
                  className={clsx([
                    'simple-select dsr-w-full dsr-text-base dsr-p-2 dsr-rounded-lg dsr-appearance-none dsr-text-color',
                    'focus:dsr-outline-none group-focus-within:dsr-border-primary dsr-border-y dsr-border-l',
                    'dsr-border-gray-500/70 dsr-bg-background dsr-bg-no-repeat',
                    'group-[:not(:focus-within):hover]:dsr-border-gray-400/80',
                    !postfixRenderer && 'dsr-border-r',
                    className,
                  ])}
                  name={name}
                  id={inputID}
                  aria-labelledby={`${inputID}-label`}
                  value={value}
                  required={isRequired}
                  disabled={isDisabled}
                  onChange={({ target }) => onChange(target.value as Type)}
                  style={hideArrow ? {} : {
                    backgroundImage: `url("data:image/svg+xml, <svg height='10px' width='10px' viewBox='0 0 16 16' fill='${isDarkTheme ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)'}' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")`,
                    backgroundPosition: 'calc(100% - 0.75rem) center',
                  }}
              >
                  <option
                      selected={value === null}
                      disabled={isRequired}
                      value={undefined}
                      className="dsr-bg-background dsr-text-color"
                  >
                      {labels?.placeholder}
                  </option>
                  {options?.length > 0 &&
                    options.map((option) =>
                      'group' in option && option?.group ? (
                          <optgroup label={option.group}>
                              {option.options.map(opt => (
                                  <option
                                      key={opt.value}
                                      value={opt.value}
                                      selected={value === opt.value}
                                  >
                                      {opt.label}
                                  </option>
                              ))}
                          </optgroup>
                      ) : 'value' in option ? (
                          <option
                              value={option.value}
                              key={option.value}
                              selected={value === option.value}
                          >
                              {(option as OptionType<Type>).label}
                          </option>
                      ) : null,
                    )
                  }
              </select>
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
  );
};

export default SimpleSelect;