import React, { useContext } from 'react';
import clsx from 'clsx';
import Color from 'color';
import hyperID from 'hyperid';

import DSRContext from '../contexts/DSRContext';
const generateId = hyperID();

type OptionType = {
  value: (string | number),
  label: (string | number)
};

type GroupType = {
  group: string,
  options: OptionType[]
};

export type SimpleSelectOptionType = OptionType[] | GroupType[];

export type SimpleSelectProps = {
  value: (string | number),
  name: string,
  className?: string,
  options: SimpleSelectOptionType,
  onChange?: (v: (string | number)) => void,
  required?: boolean,
  disabled?: boolean,
  labels?: {
    label?: string,
    placeholder?: string
  }
  removeSVG?: boolean,
};

const defaultLabels = {
  label: null,
  placeholder: 'Select an Option',
};

const SimpleSelect = ({
  value, onChange = () => {}, className = '', required = false, disabled = false, name, options,
  labels: propLabels, removeSVG = false,
}: SimpleSelectProps) => {

  const labels = { ...defaultLabels, ...propLabels };
  const inputID = `${name}-input-${generateId()}`;
  const { isDarkTheme } = useContext(DSRContext);

  return (
      <div className="dsr-w-full">
          {labels?.label && labels?.label?.length > 0 && (
              <label
                  id={`${inputID}-label`}
                  className="dsr-block dsr-text-lg dsr-opacity-80 dsr-mb-1 dsr-text-color"
                  htmlFor={inputID}
                  aria-hidden={false}
              >
                  {labels?.label}
                  {required && <span className="dsr-ml-1 dsr-text-red-500">*</span>}
              </label>
          )}
          <div className="dsr-w-full">
              <select
                  className={clsx([
                    'dsr-w-full dsr-text-lg dsr-p-2 dsr-rounded-lg dsr-appearance-none dsr-text-color dsr-border dsr-border-gray-500/70 dsr-bg-background',
                    'focus:dsr-outline-none focus:dsr-border-secondary hover:dsr-border-color',
                    className,
                  ])}
                  name={name}
                  id={inputID}
                  aria-labelledby={`${inputID}-label`}
                  value={value}
                  required={required}
                  disabled={disabled}
                  onChange={({ target }) => onChange(target.value)}
                  style={{
                    background: !removeSVG ? `url("data:image/svg+xml, <svg height='10px' width='10px' viewBox='0 0 16 16' fill='${Color(isDarkTheme ? '#fff' : '#000').rgb().string()}' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat calc(100% - 0.75rem) center` : '',
                  }}
              >
                  <option
                      selected={value === null}
                      disabled={required}
                      value={undefined}
                      className="dsr-bg-background dsr-text-color"
                  >
                      {labels?.placeholder}
                  </option>
                  {options?.length > 0 &&
                        options.map((option) =>
                          (option as GroupType)?.group ? (
                              <optgroup label={(option as GroupType)?.group}>
                                  {(option as GroupType)?.options.map((opt: OptionType) => (
                                      <option
                                          key={opt.value}
                                          value={opt.value}
                                          selected={value === opt.value}
                                      >
                                          {opt.label}
                                      </option>
                                  ))}
                              </optgroup>
                          ) : (
                              <option
                                  value={(option as OptionType).value}
                                  key={(option as OptionType).value}
                                  selected={value === (option as OptionType).value}
                              >
                                  {(option as OptionType).label}
                              </option>
                          ))}
              </select>
          </div>
      </div>
  );
};

export default SimpleSelect;